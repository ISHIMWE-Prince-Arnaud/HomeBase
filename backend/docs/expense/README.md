# Expense Module

## Overview

Tracks expenses, participants, and shares for settlement.

## Key Models

- Prisma: Expense, ExpenseParticipant, User, Household

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
