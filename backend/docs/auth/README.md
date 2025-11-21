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

## Request/Response Examples

Register

```
POST /auth/register
Content-Type: application/json

{
  "email": "jane@example.com",
  "name": "Jane",
  "password": "Secret123!"
}
```

Login

```
POST /auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "Secret123!"
}
```

Successful response (both register/login)

```
{
  "accessToken": "<JWT>",
  "user": { "id": 1, "email": "jane@example.com", "name": "Jane" }
}
```

Profile

```
GET /auth/users/me
Authorization: Bearer <JWT>
```

## JWT Payload

```
{
  "sub": <userId>,
  "email": "jane@example.com",
  "iat": 1710000000,
  "exp": 1710604800
}
```

## Errors

- 409 Conflict – registering with an existing email
- 401 Unauthorized – bad credentials or invalid/expired token
- 400 Bad Request – validation errors
