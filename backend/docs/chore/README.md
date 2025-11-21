# Chore Module

## Overview

Create and manage household chores and assignments.

## Key Models

- Prisma: Chore, User (assignedTo), Household

### Chore fields (summary)

- id, title (string, required), description? (string), dueDate? (Date), isComplete (boolean, default false), householdId (number, required), assignedToId? (number), createdAt, updatedAt

## Endpoints

| Method | Path                 | Body DTO       | Auth   | Notes               |
| ------ | -------------------- | -------------- | ------ | ------------------- |
| GET    | /chores              | -              | Bearer | List chores         |
| POST   | /chores              | CreateChoreDto | Bearer | Create chore        |
| GET    | /chores/:id          | -              | Bearer | Get chore by id     |
| PATCH  | /chores/:id          | UpdateChoreDto | Bearer | Update chore        |
| PATCH  | /chores/:id/complete | -              | Bearer | Mark chore complete |
| DELETE | /chores/:id          | -              | Bearer | Delete chore        |

## Notes

- Chores can be assigned to a user; dueDate and completion supported.

## DTOs

CreateChoreDto

```
{
  "title": string,
  "description"?: string,
  "dueDate"?: ISO8601 string,
  "assignedToId"?: number
}
```

UpdateChoreDto

```
{
  "isComplete"?: boolean,
  "dueDate"?: ISO8601 string (must be in the future),
  "assignedToId"?: number | null
}
```

Validation

- assignedToId (if provided) must belong to the same household.
- dueDate (if provided) must be a future timestamp.

## WebSocket Events

- `chores:created` → household:<id> → `{ chore }`
- `chores:updated` → household:<id> → `{ chore }`
- `chores:completed` → household:<id> → `{ choreId }`
- `chores:assigned` → household:<id> → `{ choreId, assignedToId }`
- `chores:deleted` → household:<id> → `{ choreId }`

## Examples

Create chore

```
POST /chores
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "title": "Take out trash",
  "dueDate": "2026-01-02T18:00:00.000Z",
  "assignedToId": 2
}
```

Mark complete

```
PATCH /chores/123/complete
Authorization: Bearer <JWT>
```
