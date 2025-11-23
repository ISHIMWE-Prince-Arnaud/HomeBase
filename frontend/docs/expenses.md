# Expenses (Frontend)

Files:

- `src/features/expenses/api.ts`
- `src/pages/Expenses.tsx`

Endpoints used:

- `GET /expenses`
- `POST /expenses`
- `GET /expenses/balance`
- `GET /expenses/settlements`
- `GET /expenses/settlements/me`

Notes:

- Amounts are numeric (scaled if backend returns `scale`).
- Balance and settlements are cached under `["expenses", "balance"]` and `["expenses", "settlements"]`.
- Realtime `expenses:created|balanceUpdated` invalidates these queries.
