# Prisma Module

## Overview

Database access via Prisma Client and NestJS PrismaService.

## Datasource

- PostgreSQL (see prisma/schema.prisma)
- Env: DATABASE_URL

## Commands

- npx prisma generate
- npx prisma studio (optional)
- npx prisma migrate dev (if using migrations)

### Migration tips

- During development, prefer `prisma migrate dev` to evolve the schema and generate types.
- For resetting local DB state (destructive): `prisma migrate reset` (will drop & recreate). Use with caution.
- Keep `schema.prisma` in sync with actual relations used in services.

## Models

- User, Household, Chore, Expense, ExpenseParticipant, HouseholdNeed, Payment, Notification

## Model Overview

| Model              | Key Fields                                                                 | Relations                                                                                                                                                                                                                                                                |
| ------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| User               | id, email (unique), password, name, householdId?, profileImage, timestamps | household → Household?, assignedChores → Chore[], paidExpenses → Expense[], expenseShares → ExpenseParticipant[], addedNeeds → HouseholdNeed[], purchasedNeeds → HouseholdNeed[], paymentsMade → Payment[], paymentsReceived → Payment[], notifications → Notification[] |
| Household          | id, name, inviteCode (unique), timestamps                                  | users → User[], chores → Chore[], expenses → Expense[], needs → HouseholdNeed[], payments → Payment[], notifications → Notification[]                                                                                                                                    |
| Chore              | id, title, description?, dueDate?, isComplete, timestamps, householdId     | household → Household, assignedToId? → User                                                                                                                                                                                                                              |
| Expense            | id, description, totalAmount, date?, timestamps, paidById, householdId     | paidBy → User, household → Household, participants → ExpenseParticipant[]                                                                                                                                                                                                |
| ExpenseParticipant | id, expenseId, userId, shareAmount, timestamps                             | expense → Expense, user → User                                                                                                                                                                                                                                           |
| HouseholdNeed      | id, name, quantity?, category?, isPurchased, timestamps, householdId       | household → Household, addedById → User, purchasedById? → User                                                                                                                                                                                                           |
| Payment            | id, fromUserId, toUserId, amount, householdId, timestamps                  | fromUser → User, toUser → User, household → Household                                                                                                                                                                                                                    |
| Notification       | id, householdId, userId?, message, type?, isRead, timestamps               | household → Household, user? → User                                                                                                                                                                                                                                      |

## Relations summary

- User ⇄ Household: optional many-to-one via `householdId`.
- Chore → Household, optional Chore → User via `assignedToId`.
- Expense → User via `paidById`; Expense → Household; Expense ⇄ ExpenseParticipant.
- ExpenseParticipant → Expense, ExpenseParticipant → User.
- HouseholdNeed → Household; HouseholdNeed → User (`addedById`); optional HouseholdNeed → User (`purchasedById`).
- Payment → User (`fromUserId`), Payment → User (`toUserId`), Payment → Household.
- Notification → Household; optional Notification → User.

## Example: using Prisma Client in a service

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExampleService {
  constructor(private readonly prisma: PrismaService) {}

  async listHouseholdChores(householdId: number) {
    return this.prisma.chore.findMany({ where: { householdId } });
  }
}
```
