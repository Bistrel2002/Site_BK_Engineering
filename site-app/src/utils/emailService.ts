import type { SimulationParams } from './emailTemplates';

export interface EmailServiceResult {
  success: boolean;
  message: string;
}

export async function sendContactEmail(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<EmailServiceResult> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'contact',
        data: { name, email, subject, message },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message');
    }

    return {
      success: true,
      message: result.message || 'Votre message a bien été envoyé !',
    };
  } catch (error: any) {
    console.error('EmailService Error:', error);
    return {
      success: false,
      message: error.message || 'Une erreur est survenue lors de l\'envoi du message.',
    };
  }
}

export async function sendSimulationEmail(params: SimulationParams): Promise<EmailServiceResult> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'simulation',
        data: params,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send simulation');
    }

    return {
      success: true,
      message: result.message || 'Votre simulation a bien été envoyée par e-mail !',
    };
  } catch (error: any) {
    console.error('EmailService Error:', error);
    return {
      success: false,
      message: error.message || 'Une erreur est survenue lors de l\'envoi de la simulation.',
    };
  }
}
