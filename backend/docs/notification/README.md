# Notification Module

## Overview

Create and manage in-app notifications for users.

## Key Models

- Prisma: Notification, User, Household

## Endpoints

| Method | Path                    | Body DTO | Auth   | Notes              |
| ------ | ----------------------- | -------- | ------ | ------------------ |
| GET    | /notifications          | -        | Bearer | List notifications |
| PATCH  | /notifications/:id/read | -        | Bearer | Mark one as read   |
| PATCH  | /notifications/read-all | -        | Bearer | Mark all as read   |

## Notes

- `isRead` flag and type field supported.
