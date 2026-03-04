import { Router } from 'express';
import { z } from 'zod';
import { sendContactEmail } from '../services/sendMail';

export const contactRouter = Router();

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  message: z.string().min(10).max(5000),
});

contactRouter.post('/', async (req, res) => {
  const parseResult = contactSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      message: 'Invalid input',
      errors: parseResult.error.flatten(),
    });
  }

  const { name, email, message } = parseResult.data;

  try {
    await sendContactEmail({ name, email, message });
    return res.status(200).json({ message: 'Message sent' });
  } catch (error) {
    console.error('Error sending contact email', error);
    return res.status(500).json({ message: 'Failed to send message' });
  }
});

