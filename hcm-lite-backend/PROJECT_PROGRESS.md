# HCM Lite — Project Progress

## Current checkpoint
- Stage 0: completed — challenge brief reviewed and implementation checklist created.
- Stage 1: foundation files created; verification pending in the user's local environment.
- No frontend code has been created.
- No employee, company, or other business seed data is created.

## Stage 0 — brief and architecture
Primary source: `Saylani_Hackathon_HCM_Lite_Brief.pdf` (7 PDF pages; content labels pages 1–6).
Architecture: Node.js ES modules, Express, Mongoose/MongoDB, versioned `/api/v1`, services separated from controllers/routes, server-side role and company/employee scope, hosted tool-calling LLM accessed only through backend.
Core rules recorded for later implementation:
- Setup starts with an empty database; one-time setup creates company + initial Admin.
- Office starts 09:00, 15-minute grace, late after 09:15; weekends Saturday/Sunday; half-day under 5 working hours.
- Leave quotas: annual 14, sick 8, casual 10, unpaid unlimited; count weekdays excluding configured holidays.
- Payroll: gross = 1.5 × basic; HRA 40% basic; medical 10% basic; daily gross / working days; deduction for absent + unpaid + 0.5 × half-days; annualized tax brackets per brief; Admin-only finalization and immutable finalized runs.
- AI: backend-only key, tools reuse authorized services, 15-second timeout, approx. 20 requests/user/hour, log safely, never write data automatically.

## 25-functionality traceability checklist
Status means implementation status, not merely planned endpoint.

| # | Brief functionality | Planned API area | Status |
|---|---|---|---|
| 01 | First-run company + Admin setup | `/api/v1/setup` | Pending |
| 02 | Login/logout/change password, role-based access | `/api/v1/auth` | Pending |
| 03 | Company settings, office hours/location/radius | `/api/v1/organization` | Pending |
| 04 | Departments/designations/leave types/holidays | corresponding `/api/v1/*` | Pending |
| 05 | Create/deactivate/reset HR logins | `/api/v1/users` | Pending |
| 06 | Register employee and create login; edit details | `/api/v1/employees` | Pending |
| 07 | Directory search/filters and Employee 360 | `/api/v1/employees` | Pending |
| 08 | CSV dry-run import and export | `/api/v1/employees/import`, `/export` | Pending |
| 09 | Web check-in/check-out | `/api/v1/attendance` | Pending |
| 10 | Attendance calendar and daily board | `/api/v1/attendance` | Pending |
| 11 | Attendance correction request/approval | `/api/v1/attendance-corrections` | Pending |
| 12 | Apply/cancel leave; balance/history | `/api/v1/leaves` | Pending |
| 13 | Approve/reject leave with comment | `/api/v1/leaves/:id/decision` | Pending |
| 14 | Salary structure per employee | `/api/v1/employees/:id/salary` | Pending |
| 15 | Monthly payroll draft/review | `/api/v1/payroll` | Pending |
| 16 | Admin finalizes/locks payroll | `/api/v1/payroll/:id/finalize` | Pending |
| 17 | Payslip PDF download and authorized listing | `/api/v1/payslips` | Pending |
| 18 | Dashboards/KPIs/trends/filters | `/api/v1/dashboard` | Pending |
| 19 | AI chat using real data and role scope | `/api/v1/ai/chat` | Pending |
| 20 | AI dashboard summary | `/api/v1/ai/dashboard-summary` | Pending |
| 21 | Smart leave suggestion, user confirms | `/api/v1/ai/smart-leave` | Pending |
| 22 | Policy Q&A | `/api/v1/ai/policy-qa` | Pending |
| 23 | Announcements | `/api/v1/announcements` | Pending |
| 24 | In-app notifications/read status | `/api/v1/notifications` | Pending |
| 25 | Append-only audit log, Admin viewing | `/api/v1/audit-logs` | Pending |

## Stage 1 files
- `package.json`
- `.env.example`, `.gitignore`
- `src/config/env.js`, `src/config/database.js`
- `src/app.js`, `src/server.js`
- `src/middleware/notFound.js`, `src/middleware/errorHandler.js`
- `tests/health.test.js`
- `README.md`

## Verification
Run in the `backend` folder:
1. `node --version` (Node.js 20+ recommended)
2. `npm install`
3. Copy `.env.example` to `.env`, then set `MONGODB_URI` to your local or hosted MongoDB connection string. Do not send secrets in chat.
4. `npm run check`
5. `npm test`
6. Start MongoDB, then run `npm run dev`
7. In another terminal: `curl http://localhost:4000/api/health`

Expected health response: HTTP 200 with `success: true` and `data.database: "connected"` when MongoDB is connected. Without MongoDB, the server intentionally exits on startup; health will not claim the database is healthy.

## Next exact step
Stage 2: implement Company/User models, one-time setup with race-safe Admin creation, password hashing, login/logout/password change, JWT middleware, role guards, and company/employee data-scope helpers. Add tests before proceeding.
