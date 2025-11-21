# Need Module

## Overview

Household needs (shopping list) with add, mark purchased, and categorize.

## Key Models

- Prisma: HouseholdNeed, User, Household

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
