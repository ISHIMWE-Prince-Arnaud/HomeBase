# HomeBase Backend

A NestJS (v11) API for managing shared household life: authentication, households, chores, expenses, needs, notifications, payments, and realtime updates.

## Tech Stack

- NestJS 11 (TypeScript)
- Prisma ORM 6 (PostgreSQL)
- JWT auth (passport-jwt)
- Socket.IO for realtime events

## Project Structure

- src/app.module.ts – Root module
- src/auth – Auth module (JWT)
- src/household – Household module
- src/chore – Chores module
- src/expense – Expenses and shares
- src/need – Household needs (shopping list)
- src/payment – Payments/settlements
- src/notification – Notifications
- src/realtime – WebSocket gateway and events
- src/prisma – Prisma service/module

## Environment

- DATABASE_URL – PostgreSQL connection string
- JWT_SECRET – Secret for signing JWTs
- JWT_EXPIRES_IN – Token lifetime (e.g., 1d)
- PORT – HTTP port (default 3000)

## Scripts

- npm run start:dev – Run with hot reload
- npm run build – Compile TypeScript
- npm run start:prod – Run compiled app
- npm run test / test:watch / test:cov – Tests
- npm run lint / format – Linting and formatting

## Local Development

1. Install deps: npm install
2. Start DB via Docker: docker compose up -d db
3. Generate Prisma Client: npx prisma generate
4. Start API: npm run start:dev

API runs on http://localhost:3000 by default.

## Documentation

- Start here: ./docs/README.md
- Modules:
  - ./docs/auth/README.md
  - ./docs/household/README.md
  - ./docs/chore/README.md
  - ./docs/expense/README.md
  - ./docs/need/README.md
  - ./docs/payment/README.md
  - ./docs/notification/README.md
  - ./docs/realtime/README.md
  - ./docs/prisma/README.md
