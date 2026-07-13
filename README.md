# CodeTrackr

CodeTrackr is a MERN stack DSA tracking dashboard with JWT cookie authentication, protected per-user problem tracking, dashboard statistics, streaks, revisions, search, filtering, sorting, pagination, and a modern light/dark SaaS UI.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT stored in an HTTP-only cookie
- Deployment targets: Vercel for frontend, Render for backend

## Local Setup

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Create `backend/.env` from `backend/.env.example`.

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Create `frontend/.env` from `frontend/.env.example`.

5. Start the backend:

```bash
cd backend
npm run dev
```

6. Start the frontend:

```bash
cd frontend
npm run dev
```

## Required Environment Variables

Backend:

- `NODE_ENV`: `development` or `production`
- `PORT`: backend port, usually `3000` locally
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: long random signing secret
- `JWT_EXPIRES_IN`: JWT lifetime, for example `7d`
- `CLIENT_URL`: allowed frontend origin; comma-separate multiple origins

Frontend:

- `VITE_API_URL`: backend API URL ending in `/api`

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/problems`
- `GET /api/problems/:id`
- `POST /api/problems`
- `PATCH /api/problems/:id`
- `PATCH /api/problems/:id/revision`
- `DELETE /api/problems/:id`
- `DELETE /api/problems`
- `GET /api/dashboard/stats`

## Deployment

Frontend on Vercel:

- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_API_URL=https://your-render-service.onrender.com/api`

Backend on Render:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add all backend environment variables from `backend/.env.example`
- Set `NODE_ENV=production`
- Set `CLIENT_URL` to your Vercel URL

Important production note: the backend uses cross-site HTTP-only cookies in production with `sameSite: none` and `secure: true`, so the Render backend must be served over HTTPS and `CLIENT_URL` must exactly match the Vercel origin.

## Testing Checklist

- Register, login, logout, and refresh persistence work.
- Unauthenticated users see the auth screen.
- Problems are scoped to the signed-in user.
- Create, edit, delete, delete all, status update, and revision recording work.
- Search, filters, sorting, and pagination update from backend data.
- Dashboard totals, streaks, revisions, platform distribution, and recent activity refresh after mutations.
- Light/dark theme toggles and persists.
- Frontend lint and production build pass.
- Backend syntax check passes.

## Potential Issues

- Existing pre-auth problem records do not have a `user` owner and will not appear in authenticated accounts unless migrated.
- Production cookies require HTTPS.
- If the frontend and backend domains change, update `CLIENT_URL` and `VITE_API_URL` together.
