## Portfolio Site (React, TypeScript, Tailwind, Node/Express)

Single-page developer portfolio showcasing frontend skills with React/TypeScript, Tailwind CSS, and a small secure Node/Express API for the contact form.

### Structure

- `client/` – React + TypeScript SPA using Vite and Tailwind v4.
- `server/` – Node + Express (TypeScript) API exposing `POST /api/contact`.

### Running locally

1. **Backend**

   ```bash
   cd server
   cp .env.example .env     # edit with your values
   npm install
   npm run dev
   ```

   The API runs on `http://localhost:4000` by default.

2. **Frontend**

   ```bash
   cd client
   npm install
   npm run dev
   ```

   Vite will print the local URL (typically `http://localhost:5173`).

### Environment variables (server)

Copy `.env.example` to `.env` and set:

- `PORT` – API port (default `4000`).
- `CLIENT_ORIGIN` – frontend origin for CORS (e.g. `http://localhost:5173`).
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` – SMTP credentials for sending mail.
- `CONTACT_TO` – the email address where contact form submissions are delivered.

Never commit your real `.env` file or credentials. Keep `.env.example` as placeholders only (no real emails or passwords in the repo).

### Security considerations

- All incoming contact payloads are validated with `zod` on the backend.
- Rate limiting and Helmet are enabled to reduce abuse and add security headers.
- CORS is restricted to the configured `CLIENT_ORIGIN`.
- The frontend performs basic client-side validation but the backend is the source of truth.
- Error responses are generic; internal details are logged on the server only.
- Mail credentials are read from the environment at runtime only (no secrets in source code).

### Deploy to production (Vercel + Render)

Deploy the **backend first** so you have an API URL for the frontend.

#### 1. Backend on Render

1. Push the repo to GitHub (ensure `server/.env` is not committed).
2. Go to [render.com](https://render.com) → **Dashboard** → **New** → **Web Service**.
3. Connect your GitHub repo and select this repository.
4. Configure:
   - **Name:** e.g. `portfolio-api`
   - **Region:** choose one close to you
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
5. Under **Environment**, add (use “Add Environment Variable” for each):
   - `CLIENT_ORIGIN` – set this to your **Vercel frontend URL** after you deploy (e.g. `https://your-project.vercel.app`). You can add a temporary value like `https://placeholder.vercel.app` now and change it in step 4 below.
   - `SMTP_HOST` – e.g. `smtp.gmail.com`
   - `SMTP_PORT` – `587`
   - `SMTP_USER` – your sending email
   - `SMTP_PASS` – your app password (no spaces)
   - `CONTACT_TO` – email where form submissions go (e.g. `etdann01@gmail.com`)
6. Click **Create Web Service**. Wait for the first deploy.
7. Copy your backend URL (e.g. `https://portfolio-api-xxxx.onrender.com`). You’ll use it for the frontend.

**Note:** Render’s free tier spins down after ~15 minutes of no traffic; the first request after that may take 30–60 seconds.

#### 2. Frontend on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Import the same GitHub repo.
3. Configure:
   - **Root Directory:** leave as repo root, then click **Edit** and set to `client` (or leave root and set “Root Directory” to `client` in Project Settings if the UI shows it).
   - **Framework Preset:** Vite (Vercel usually detects it).
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Under **Environment Variables**, add:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** your Render backend URL from step 1 (e.g. `https://portfolio-api-xxxx.onrender.com`) — no trailing slash.
5. Deploy. Copy your Vercel URL (e.g. `https://your-project.vercel.app`).

#### 3. Point backend CORS at the live frontend

1. In Render → your Web Service → **Environment**.
2. Set `CLIENT_ORIGIN` to your **exact** Vercel URL (e.g. `https://your-project.vercel.app`). Save.
3. Render will redeploy automatically. After that, the contact form on the live site will work.

#### 4. Optional: custom domain

- **Vercel:** Project → Settings → Domains → add your domain and follow DNS instructions.
- **Render:** Service → Settings → Custom Domain. After adding a domain, set `CLIENT_ORIGIN` to your frontend domain (e.g. `https://yourdomain.com`).

