# State & Data

## TanStack Query

- Configured in `src/main.tsx` via `QueryClientProvider`.
- Defaults: `retry: true`, `staleTime: 5s`, `refetchOnWindowFocus: false`.
- Feature hooks (e.g. `useAuth`, `useHousehold`, `useChores`) wrap queries/mutations.
- Query keys:
  - Auth: `["me"]`
  - Household: `["household", "me"]`
  - Chores: `["chores"]`
  - Needs: `["needs"]`
  - Expenses: `["expenses"]`, `["expenses", "balance"]`, `["expenses", "settlements"]`
  - Payments: `["payments"]`

## Zustand (UI)

- `src/stores/uiStore.ts` persists theme and controls sidebar/notifications.
- Store key: `ui-storage` (localStorage), only `theme` is persisted.

## Toasts

- `src/lib/toast.ts` wraps `react-hot-toast`.
- `Toaster` mounted in `src/main.tsx` (bottom-right, themed).
