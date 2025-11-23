# Payments (Frontend)

Files:

- `src/features/payments/api.ts`
- `src/pages/Payments.tsx`

Endpoints used:

- `GET /payments`
- `POST /payments`

Realtime:

- `payments:recorded` invalidates `["payments"]` and `["expenses", "balance"]`.
