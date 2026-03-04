import nodemailer from 'nodemailer';

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/** All mail config must come from environment variables; never hardcode secrets. */
function getMailConfig() {
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
  const { smtpHost, smtpPort, smtpUser, smtpPass, contactTo } = getMailConfig();

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const { name, email, message } = payload;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${smtpUser}>`,
    to: contactTo,
    subject: `New portfolio message from ${name}`,
    replyTo: email,
    text: message,
  });
}

