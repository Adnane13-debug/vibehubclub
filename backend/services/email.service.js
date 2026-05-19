import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Send welcome email to approved member
 * @param {string} to - recipient email
 * @param {string} prenom - recipient first name
 * @param {string} tempPassword - generated temp password
 */
export const sendWelcomeEmail = async (to, prenom, tempPassword) => {
  const loginUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

  const { data, error } = await resend.emails.send({
    from: `VibeHub Club <${process.env.FROM_EMAIL}>`,
    to,
    subject: '🎉 Bienvenue chez VibeHub Club — Vos accès',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Bienvenue chez VibeHub</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f8f7f3;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f3;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="background:#f59e0b;padding:36px 40px;text-align:center;">
                    <h1 style="margin:0;font-size:28px;font-weight:900;color:#1e293b;letter-spacing:-0.5px;">
                      VibeHub Club
                    </h1>
                    <p style="margin:6px 0 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:2px;color:#1e293b99;">
                      University Club
                    </p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px 40px 32px;">
                    <p style="margin:0 0 8px;font-size:22px;font-weight:800;color:#0f172a;">
                      Salam ${prenom} ! 👋
                    </p>
                    <p style="margin:0 0 24px;font-size:15px;color:#475569;line-height:1.6;">
                      Votre demande d'adhésion a été <strong style="color:#16a34a;">acceptée</strong>.
                      Bienvenue dans la communauté VibeHub Club !
                    </p>

                    <!-- Credentials box -->
                    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:28px;">
                      <p style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;">
                        Vos accès temporaires
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">
                            <span style="font-size:13px;color:#64748b;">Email</span>
                          </td>
                          <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;text-align:right;">
                            <strong style="font-size:13px;color:#0f172a;">${to}</strong>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:8px 0;">
                            <span style="font-size:13px;color:#64748b;">Mot de passe temporaire</span>
                          </td>
                          <td style="padding:8px 0;text-align:right;">
                            <strong style="font-size:15px;color:#f59e0b;font-family:monospace;letter-spacing:1px;">${tempPassword}</strong>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Warning -->
                    <div style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;padding:14px 18px;margin-bottom:28px;">
                      <p style="margin:0;font-size:13px;color:#92400e;">
                        ⚠️ <strong>Changez votre mot de passe</strong> dès votre première connexion depuis votre profil.
                      </p>
                    </div>

                    <!-- CTA Button -->
                    <div style="text-align:center;margin-bottom:32px;">
                      <a href="${loginUrl}/login"
                         style="display:inline-block;background:#f59e0b;color:#1e293b;font-size:15px;font-weight:800;text-decoration:none;padding:14px 36px;border-radius:10px;letter-spacing:0.3px;">
                        Se connecter →
                      </a>
                    </div>

                    <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">
                      Vous avez des questions ? Contactez-nous directement sur le site.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f8f7f3;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#94a3b8;">
                      © 2025 VibeHub Club · CMC OFPPT, Casablanca
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }

  return data
}

/**
 * Send password change verification code
 * @param {string} to - recipient email
 * @param {string} prenom - recipient first name
 * @param {string} code - 6-digit verification code
 */
export const sendPasswordChangeCode = async (to, prenom, code) => {
  const { data, error } = await resend.emails.send({
    from: `VibeHub Club <${process.env.FROM_EMAIL}>`,
    to,
    subject: '🔐 Code de vérification — Changement de mot de passe',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Code de vérification</title>
      </head>
      <body style="margin:0;padding:0;background-color:#f8f7f3;font-family:'Segoe UI',Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7f3;padding:40px 0;">
          <tr>
            <td align="center">
              <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                <!-- Header -->
                <tr>
                  <td style="background:#f59e0b;padding:36px 40px;text-align:center;">
                    <h1 style="margin:0;font-size:28px;font-weight:900;color:#1e293b;">VibeHub Club</h1>
                    <p style="margin:6px 0 0;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:2px;color:#1e293b99;">Sécurité du compte</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="padding:40px;">
                    <p style="margin:0 0 8px;font-size:20px;font-weight:800;color:#0f172a;">Salam ${prenom} 👋</p>
                    <p style="margin:0 0 28px;font-size:15px;color:#475569;line-height:1.6;">
                      Voici votre code de vérification pour changer votre mot de passe :
                    </p>

                    <!-- Code box -->
                    <div style="background:#f8fafc;border:2px solid #f59e0b;border-radius:12px;padding:28px;text-align:center;margin-bottom:28px;">
                      <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Code de vérification</p>
                      <p style="margin:0;font-size:42px;font-weight:900;color:#f59e0b;font-family:monospace;letter-spacing:8px;">${code}</p>
                    </div>

                    <!-- Warning -->
                    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:14px 18px;margin-bottom:20px;">
                      <p style="margin:0;font-size:13px;color:#991b1b;">
                        ⏱️ Ce code expire dans <strong>10 minutes</strong>. Si vous n'avez pas demandé ce changement, ignorez cet email.
                      </p>
                    </div>

                    <p style="margin:0;font-size:13px;color:#94a3b8;">
                      Pour votre sécurité, ne partagez jamais ce code avec quelqu'un d'autre.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#f8f7f3;padding:20px 40px;border-top:1px solid #e2e8f0;text-align:center;">
                    <p style="margin:0;font-size:12px;color:#94a3b8;">© 2025 VibeHub Club · CMC OFPPT, Casablanca</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  })

  if (error) throw new Error(`Resend error: ${error.message}`)
  return data
}
