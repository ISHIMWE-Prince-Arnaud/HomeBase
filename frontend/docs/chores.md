# Chores (Frontend)

Files:

- `src/features/chores/api.ts`
- `src/hooks/useChores.ts`

Endpoints used:

- `GET /chores`
- `GET /chores/:id`
- `POST /chores`
- `PATCH /chores/:id`
- `PATCH /chores/:id/complete`
- `DELETE /chores/:id`

Usage:

```ts
const { chores, createChore, updateChore, completeChore, deleteChore } =
  useChores();

createChore({ title, description, dueDate });
updateChore({ id, data });
completeChore(id);
deleteChore(id);
```

Realtime:

- `chores:*` events invalidate `["chores"]`.
