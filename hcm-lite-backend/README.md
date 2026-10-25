# HCM Lite Backend

Stage 0–1 foundation for the Saylani Hackathon 2026 HCM Lite project. This repository currently contains the Express/Mongoose application shell only; the HR modules are not implemented yet.

## Requirements
- Node.js 20+
- MongoDB (local or hosted)
- npm

## Run locally
```bash
npm install
cp .env.example .env
```
On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp`.
Edit `.env` locally and set `MONGODB_URI`. Do not share secrets or commit `.env`.

```bash
npm run check
npm test
npm run dev
```
The API listens on `http://localhost:4000` by default. Check `http://localhost:4000/api/health`; a healthy response has HTTP 200 and `data.database` equal to `connected`.

## Environment
- `PORT`: API port (default 4000)
- `MONGODB_URI`: MongoDB connection string
- `CORS_ORIGINS`: comma-separated allowed frontend origins
- `JWT_SECRET`, `JWT_EXPIRES_IN`: reserved for Stage 2 authentication
- `AI_API_KEY`: reserved for the AI module; keep it server-side
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`: optional first-run setup configuration to be implemented in Stage 2; do not set real credentials in committed files

## API status
- `GET /api/health`: implemented; returns service and database health.
- `/api/v1/*`: versioned API namespace is reserved; module endpoints are not implemented yet.

## Security notes
The foundation enables Helmet, explicit CORS allowlisting, JSON request-size limits, and general API rate limiting. Authentication, authorization, request validators, business models, and AI safeguards are pending later stages. Do not deploy this foundation as a completed HR system.

## Progress
See [`PROJECT_PROGRESS.md`](./PROJECT_PROGRESS.md) for the 25-functionality traceability checklist and next step.
