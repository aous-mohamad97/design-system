<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Multi-tenant authentication and authorization service for the design-system platform.

Features:

- Tenant-aware email/password login
- JWT access and refresh tokens
- Refresh token persistence and revocation
- Role-based authorization with guards

## Project setup

```bash
pnpm install
```

## Environment

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=tenant_auth
TYPEORM_SYNC=true # set to false outside local dev

JWT_ACCESS_SECRET=change-me
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=change-me-refresh
JWT_REFRESH_EXPIRES_IN=7d

CORS_ORIGIN=http://localhost:5173

# Seed defaults (optional)
SEED_TENANT_KEY=default
SEED_TENANT_NAME=Default Tenant
SEED_ADMIN_EMAIL=admin@example.com
SEED_ADMIN_PASSWORD=ChangeMe123!
```

## Run the service

```bash
# development
pnpm run start:dev

# production
pnpm run build
pnpm run start:prod
```

Service runs on `http://localhost:3000` by default.

### Run Postgres via Docker Compose

From the monorepo root (`design-system`), start Postgres:

```bash
docker compose up -d postgres
```

This starts a `postgres` service with:

- host: `localhost`
- port: `5432`
- database: `tenant_auth`
- user: `postgres`
- password: `postgres`

With the default `.env` values above (`DB_HOST=localhost`, etc.), the NestJS service will connect to this database automatically when you run `pnpm run start:dev`.

### Seed data

To create a default tenant and admin user for local development:

```bash
pnpm run seed
```

## REST API

- `POST /auth/login` – `{ email, password, tenantKey }` → access + refresh tokens and user.
- `POST /auth/refresh` – `{ refreshToken }` → new access + refresh tokens.
- `POST /auth/logout` – `{ refreshToken }` → revoke refresh token.
- `GET /auth/me` – returns current user from access token.

These endpoints are consumed by the shared `@design-system/auth` frontend package.
