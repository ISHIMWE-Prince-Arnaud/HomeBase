# Routing

Defined in `src/App.tsx` with React Router.

- Public
  - `/login`
  - `/register`
- Protected (requires auth)
  - `/household` — Manage or join a household
  - `/profile`
  - Requires existing household (wrapped by `HouseholdRequiredRoute`)
    - `/dashboard`
    - `/chores`
    - `/needs`
    - `/expenses`
    - `/payments`
    - `/notifications`
- Fallback: `*` → `/dashboard`

Guards:

- `ProtectedRoute` — redirects unauthenticated users to `/login`.
- `HouseholdRequiredRoute` — redirects users without a household to `/household`.
