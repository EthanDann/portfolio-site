import nodemailer from 'nodemailer';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/** Use Resend API if RESEND_API_KEY is set (works on Render; no SMTP). Otherwise use SMTP. */
async function sendViaResend(payload: ContactPayload, contactTo: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');

  const from = process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [contactTo],
      subject: `New portfolio message from ${payload.name}`,
      text: payload.message,
      reply_to: payload.email,
    }),
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(err?.message || `Resend API error: ${res.status}`);
  }
}

function getSmtpConfig() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactTo = process.env.CONTACT_TO;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !contactTo) {
    throw new Error(
      'Missing SMTP or contact configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO in the environment.',
    );
  }

  return { smtpHost, smtpPort, smtpUser, smtpPass, contactTo };
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const contactTo = process.env.CONTACT_TO;
  if (!contactTo) {
    throw new Error('CONTACT_TO must be set in the environment.');
  }

  if (process.env.RESEND_API_KEY) {
    await sendViaResend(payload, contactTo);
    return;
  }

  const { smtpHost, smtpPort, smtpUser, smtpPass } = getSmtpConfig();

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${smtpUser}>`,
    to: contactTo,
    subject: `New portfolio message from ${payload.name}`,
    replyTo: payload.email,
    text: payload.message,
  });
}

