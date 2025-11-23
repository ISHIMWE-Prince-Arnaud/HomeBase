# Realtime

- Provider: `src/features/realtime/RealtimeProvider.tsx`.
- Connects to `VITE_API_URL` via Socket.IO with `withCredentials: true`.
- On events, invalidates mapped query keys from `src/features/realtime/events.ts`.

Events (subset):

- needs: `needs:itemAdded`, `needs:itemUpdated`, `needs:itemPurchased`, `needs:expenseCreated`
- chores: `chores:created`, `chores:updated`, `chores:completed`, `chores:assigned`, `chores:deleted`
- expenses: `expenses:created`, `expenses:balanceUpdated`
- payments: `payments:recorded`
- notifications: `notifications:created`, `notifications:read`
- household: `household:memberJoined`, `household:memberLeft`, `household:deleted`

Notes:

- Connection is active only when `user` is present (from `useAuth`).
- Transport: `websocket` only; autoConnect enabled.
