import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { contactRouter } from './routes/contact';

const app = express();
const port = Number(process.env.PORT) || 4000;
const clientOriginRaw = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const clientOrigins = clientOriginRaw.split(',').map((o) => o.trim()).filter(Boolean);

app.use(
  cors({
    origin: clientOrigins.length > 1 ? clientOrigins : clientOrigins[0] || 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.use(express.json());

app.use('/api/contact', contactRouter);

app.get('/', (_req, res) => {
  res.json({ service: 'portfolio-api', status: 'ok' });
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // Do not leak internal errors to the client
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});

