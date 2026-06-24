// Email templates for BK Engineering (used by the Brevo serverless dispatch system)

export interface SimulationParams {
  name: string;
  email: string;
  phone: string;
  tjm: number;
  joursParMois: number;
  fraisPro: number;
  statut: string;
  mutuelle: string;
  caMensuel: string;
  fraisGestion: string;
  chargesPatronales: string;
  chargesSalariales: string;
  salaireNet: string;
  revenuNetTotal: string;
  revenuNetTotalAnnuel: string;
  totalCotisations: string;
  pctNet: number;
  pctSocial: number;
  pctGestion: number;
  santeBreakdown: string;
  retraiteBreakdown: string;
  chomageBreakdown: string;
  solidariteBreakdown: string;
}

// 1. Client Contact Confirmation Template
export function getClientContactEmailHTML(fromName: string, subject: string): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation de réception - BK Engineering</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #020617;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #f8fafc;
            -webkit-font-smoothing: antialiased;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }
        .card {
            background-color: #0f172a;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8);
            margin: 20px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .card-body {
            padding: 40px;
        }
        .icon-container {
            width: 80px;
            height: 80px;
            margin: 0 auto 24px auto;
            background: linear-gradient(135deg, #38bdf8, #0ea5e9);
            background-color: #0ea5e9;
            border-radius: 24px;
            text-align: center;
        }
        .icon-container img {
            display: inline-block;
            border: 0;
            outline: none;
            width: 40px;
            height: auto;
            margin-top: 20px;
        }
        h1 {
            margin: 0 0 16px 0;
            font-size: 28px;
            font-weight: 800;
            color: #ffffff;
            text-align: center;
            letter-spacing: -0.5px;
        }
        p.intro-text {
            color: #cbd5e1;
            font-size: 16px;
            line-height: 1.7;
            text-align: center;
            margin: 0 0 32px 0;
        }
        .info-box {
            background-color: #020617;
            border-radius: 16px;
            padding: 24px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .info-title {
            margin: 0 0 12px 0;
            color: #38bdf8;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: bold;
        }
        .info-text {
            margin: 0;
            font-size: 15px;
            color: #cbd5e1;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 16px 36px;
            background: linear-gradient(135deg, #0ea5e9, #2563eb);
            background-color: #0ea5e9;
            color: #ffffff !important;
            text-decoration: none;
            font-weight: bold;
            border-radius: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 14px;
            text-align: center;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #475569;
            font-size: 13px;
            line-height: 1.6;
        }
        @media only screen and (max-width: 600px) {
            .card {
                margin: 10px;
                border-radius: 16px;
            }
            .card-body {
                padding: 32px 20px !important;
            }
            h1 {
                font-size: 24px !important;
            }
            p.intro-text {
                font-size: 15px !important;
            }
            .icon-container {
                width: 64px !important;
                height: 64px !important;
                margin-bottom: 20px !important;
                border-radius: 18px !important;
            }
            .icon-container img {
                width: 32px !important;
                margin-top: 16px !important;
            }
            .info-box {
                padding: 20px !important;
            }
            .button {
                display: block !important;
                width: 100% !important;
                box-sizing: border-box !important;
                padding: 16px 20px !important;
            }
        }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#020617">
        <tr>
            <td align="center" valign="top" style="padding: 20px 0;">
                <table class="container" border="0" cellspacing="0" cellpadding="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center">
                            <table class="card" border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#0f172a">
                                <tr>
                                    <td class="card-body" align="center" style="padding: 40px;">
                                        <div class="icon-container">
                                            <img src="https://img.icons8.com/ios-filled/100/ffffff/paper-plane.png" alt="Send" width="40" height="40" style="display: block; border: none; outline: none; margin: 0 auto; padding-top: 20px;" />
                                        </div>
                                        <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 800; color: #ffffff; text-align: center; letter-spacing: -0.5px;">Message Bien Reçu !</h1>
                                        <p class="intro-text" style="color: #cbd5e1; font-size: 16px; line-height: 1.7; text-align: center; margin: 0 0 32px 0;">
                                            Bonjour <strong>${fromName}</strong>,<br><br>
                                            Merci de m'avoir contacté. Je vous confirme la bonne réception de votre message concernant <br><em>"${subject}"</em>.
                                        </p>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td height="1" bgcolor="rgba(255,255,255,0.1)" style="font-size: 0; line-height: 0;">&nbsp;</td>
                                            </tr>
                                        </table>
                                        <br>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#020617" style="border-radius: 16px; padding: 24px; border: 1px solid rgba(255,255,255,0.05);">
                                            <tr>
                                                <td align="left" style="padding: 24px;">
                                                    <h3 class="info-title" style="margin: 0 0 12px 0; color: #38bdf8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Prochaine étape</h3>
                                                    <p class="info-text" style="margin: 0; font-size: 15px; color: #cbd5e1; line-height: 1.6;">
                                                        Je vais étudier votre demande attentivement et vous ferai un retour sous <strong>24h à 48h ouvrées</strong>. 
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                        <br><br>
                                        <a href="https://bkengineering.fr" class="button" style="display: inline-block; padding: 16px 36px; background-color: #0ea5e9; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 16px; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; text-align: center;">Retourner au site</a>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="footer" align="center" style="padding: 20px; color: #475569; font-size: 13px; line-height: 1.6;">
                                        &copy; 2026 BK Engineering.<br>
                                        Paris, France<br><br>
                                        <span style="opacity: 0.7;">Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

// 2. BK Contact Notification Template (Admin Notification)
export function getAdminContactEmailHTML(fromName: string, replyTo: string, subject: string, message: string): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouveau Message - BK Engineering</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #0f172a;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #f8fafc;
            -webkit-font-smoothing: antialiased;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }
        .card {
            background-color: #1e293b;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            margin: 20px;
        }
        .accent-bar {
            height: 6px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
            background-color: #8b5cf6;
            width: 100%;
        }
        .card-body {
            padding: 40px;
        }
        .icon-container {
            width: 80px;
            height: 80px;
            margin: 0 auto 24px auto;
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            background-color: #3b82f6;
            border-radius: 20px;
            text-align: center;
        }
        .icon-container img {
            display: inline-block;
            border: 0;
            outline: none;
            width: 40px;
            height: auto;
            margin-top: 20px;
        }
        h1 {
            margin: 0 0 8px 0;
            font-size: 26px;
            font-weight: 800;
            color: #ffffff;
            text-align: center;
            letter-spacing: -0.5px;
        }
        .subtitle {
            color: #94a3b8;
            font-size: 15px;
            text-align: center;
            margin: 0 0 32px 0;
        }
        .content-box {
            background-color: #0f172a;
            border-radius: 16px;
            padding: 24px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .field {
            margin-bottom: 20px;
        }
        .field:last-child {
            margin-bottom: 0;
        }
        .label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #3b82f6;
            font-weight: 700;
            margin-bottom: 8px;
            display: block;
        }
        .value {
            font-size: 15px;
            color: #f1f5f9;
            line-height: 1.6;
            margin: 0;
        }
        .message-box {
            background-color: #1e293b;
            border-radius: 12px;
            padding: 16px;
            border-left: 4px solid #8b5cf6;
            margin-top: 8px;
            font-style: italic;
            color: #cbd5e1;
        }
        .button {
            display: inline-block;
            padding: 16px 32px;
            background: linear-gradient(135deg, #8b5cf6, #3b82f6);
            background-color: #3b82f6;
            color: #ffffff !important;
            text-decoration: none;
            font-weight: bold;
            border-radius: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 14px;
            text-align: center;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #64748b;
            font-size: 13px;
        }
        @media only screen and (max-width: 600px) {
            .card {
                margin: 10px;
                border-radius: 16px;
            }
            .card-body {
                padding: 24px 16px !important;
            }
            h1 {
                font-size: 22px !important;
            }
            .icon-container {
                width: 64px !important;
                height: 64px !important;
                margin-bottom: 20px !important;
                border-radius: 16px !important;
            }
            .icon-container img {
                width: 32px !important;
                margin-top: 16px !important;
            }
            .content-box {
                padding: 16px !important;
            }
            .button {
                display: block !important;
                width: 100% !important;
                box-sizing: border-box !important;
                padding: 16px 20px !important;
            }
            .message-box {
                padding: 12px !important;
                font-size: 14px !important;
            }
        }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0f172a">
        <tr>
            <td align="center" valign="top" style="padding: 20px 0;">
                <table class="container" border="0" cellspacing="0" cellpadding="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center">
                            <table class="card" border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#1e293b" style="border-radius: 20px; overflow: hidden;">
                                <tr>
                                    <td class="accent-bar" height="6" style="background-color: #8b5cf6;"></td>
                                </tr>
                                <tr>
                                    <td class="card-body" align="left" style="padding: 40px;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center">
                                                    <div class="icon-container">
                                                        <img src="https://img.icons8.com/ios-filled/100/ffffff/new-post.png" alt="Mail Icon" width="40" height="40" style="display: block; border: none; outline: none; margin: 0 auto; padding-top: 20px;" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center">
                                                    <h1 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 800; color: #ffffff; text-align: center; letter-spacing: -0.5px;">Nouveau Projet !</h1>
                                                    <p class="subtitle" style="margin: 0 0 32px 0;">Vous avez reçu une nouvelle demande de contact.</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0f172a" style="border-radius: 16px; padding: 24px; border: 1px solid rgba(255,255,255,0.05);">
                                            <tr>
                                                <td style="padding: 24px;">
                                                    <div class="field" style="margin-bottom: 20px;">
                                                        <strong class="label" style="display: block; font-size: 12px; text-transform: uppercase; color: #3b82f6; letter-spacing: 1px; margin-bottom: 8px;">Expéditeur</strong>
                                                        <p class="value" style="margin: 0; font-size: 15px; color: #f1f5f9;">${fromName}</p>
                                                    </div>
                                                    <div class="field" style="margin-bottom: 20px;">
                                                        <strong class="label" style="display: block; font-size: 12px; text-transform: uppercase; color: #3b82f6; letter-spacing: 1px; margin-bottom: 8px;">Adresse Email</strong>
                                                        <p class="value" style="margin: 0; font-size: 15px;"><a href="mailto:${replyTo}" style="color: #60a5fa; text-decoration: none;">${replyTo}</a></p>
                                                    </div>
                                                    <div class="field" style="margin-bottom: 20px;">
                                                        <strong class="label" style="display: block; font-size: 12px; text-transform: uppercase; color: #3b82f6; letter-spacing: 1px; margin-bottom: 8px;">Sujet</strong>
                                                        <p class="value" style="margin: 0; font-size: 15px; color: #f1f5f9;"><strong>${subject}</strong></p>
                                                    </div>
                                                    <div class="field" style="margin-bottom: 0;">
                                                        <strong class="label" style="display: block; font-size: 12px; text-transform: uppercase; color: #3b82f6; letter-spacing: 1px; margin-bottom: 8px;">Message</strong>
                                                        <div class="message-box" style="background-color: #1e293b; border-radius: 12px; padding: 16px; border-left: 4px solid #8b5cf6; margin-top: 8px; font-style: italic; color: #cbd5e1; font-size: 15px; line-height: 1.6;">
                                                            ${message}
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="padding-top: 32px;">
                                                    <a href="mailto:${replyTo}?subject=Re: ${subject}" class="button" style="display: inline-block; padding: 16px 32px; background-color: #3b82f6; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 12px; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; text-align: center;">Répondre à ${fromName}</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="footer" align="center" style="padding: 20px; color: #64748b; font-size: 13px;">
                                        Généré par BK Engineering Portal <br>&bull;<br> Ne pas répondre directement à cet email système
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

// 3. Client Simulation Results Email Template
export function getClientSimulationEmailHTML(p: SimulationParams): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre Simulation de Portage Salarial - BK Engineering</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #020617;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #f8fafc;
            -webkit-font-smoothing: antialiased;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }
        .card {
            background-color: #0f172a;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);
            margin: 20px;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .card-body {
            padding: 40px;
        }
        .header-icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 24px auto;
            background: linear-gradient(135deg, #10b981, #059669);
            background-color: #10b981;
            border-radius: 24px;
            text-align: center;
        }
        .header-icon img {
            display: inline-block;
            border: 0;
            outline: none;
            width: 40px;
            height: auto;
            margin-top: 20px;
        }
        h1 {
            margin: 0 0 12px 0;
            font-size: 26px;
            font-weight: 800;
            color: #ffffff;
            text-align: center;
            letter-spacing: -0.5px;
            line-height: 1.2;
        }
        p.intro-text {
            color: #cbd5e1;
            font-size: 15px;
            line-height: 1.6;
            text-align: center;
            margin: 0 0 32px 0;
        }
        .divider {
            height: 1px;
            background-color: rgba(255, 255, 255, 0.1);
            margin: 24px 0;
            width: 100%;
        }
        .highlight-box {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.05));
            border-radius: 20px;
            padding: 24px;
            border: 1px solid rgba(16, 185, 129, 0.25);
            text-align: center;
            margin-bottom: 28px;
        }
        .highlight-title {
            margin: 0 0 8px 0;
            color: #94a3b8;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: bold;
        }
        .highlight-value {
            margin: 0 0 6px 0;
            font-size: 38px;
            font-weight: 900;
            color: #10b981;
            letter-spacing: -1px;
        }
        .highlight-subtitle {
            margin: 0;
            font-size: 14px;
            color: #cbd5e1;
        }
        .section-title {
            font-size: 13px;
            font-weight: bold;
            color: #38bdf8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin: 0 0 16px 0;
        }
        .params-table, .details-table {
            width: 100%;
            margin-bottom: 24px;
        }
        .row-item {
            padding: 12px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .row-item-last {
            padding: 12px 0 0 0;
        }
        .label-text {
            font-size: 14px;
            color: #94a3b8;
        }
        .value-text {
            font-size: 14px;
            color: #f1f5f9;
            font-weight: 600;
            text-align: right;
        }
        .value-net {
            font-size: 15px;
            color: #10b981;
            font-weight: 700;
            text-align: right;
        }
        .value-minus {
            font-size: 14px;
            color: #f87171;
            font-weight: 600;
            text-align: right;
        }
        .visual-bar-container {
            margin: 16px 0 24px 0;
        }
        .bar-label {
            font-size: 11px;
            font-weight: bold;
            color: #cbd5e1;
            margin-bottom: 6px;
        }
        .legend-table {
            width: 100%;
            margin-top: 8px;
        }
        .legend-dot {
            width: 8px;
            height: 8px;
            border-radius: 4px;
            display: inline-block;
            margin-right: 6px;
            vertical-align: middle;
        }
        .legend-text {
            font-size: 10px;
            color: #94a3b8;
            vertical-align: middle;
        }
        .pedagogy-box {
            background-color: #020617;
            border-radius: 16px;
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            margin-bottom: 24px;
        }
        .pedagogy-item {
            margin-bottom: 14px;
        }
        .pedagogy-item:last-child {
            margin-bottom: 0;
        }
        .pedagogy-header {
            font-size: 13px;
            font-weight: bold;
            color: #f1f5f9;
            margin-bottom: 4px;
        }
        .pedagogy-desc {
            font-size: 11px;
            color: #94a3b8;
            line-height: 1.4;
        }
        .button {
            display: inline-block;
            padding: 16px 36px;
            background: linear-gradient(135deg, #10b981, #059669);
            background-color: #10b981;
            color: #ffffff !important;
            text-decoration: none;
            font-weight: bold;
            border-radius: 16px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 13px;
            text-align: center;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #475569;
            font-size: 12px;
            line-height: 1.6;
        }
        @media only screen and (max-width: 600px) {
            .card {
                margin: 10px;
                border-radius: 20px;
            }
            .card-body {
                padding: 32px 16px !important;
            }
            h1 {
                font-size: 22px !important;
            }
            .highlight-value {
                font-size: 32px !important;
            }
            .button {
                display: block !important;
                width: 100% !important;
                box-sizing: border-box !important;
                padding: 16px 20px !important;
            }
        }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#020617">
        <tr>
            <td align="center" valign="top" style="padding: 20px 0;">
                <table class="container" border="0" cellspacing="0" cellpadding="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center">
                            <table class="card" border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#0f172a">
                                <tr>
                                    <td class="card-body" align="left">
                                        <div class="header-icon">
                                            <img src="https://img.icons8.com/ios-filled/100/ffffff/calculator.png" alt="Simulation" width="40" height="40" />
                                        </div>
                                        <h1>Votre Simulation de Portage</h1>
                                        <p class="intro-text">
                                            Bonjour <strong>${p.name}</strong>,<br><br>
                                            Merci pour votre intérêt pour l'offre de portage salarial de BK Engineering.
                                            Voici l'analyse personnalisée de votre rémunération basée sur vos critères.
                                        </p>
                                        <div class="highlight-box">
                                            <div class="highlight-title">Revenu Net Mensuel Total</div>
                                            <div class="highlight-value">${p.revenuNetTotal}</div>
                                            <div class="highlight-subtitle">Soit environ <strong>${p.revenuNetTotalAnnuel} net / an</strong> dans votre poche</div>
                                        </div>
                                        <h3 class="section-title">Critères de simulation</h3>
                                        <table class="params-table" width="100%">
                                            <tr>
                                                <td class="row-item label-text">Taux Journalier Moyen (TJM)</td>
                                                <td class="row-item value-text">${p.tjm} € / jour</td>
                                            </tr>
                                            <tr>
                                                <td class="row-item label-text">Jours travaillés dans le mois</td>
                                                <td class="row-item value-text">${p.joursParMois} jours</td>
                                            </tr>
                                            <tr>
                                                <td class="row-item label-text">Frais professionnels remboursés</td>
                                                <td class="row-item value-text">${p.fraisPro} € / mois</td>
                                            </tr>
                                            <tr>
                                                <td class="row-item label-text">Statut de cotisations</td>
                                                <td class="row-item value-text">${p.statut}</td>
                                            </tr>
                                            <tr>
                                                <td class="row-item-last label-text">Mutuelle d'entreprise BK</td>
                                                <td class="row-item-last value-text">${p.mutuelle}</td>
                                            </tr>
                                        </table>
                                        <div class="divider"></div>
                                        <h3 class="section-title">Détail financier de votre facture</h3>
                                        <table class="details-table" width="100%">
                                            <tr>
                                                <td class="row-item label-text" style="font-weight: bold; color: #ffffff;">Chiffre d'Affaires Facturé Brut (CA)</td>
                                                <td class="row-item value-text" style="font-weight: bold; color: #ffffff;">${p.caMensuel}</td>
                                            </tr>
                                            <tr>
                                                <td class="row-item label-text">Frais de gestion BK Engineering (7%)</td>
                                                <td class="row-item value-minus">- ${p.fraisGestion}</td>
                                            </tr>
                                            <tr>
                                                <td class="row-item label-text">Charges Patronales (URSSAF / Prévoyance)</td>
                                                <td class="row-item value-minus">- ${p.chargesPatronales}</td>
                                            </tr>
                                            <tr>
                                                <td class="row-item label-text">Charges Salariales (URSSAF / Retraite)</td>
                                                <td class="row-item value-minus">- ${p.chargesSalariales}</td>
                                            </tr>
                                            <tr>
                                                <td class="row-item label-text" style="font-weight: bold; color: #10b981;">Salaire Net après cotisations</td>
                                                <td class="row-item value-net">${p.salaireNet}</td>
                                            </tr>
                                            <tr>
                                                <td class="row-item label-text">Remboursement de frais professionnels (Non taxés)</td>
                                                <td class="row-item value-net">+ ${p.fraisPro} €</td>
                                            </tr>
                                            <tr>
                                                <td class="row-item-last label-text" style="font-weight: 800; color: #ffffff;">Revenu Net Total ("Dans la poche")</td>
                                                <td class="row-item-last value-net" style="font-size: 16px; font-weight: 800;">${p.revenuNetTotal}</td>
                                            </tr>
                                        </table>
                                        <div class="visual-bar-container">
                                            <div class="bar-label">Répartition de la facturation</div>
                                            <table width="100%" height="14" style="height:14px; border-radius: 7px; overflow:hidden;" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td bgcolor="#10b981" width="${p.pctNet}%" style="width:${p.pctNet}%; height:14px;" title="Net">&nbsp;</td>
                                                    <td bgcolor="#a855f7" width="${p.pctSocial}%" style="width:${p.pctSocial}%; height:14px;" title="Cotisations">&nbsp;</td>
                                                    <td bgcolor="#0ea5e9" width="${p.pctGestion}%" style="width:${p.pctGestion}%; height:14px;" title="Gestion">&nbsp;</td>
                                                </tr>
                                            </table>
                                            <table class="legend-table" width="100%">
                                                <tr>
                                                    <td width="33%">
                                                        <span class="legend-dot" style="background-color: #10b981;"></span>
                                                        <span class="legend-text">Net (${p.pctNet}%)</span>
                                                    </td>
                                                    <td width="33%" align="center">
                                                        <span class="legend-dot" style="background-color: #a855f7;"></span>
                                                        <span class="legend-text">Charges (${p.pctSocial}%)</span>
                                                    </td>
                                                    <td width="33%" align="right">
                                                        <span class="legend-dot" style="background-color: #0ea5e9;"></span>
                                                        <span class="legend-text">Gestion (${p.pctGestion}%)</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="pedagogy-box">
                                            <h4 style="margin: 0 0 12px 0; font-size: 12px; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.5px;">Où vont vos cotisations sociales (${p.totalCotisations}) ?</h4>
                                            <div class="pedagogy-item">
                                                <div class="pedagogy-header">🏥 Santé & Prévoyance (${p.santeBreakdown})</div>
                                                <div class="pedagogy-desc">Couverture maladie, assurance maternité, mutuelle et garanties de prévoyance cadre.</div>
                                            </div>
                                            <div class="pedagogy-item">
                                                <div class="pedagogy-header">👴 Retraite de base & Complémentaire (${p.retraiteBreakdown})</div>
                                                <div class="pedagogy-desc">Cotisations pour vos régimes de retraite générale et complémentaire des cadres (Agirc-Arrco).</div>
                                            </div>
                                            <div class="pedagogy-item">
                                                <div class="pedagogy-header">🛡️ Assurance Chômage (${p.chomageBreakdown})</div>
                                                <div class="pedagogy-desc">Ouverture et maintien de vos droits à l'indemnisation chômage France Travail.</div>
                                            </div>
                                            <div class="pedagogy-item">
                                                <div class="pedagogy-header">🤝 Solidarité & Prestations (${p.solidariteBreakdown})</div>
                                                <div class="pedagogy-desc">Financement des allocations familiales, CSG/CRDS et de la formation professionnelle (CPF).</div>
                                            </div>
                                        </div>
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center" style="padding: 16px 0;">
                                                    <a href="https://bkengineering.fr/portage" class="button">Prendre RDV avec un expert</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="footer" align="center">
                                        &copy; 2026 BK Engineering.<br>
                                        Rennes & Paris, France<br><br>
                                        <span style="opacity: 0.7;">Cette simulation est basée sur les barèmes URSSAF 2026. Elle est fournie à titre indicatif et ne constitue pas un bulletin de paie contractuel.</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}

// 4. BK Simulation Notification Template (Admin Notification)
export function getAdminSimulationEmailHTML(p: SimulationParams): string {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle Simulation Portage - BK Engineering</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #0f172a;
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            color: #f8fafc;
            -webkit-font-smoothing: antialiased;
        }
        table {
            border-spacing: 0;
            border-collapse: collapse;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }
        .card {
            background-color: #1e293b;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            margin: 20px;
        }
        .accent-bar {
            height: 6px;
            background: linear-gradient(90deg, #10b981, #0ea5e9, #6366f1);
            background-color: #10b981;
            width: 100%;
        }
        .card-body {
            padding: 40px;
        }
        .icon-container {
            width: 80px;
            height: 80px;
            margin: 0 auto 24px auto;
            background: linear-gradient(135deg, #10b981, #059669);
            background-color: #10b981;
            border-radius: 20px;
            text-align: center;
        }
        .icon-container img {
            display: inline-block;
            border: 0;
            outline: none;
            width: 40px;
            height: auto;
            margin-top: 20px;
        }
        h1 {
            margin: 0 0 8px 0;
            font-size: 26px;
            font-weight: 800;
            color: #ffffff;
            text-align: center;
            letter-spacing: -0.5px;
        }
        .subtitle {
            color: #94a3b8;
            font-size: 15px;
            text-align: center;
            margin: 0 0 32px 0;
        }
        .content-box {
            background-color: #0f172a;
            border-radius: 16px;
            padding: 24px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            margin-bottom: 24px;
        }
        .section-header {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #10b981;
            font-weight: 700;
            margin-bottom: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 6px;
        }
        .field {
            margin-bottom: 16px;
        }
        .field:last-child {
            margin-bottom: 0;
        }
        .label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #94a3b8;
            font-weight: 600;
            margin-bottom: 4px;
            display: block;
        }
        .value {
            font-size: 15px;
            color: #f1f5f9;
            line-height: 1.5;
            margin: 0;
        }
        .value-highlight {
            font-size: 18px;
            color: #10b981;
            font-weight: bold;
        }
        .btn-table {
            width: 100%;
            margin-top: 24px;
        }
        .button {
            display: block;
            padding: 14px 20px;
            text-decoration: none;
            font-weight: bold;
            border-radius: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 12px;
            text-align: center;
        }
        .button-primary {
            background: linear-gradient(135deg, #10b981, #0ea5e9);
            background-color: #10b981;
            color: #ffffff !important;
        }
        .button-secondary {
            background-color: rgba(255, 255, 255, 0.05);
            color: #f1f5f9 !important;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #64748b;
            font-size: 13px;
        }
        @media only screen and (max-width: 600px) {
            .card {
                margin: 10px;
                border-radius: 16px;
            }
            .card-body {
                padding: 24px 16px !important;
            }
            h1 {
                font-size: 22px !important;
            }
            .content-box {
                padding: 16px !important;
            }
            .btn-col {
                display: block !important;
                width: 100% !important;
                margin-bottom: 12px;
            }
            .btn-col:last-child {
                margin-bottom: 0;
            }
        }
    </style>
</head>
<body>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0f172a">
        <tr>
            <td align="center" valign="top" style="padding: 20px 0;">
                <table class="container" border="0" cellspacing="0" cellpadding="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center">
                            <table class="card" border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#1e293b">
                                <tr>
                                    <td class="accent-bar" height="6"></td>
                                </tr>
                                <tr>
                                    <td class="card-body" align="left">
                                        <div class="icon-container">
                                            <img src="https://img.icons8.com/ios-filled/100/ffffff/user-credentials.png" alt="Prospect" width="40" height="40" />
                                        </div>
                                        <h1>Nouvelle Simulation !</h1>
                                        <p class="subtitle">Un prospect a simulé son revenu de portage salarial.</p>
                                        <div class="content-box">
                                            <div class="section-header">Informations du contact</div>
                                            <div class="field">
                                                <strong class="label">Nom complet</strong>
                                                <p class="value">${p.name}</p>
                                            </div>
                                            <div class="field">
                                                <strong class="label">Adresse email</strong>
                                                <p class="value"><a href="mailto:${p.email}" style="color: #60a5fa; text-decoration: none;">${p.email}</a></p>
                                            </div>
                                            <div class="field">
                                                <strong class="label">Téléphone</strong>
                                                <p class="value"><a href="tel:${p.phone}" style="color: #60a5fa; text-decoration: none;">${p.phone}</a></p>
                                            </div>
                                        </div>
                                        <div class="content-box">
                                            <div class="section-header">Détails de la simulation</div>
                                            <table width="100%">
                                                <tr>
                                                    <td width="50%" valign="top" style="padding-bottom:12px;">
                                                        <strong class="label">TJM Simulé</strong>
                                                        <p class="value">${p.tjm} €</p>
                                                    </td>
                                                    <td width="50%" valign="top" style="padding-bottom:12px;">
                                                        <strong class="label">Jours / Mois</strong>
                                                        <p class="value">${p.joursParMois} jours</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" valign="top" style="padding-bottom:12px;">
                                                        <strong class="label">Frais professionnels</strong>
                                                        <p class="value">${p.fraisPro} € / mois</p>
                                                    </td>
                                                    <td width="50%" valign="top" style="padding-bottom:12px;">
                                                        <strong class="label">Statut choisi</strong>
                                                        <p class="value">${p.statut}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td width="50%" valign="top" style="padding-bottom:12px;">
                                                        <strong class="label">Mutuelle BK</strong>
                                                        <p class="value">${p.mutuelle}</p>
                                                    </td>
                                                    <td width="50%" valign="top" style="padding-bottom:12px;">
                                                        <strong class="label">CA Mensuel Brut</strong>
                                                        <p class="value">${p.caMensuel}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" valign="top" style="padding-top:8px; border-top:1px solid rgba(255,255,255,0.05);">
                                                        <strong class="label">Revenu Net Total ("Poche")</strong>
                                                        <p class="value-highlight">${p.revenuNetTotal} / mois</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <table class="btn-table" width="100%">
                                            <tr>
                                                <td class="btn-col" width="48%">
                                                    <a href="mailto:${p.email}?subject=Votre simulation de portage salarial - BK Engineering" class="button button-primary">Répondre par Email</a>
                                                </td>
                                                <td width="4%">&nbsp;</td>
                                                <td class="btn-col" width="48%">
                                                    <a href="tel:${p.phone}" class="button button-secondary">Appeler le Prospect</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td class="footer" align="center">
                                        Généré par BK Engineering Portal <br>&bull;<br> Ne pas répondre directement à cet email système
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
