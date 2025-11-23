# Needs (Frontend)

Files:

- `src/features/needs/api.ts`
- Related pages/components under `src/pages/Needs.tsx`

Endpoints used:

- `GET /needs`
- `POST /needs`
- `PATCH /needs/:id`
- `PATCH /needs/:id/purchase`
- `DELETE /needs/:id`

Realtime:

- `needs:itemAdded|itemUpdated|itemPurchased|expenseCreated` invalidate `["needs"]` and sometimes expenses.
