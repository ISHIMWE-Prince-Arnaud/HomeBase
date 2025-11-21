# Payment Module

## Overview

Represents settlements between users within a household.

## Key Models

- Prisma: Payment, User, Household

### Payment fields (summary)

- id, fromUserId (number), toUserId (number), amount (number, integer units), householdId (number), createdAt, updatedAt

## Endpoints

| Method | Path      | Body DTO         | Auth   | Notes            |
| ------ | --------- | ---------------- | ------ | ---------------- |
| POST   | /payments | CreatePaymentDto | Bearer | Create a payment |
| GET    | /payments | -                | Bearer | List payments    |

## Notes

- Links payer and payee to reconcile balances.
- Validation:
  - `fromUserId !== toUserId`
  - `amount > 0`
  - Both users must belong to the same household
  - Amount cannot exceed the direct debt owed from payer to payee

## DTOs

CreatePaymentDto

```
{
  "toUserId": number,
  "amount": number
}
```

## WebSocket Events

- `payments:recorded` → household:<id> → `{ payment }`
- `expenses:balanceUpdated` → household:<id> → `{ reason: 'paymentRecorded', fromUserId, toUserId }`

## Examples

Create payment

```
POST /payments
Authorization: Bearer <JWT>
Content-Type: application/json

{ "toUserId": 2, "amount": 50 }
```

List payments

```
GET /payments
Authorization: Bearer <JWT>
```
