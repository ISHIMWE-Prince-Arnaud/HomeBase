# Notification Module

## Overview

Create and manage in-app notifications for users.

## Key Models

- Prisma: Notification, User, Household

## Endpoints

| Method | Path                    | Body DTO | Auth   | Notes              |
| ------ | ----------------------- | -------- | ------ | ------------------ |
| GET    | /notifications          | -        | Bearer | List notifications |
| PATCH  | /notifications/:id/read | -        | Bearer | Mark one as read   |
| PATCH  | /notifications/read-all | -        | Bearer | Mark all as read   |

## Notes

- `isRead` flag and `type` string field supported.
- Each notification belongs to a household; `userId` is optional for targeting a single user.

### Notification fields (summary)

- id, householdId (number), userId? (number), message (string), type? (string), isRead (boolean), createdAt, updatedAt

## WebSocket Events

- `notifications:created` →
  - `user:<id>` when targeted → `{ notification }`
  - `household:<id>` when broadcast → `{ notification }`
- `notifications:read` → `household:<id>` → `{ id }` or `{ all: true }`

## Examples

List

```
GET /notifications
Authorization: Bearer <JWT>
```

Mark one as read

```
PATCH /notifications/123/read
Authorization: Bearer <JWT>
```

Mark all as read

```
PATCH /notifications/read-all
Authorization: Bearer <JWT>
```
