# Backend Documentation

This folder contains module-focused documentation for the HomeBase backend. Each module README provides an overview, key models, common endpoints, and notes.

## Conventions

- NestJS modules, controllers, services, and DTOs
- Validation via class-validator and global ValidationPipe (whitelist, forbidNonWhitelisted, transform)
- Auth via JWT Bearer tokens
- Database via Prisma (PostgreSQL)

## Modules

- Auth: ./auth/README.md
- Household: ./household/README.md
- Chore: ./chore/README.md
- Expense: ./expense/README.md
- Need: ./need/README.md
- Payment: ./payment/README.md
- Notification: ./notification/README.md
- Realtime: ./realtime/README.md
- Prisma: ./prisma/README.md

For high-level overview, see ../README.md.
