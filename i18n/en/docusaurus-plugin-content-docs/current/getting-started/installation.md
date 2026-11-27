---
sidebar_position: 3
slug: /getting-started/installation
---
# Installation from Source

This page explains how to run ERD Builder Pro from source code with PostgreSQL, for example for development or to try Self-host on your own machine. For production servers, use [Docker](./deployment.md). For personal use without a server, use the [Desktop app](./desktop-app.md) or the [CLI](./cli.md).

## 1. Clone the Repository
```bash
git clone https://github.com/hadziqmtqn/erd-builder-pro.git
cd erd-builder-pro
```

## 2. Install Dependencies
```bash
npm install
```
Use Node.js 22. After installation, npm automatically generates the Prisma Client for PostgreSQL.

## 3. Prepare the PostgreSQL Database
Create an empty database:
```bash
createdb erd_builder_pro
```

## 4. Configure the Environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Set at least these two variables:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erd_builder_pro"
ERD_ENCRYPTION_KEY="output-of-openssl-rand-hex-32"
```

- `DATABASE_URL` must start with `postgresql://`. Other prefixes such as `postgres://` are not recognized as plain PostgreSQL.
- Leave all `SUPABASE_*` and `VITE_SUPABASE_*` variables empty. Setting any of them switches the server to Supabase mode (legacy).
- Generate `ERD_ENCRYPTION_KEY` with `openssl rand -hex 32` and save the value. This key encrypts the AI API keys stored in the database.

The full list of variables is in [Environment Variables](../configuration/env-variables.md).

## 5. Run the Application
```bash
npm run dev:pg:local
```

This command creates the tables in the database (`prisma db push`), prepares the Prisma Client, then starts the development server. The application is available at `http://localhost:3000`. You can change the port with `PORT` in `.env`.

Initial AI provider and model data is created automatically when the server starts, so you do not need to run a seed.

## 6. Create the Administrator Account
While the database is still empty, the application shows the **Create administrator account** page. The account created here becomes the instance **SuperAdmin**: it manages the license, Teams, users, AI configuration, and backups.

:::caution
Self-host has no default account. The `admin@local.dev` / `admin123` combination is used only internally by Desktop and CLI, and the Self-host login rejects it.
:::

## Running in Production
For production servers, use the official Docker image. If you still want to run from source:

```bash
npm run build
npm start
```

`npm start` runs the server with `NODE_ENV=production` and serves the build output from the `dist` folder. Make sure the database tables have been created, for example with `npm run db:push:pg:local`.

## Supabase Mode (Legacy)
Supabase mode is only for older deployments that already use it. New installations should use PostgreSQL. See [Database Setup](../configuration/database-setup.md#opsi-b-supabase-legacy).
