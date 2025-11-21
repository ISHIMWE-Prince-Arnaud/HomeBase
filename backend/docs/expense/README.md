# Expense Module

## Overview

Tracks expenses, participants, and shares for settlement.

## Key Models

- Prisma: Expense, ExpenseParticipant, User, Household

### Expense fields (summary)

- id, description (string), totalAmount (number, integer units), date? (Date), paidById (number), householdId (number), createdAt, updatedAt
- participants: ExpenseParticipant[] – each has (id, expenseId, userId, shareAmount)

## Endpoints

| Method | Path                     | Body DTO         | Auth   | Notes                 |
| ------ | ------------------------ | ---------------- | ------ | --------------------- |
| POST   | /expenses                | CreateExpenseDto | Bearer | Create an expense     |
| GET    | /expenses                | -                | Bearer | List expenses         |
| GET    | /expenses/balance        | -                | Bearer | Household balance     |
| GET    | /expenses/settlements    | -                | Bearer | Suggested settlements |
| GET    | /expenses/settlements/me | -                | Bearer | My settlements        |

## Notes

- `participants` capture user shares per expense.
- Balance = sum(paid) - sum(owes) per user; settlements provide a minimal set of transfers.

## DTOs

CreateExpenseDto

```
{
  "description": string,
  "totalAmount": number,        // integer units
  "date"?: ISO8601 string,
  "paidById": number,
  "participants": number[]      // user IDs
}
```

Validation

- totalAmount >= 0, participants non-empty and unique.

## WebSocket Events

- `expenses:created` → household:<id> → `{ expense }`
- `expenses:balanceUpdated` → household:<id> → `{ reason, expenseId? , fromUserId?, toUserId? }`
  - reason ∈ { `expenseCreated`, `paymentRecorded` }

## Examples

Create expense

```
POST /expenses
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "description": "Groceries",
  "totalAmount": 120,
  "paidById": 1,
  "participants": [1,2,3]
}
```

Get balance

```
GET /expenses/balance
Authorization: Bearer <JWT>
```
