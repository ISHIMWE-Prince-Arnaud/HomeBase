# API Client

Path: `src/api/client.ts`

- Base URL: `import.meta.env.VITE_API_URL` (default `http://localhost:3000`).
- Cookies: `withCredentials: true` for HttpOnly `access_token` cookie.
- Headers: `Content-Type: application/json`.
- Interceptor: logs 401 Unauthorized and rethrows.

Example:

```ts
import { api } from "@/api/client";

const res = await api.get("/needs");
```
