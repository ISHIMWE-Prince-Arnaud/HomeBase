# Notifications (Frontend)

Files:

- `src/features/notifications/api.ts`
- `src/pages/Notifications.tsx`

Endpoints used:

- `GET /notifications`
- `PATCH /notifications/:id/read`
- `PATCH /notifications/read-all`

Realtime:

- `notifications:created|read` invalidates `["notifications"]`.
