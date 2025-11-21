# Realtime Module

## Overview

WebSocket gateway for realtime updates using Socket.IO.

## Features

- Broadcast events for domain activities (e.g., needs, chores)
- Gateway and service under src/realtime

## Client Notes

- Connect with Socket.IO client
- Authenticate with JWT

## Authentication and Rooms

- Connect with `Authorization: Bearer <token>` header, or `auth.token`/`query.token` in the Socket.IO handshake.
- On successful auth, the server emits `connection:ready` and joins the socket to:
  - `user:<userId>` (private room)
  - `household:<householdId>` (if the user belongs to a household)
- When the user creates/joins/leaves a household, room membership is updated automatically via `syncUserHousehold`.

## Events

Event name → room → payload

Needs

- `needs:itemAdded` → `household:<id>` → `{ need }`
- `needs:itemUpdated` → `household:<id>` → `{ need }`
- `needs:itemPurchased` → `household:<id>` → `{ need }`
- `needs:expenseCreated` → `household:<id>` → `{ expenseId, description }`

Chores

- `chores:created` → `household:<id>` → `{ chore }`
- `chores:updated` → `household:<id>` → `{ chore }`
- `chores:completed` → `household:<id>` → `{ choreId }`
- `chores:assigned` → `household:<id>` → `{ choreId, assignedToId }`
- `chores:deleted` → `household:<id>` → `{ choreId }`

Expenses

- `expenses:created` → `household:<id>` → `{ expense }`
- `expenses:balanceUpdated` → `household:<id>` → `{ reason, expenseId?, fromUserId?, toUserId? }`
  - `reason` ∈ { `expenseCreated`, `paymentRecorded` }

Payments

- `payments:recorded` → `household:<id>` → `{ payment }`

Notifications

- `notifications:created` → `user:<id>` (targeted) or `household:<id>` (broadcast) → `{ notification }`
- `notifications:read` → `household:<id>` → `{ id }` or `{ all: true }`

Household membership

- `household:memberJoined` → `household:<id>` → `{ userId }`
- `household:memberLeft` → `household:<id>` → `{ userId }`
- `household:deleted` → `household:<id>` → `{ householdId }`

Connection

- `connection:ready` → socket → `{ userId, householdId | null }`

## Example Client

```ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  extraHeaders: { Authorization: `Bearer ${myJwt}` },
  // or
  // auth: { token: `Bearer ${myJwt}` },
  // query: { token: `Bearer ${myJwt}` },
});

socket.on('connect', () => console.log('connected', socket.id));
socket.on('connection:ready', (data) => console.log('ready', data));

socket.on('needs:itemAdded', (p) => console.log('need added', p));
socket.on('needs:itemUpdated', (p) => console.log('need updated', p));
socket.on('needs:itemPurchased', (p) => console.log('need purchased', p));
socket.on('needs:expenseCreated', (p) => console.log('need expense', p));

socket.on('chores:created', (p) => console.log('chore created', p));
socket.on('chores:updated', (p) => console.log('chore updated', p));
socket.on('chores:completed', (p) => console.log('chore completed', p));
socket.on('chores:assigned', (p) => console.log('chore assigned', p));
socket.on('chores:deleted', (p) => console.log('chore deleted', p));

socket.on('expenses:created', (p) => console.log('expense created', p));
socket.on('expenses:balanceUpdated', (p) => console.log('balance updated', p));

socket.on('payments:recorded', (p) => console.log('payment recorded', p));

socket.on('notifications:created', (p) => console.log('notification', p));
socket.on('notifications:read', (p) => console.log('notification read', p));

socket.on('household:memberJoined', (p) => console.log('member joined', p));
socket.on('household:memberLeft', (p) => console.log('member left', p));
socket.on('household:deleted', (p) => console.log('household deleted', p));
```
