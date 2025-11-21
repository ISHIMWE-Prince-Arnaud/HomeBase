# Auth Module

## Overview

Handles user registration, login, and profile. Uses JWT with passport-jwt and guards.

## Key Models

- Prisma: User

## Endpoints

| Method | Path           | Body DTO        | Auth   | Notes           |
| ------ | -------------- | --------------- | ------ | --------------- |
| POST   | /auth/register | RegisterUserDto | None   | Register user   |
| POST   | /auth/login    | LoginUserDto    | None   | Login user      |
| GET    | /auth/users/me | -               | Bearer | Current profile |

## DTOs

- Registration and login DTOs with validation

## Services & Guards

- Service: authentication and token issuance
- Guards/strategies: JWT strategy, auth guard

## Notes

- Configure JWT_SECRET and JWT_EXPIRES_IN in .env
