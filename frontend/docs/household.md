# Household (Frontend)

Files:

- `src/features/household/api.ts`
- `src/hooks/useHousehold.ts`

Endpoints used:

- `GET /households/me`
- `POST /households`
- `POST /households/join`
- `POST /households/leave`

Usage:

```ts
const { household, createHousehold, joinHousehold, leaveHousehold } =
  useHousehold();

createHousehold({ name, currency });
joinHousehold({ inviteCode });
leaveHousehold();
```

Notes:

- `useHousehold` invalidates chores/needs/expenses/payments on leave.
- Users without a household are redirected to `/household` by `HouseholdRequiredRoute`.
