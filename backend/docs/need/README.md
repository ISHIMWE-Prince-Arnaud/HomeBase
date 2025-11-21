# Need Module

## Overview

Household needs (shopping list) with add, mark purchased, and categorize.

## Key Models

- Prisma: HouseholdNeed, User, Household

### HouseholdNeed fields (summary)

- id, name (string), quantity? (string), category? (string), isPurchased (boolean), purchasedAt? (Date), addedById (number), purchasedById? (number), householdId (number), createdAt, updatedAt

## Endpoints

| Method | Path                | Body DTO         | Auth   | Notes          |
| ------ | ------------------- | ---------------- | ------ | -------------- |
| POST   | /needs              | CreateNeedDto    | Bearer | Create a need  |
| GET    | /needs              | -                | Bearer | List needs     |
| PATCH  | /needs/:id          | UpdateNeedDto    | Bearer | Update a need  |
| PATCH  | /needs/:id/purchase | MarkPurchasedDto | Bearer | Mark purchased |
| DELETE | /needs/:id          | -                | Bearer | Delete a need  |

## Notes

- Tracks who added and who purchased the item.

## DTOs

CreateNeedDto

```
{
  "name": string,
  "quantity"?: string,
  "category"?: string
}
```

UpdateNeedDto

```
{
  "name"?: string,
  "quantity"?: string,
  "category"?: string
}
```

MarkPurchasedDto

```
{
  "createExpense"?: boolean,
  "amount"?: number,        // required if createExpense = true
  "description"?: string
}
```

Validation

- When `createExpense` is true, `amount > 0` is required.
- Expense participants default to all household members (split shares evenly) and include the payer.

## WebSocket Events

- `needs:itemAdded` → household:<id> → `{ need }`
- `needs:itemUpdated` → household:<id> → `{ need }`
- `needs:itemPurchased` → household:<id> → `{ need }`
- `needs:expenseCreated` → household:<id> → `{ expenseId, description }`

## Examples

Create need

```
POST /needs
Authorization: Bearer <JWT>
Content-Type: application/json

{ "name": "Milk", "quantity": "2L", "category": "Groceries" }
```

Update need

```
PATCH /needs/123
Authorization: Bearer <JWT>
Content-Type: application/json

{ "quantity": "3L" }
```

Mark purchased and create an expense

```
PATCH /needs/123/purchase
Authorization: Bearer <JWT>
Content-Type: application/json

{ "createExpense": true, "amount": 120, "description": "Milk & Bread" }
```
