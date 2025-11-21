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
