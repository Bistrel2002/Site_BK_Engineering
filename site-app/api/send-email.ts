// @ts-nocheck
import { 
  getClientContactEmailHTML, 
  getAdminContactEmailHTML, 
  getClientSimulationEmailHTML, 
  getAdminSimulationEmailHTML,
  type SimulationParams 
} from './emailTemplates';

import https from 'https';

const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'bikel.keumeka@bkengineering.fr';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'BK Engineering';
const ADMIN_RECEIVER_EMAIL = process.env.CONTACT_EMAIL || 'bikel.keumeka@bkengineering.fr';

async function sendBrevoEmail(apiKey: string, toEmail: string, toName: string, subject: string, htmlContent: string) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      sender: {
        name: SENDER_NAME,
        email: SENDER_EMAIL,
      },
      to: [
        {
          email: toEmail,
          name: toName,
        },
      ],
      subject: subject,
      htmlContent: htmlContent,
    });

    const options = {
      hostname: 'api.brevo.com',
      port: 443,
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': apiKey,
        'content-length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve({ success: true });
          }
        } else {
          reject(new Error(`Brevo API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

export default async function handler(req: any, res: any) {
  // Allow OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('Missing BREVO_API_KEY environment variable');
    return res.status(500).json({ error: 'Mail server configuration error' });
  }

  try {
    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ error: 'Missing type or data in request body' });
    }

    if (type === 'contact') {
      const { name, email, subject, message } = data;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required contact fields' });
      }

      // Compile templates
      const clientHtml = getClientContactEmailHTML(name, subject);
      const adminHtml = getAdminContactEmailHTML(name, email, subject, message);

      // Send both emails in parallel
      await Promise.all([
        // 1. Confirm to client
        sendBrevoEmail(apiKey, email, name, 'Confirmation de réception - BK Engineering', clientHtml),
        // 2. Notify admin
        sendBrevoEmail(apiKey, ADMIN_RECEIVER_EMAIL, SENDER_NAME, `Nouveau Message de ${name} - ${subject}`, adminHtml),
      ]);

      return res.status(200).json({ success: true, message: 'Contact emails sent successfully' });

    } else if (type === 'simulation') {
      const params = data as SimulationParams;
      if (!params.name || !params.email || !params.phone || !params.revenuNetTotal) {
        return res.status(400).json({ error: 'Missing required simulation fields' });
      }

      // Compile templates
      const clientHtml = getClientSimulationEmailHTML(params);
      const adminHtml = getAdminSimulationEmailHTML(params);

      // Send both emails in parallel
      await Promise.all([
        // 1. Send simulation details to client
        sendBrevoEmail(apiKey, params.email, params.name, 'Votre simulation de Portage Salarial - BK Engineering', clientHtml),
        // 2. Notify admin of simulation submission
        sendBrevoEmail(apiKey, ADMIN_RECEIVER_EMAIL, SENDER_NAME, `Nouvelle simulation de ${params.name} (${params.revenuNetTotal}/mois)`, adminHtml),
      ]);

      return res.status(200).json({ success: true, message: 'Simulation emails sent successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid email type' });
    }

  } catch (error: any) {
    console.error('Error sending emails via Brevo:', error);
    return res.status(500).json({ error: 'Failed to dispatch emails', details: error.message });
  }
}
