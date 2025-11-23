# Auth (Frontend)

Files:

- `src/features/auth/api.ts`
- `src/hooks/useAuth.ts`

Endpoints used:

- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `GET /auth/users/me`
- `PATCH /auth/users/me`

Notes:

- Server sets HttpOnly `access_token` cookie on login/register.
- Axios client uses `withCredentials: true`.

Usage (hook):

```ts
const { user, isAuthenticated, login, register, logout, updateProfile } =
  useAuth();

login({ email, password });
register({ email, password, name });
logout();
updateProfile({ name, password, profileImage });
```
