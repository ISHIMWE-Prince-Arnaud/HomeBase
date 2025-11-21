# Chore Module

## Overview

Create and manage household chores and assignments.

## Key Models

- Prisma: Chore, User (assignedTo), Household

## Endpoints

| Method | Path                 | Body DTO       | Auth   | Notes               |
| ------ | -------------------- | -------------- | ------ | ------------------- |
| GET    | /chores              | -              | Bearer | List chores         |
| POST   | /chores              | CreateChoreDto | Bearer | Create chore        |
| GET    | /chores/:id          | -              | Bearer | Get chore by id     |
| PATCH  | /chores/:id          | UpdateChoreDto | Bearer | Update chore        |
| PATCH  | /chores/:id/complete | -              | Bearer | Mark chore complete |
| DELETE | /chores/:id          | -              | Bearer | Delete chore        |

## Notes

- Chores can be assigned to a user; dueDate and completion supported.
