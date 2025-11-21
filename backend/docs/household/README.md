# Household Module

## Overview

Manages households, membership, and invite codes.

## Key Models

- Prisma: Household, User (relation)

## Endpoints

| Method | Path              | Body DTO           | Auth   | Notes                   |
| ------ | ----------------- | ------------------ | ------ | ----------------------- |
| POST   | /households       | CreateHouseholdDto | Bearer | Create a household      |
| POST   | /households/join  | JoinHouseholdDto   | Bearer | Join via invite code    |
| POST   | /households/leave | -                  | Bearer | Leave current household |
| GET    | /households/me    | -                  | Bearer | Get my household        |

## Notes

- Users may belong to a single household via householdId.

### Household fields (summary)

- id, name (string), inviteCode (string, unique), createdAt, updatedAt
- Relations: users → User[]

### Invite Codes

- Random uppercase alphanumeric (length 8 by default), unique per household.
- Used by POST /households/join to add a user to a household.

### Membership Rules

- A user can belong to at most one household.
- Creating a household auto-joins the creator.
- Leaving a household removes the relation; if last member leaves, dependent records are deleted and the household is removed.

### Realtime

- On create/join/leave, the server syncs socket rooms via `syncUserHousehold`.
- Events:
  - `household:memberJoined` → `household:<id>` → `{ userId }`
  - `household:memberLeft` → `household:<id>` → `{ userId }`
  - `household:deleted` → `household:<id>` → `{ householdId }`

## Examples

Create household

```
POST /households
Authorization: Bearer <JWT>
Content-Type: application/json

{ "name": "Room 101" }
```

Join via invite

```
POST /households/join
Authorization: Bearer <JWT>
Content-Type: application/json

{ "inviteCode": "AB12CD34" }
```

Leave

```
POST /households/leave
Authorization: Bearer <JWT>
```
