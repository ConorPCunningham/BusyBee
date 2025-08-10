# BusyBee — Full Project (Stripe-ready)
Generated: 2025-08-10T22:23:10.999941Z

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind
- Prisma (Postgres)
- Availability system (helper heartbeat, heat chips, nearby badge)
- Mapbox geocoder (optional) with fallbacks + rate limiting
- Stripe Connect (Express) onboarding for helpers
- Stripe Checkout with application fee & automatic split payouts
- Webhooks to sync escrow/job state
- Vercel cron for presence cleanup

## Local setup
```bash
npm install
cp .env.example .env.local
# Fill DATABASE_URL, MAPBOX_TOKEN (optional), Stripe keys
npx prisma migrate dev --name init
npm run dev
# Optional: listen to webhooks
# stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Open:
- /                (home + availability widgets)
- /jobs/new        (job form demo)
- /jobs/<jobId>/pay  (checkout page; requires Job row with helperId, priceCents, currency)
- /helper/dashboard (availability + Stripe connect)
- /auth/demo       (demo login)
