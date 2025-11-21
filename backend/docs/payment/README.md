# Payment Module

## Overview

Represents settlements between users within a household.

## Key Models

- Prisma: Payment, User, Household

## Endpoints

| Method | Path      | Body DTO         | Auth   | Notes            |
| ------ | --------- | ---------------- | ------ | ---------------- |
| POST   | /payments | CreatePaymentDto | Bearer | Create a payment |
| GET    | /payments | -                | Bearer | List payments    |

## Notes

- Links payer and payee to reconcile balances.
