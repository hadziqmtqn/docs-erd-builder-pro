---
sidebar_position: 2
slug: /configuration/database-setup
---
# Database Setup

ERD Builder Pro supports three database modes. For a new Self-host installation, use **pure PostgreSQL**.

| Aspect | Pure PostgreSQL | Supabase (legacy) | SQLite |
|:---|:---|:---|:---|
| **Used by** | Self-host and Cloud | Older deployments that already use Supabase | Desktop and CLI |
| **Authentication** | Local accounts (email + password); Cloud uses SSO | Supabase Auth | Automatic single-user login |
| **Team Workspace** | Yes (Self-host with a Commercial license) | No | No |
| **Notifications** | Yes | No | No |
| **Extra env variables** | `ERD_ENCRYPTION_KEY` | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ERD_ENCRYPTION_KEY` | None |
| **Create tables** | `npm run db:push:pg:local` | `sql/supabase/schema.sql` in the SQL Editor | Automatic |
| **Generate client** | `npm run db:generate:pg:local` | `npm run db:generate:supabase` | `npm run db:generate:sqlite` |
| **Run from source** | `npm run dev:pg:local` | `npm run dev` | `npm run dev:desktop` |

---

## Prisma 7 + Driver Adapter Architecture

All modes use **Prisma 7** with the *driver-adapter pattern*. Each connection is created with the matching adapter:

| Mode | Adapter | Package |
|:---|:---|:---|
| PostgreSQL | `PrismaPg` | `@prisma/adapter-pg` |
| SQLite | `PrismaBetterSqlite3` | `@prisma/adapter-better-sqlite3` |

The server selects the mode at *runtime*:

- `DATABASE_URL` is empty, starts with `file:`, or ends with `.db` → **SQLite**.
- `DATABASE_URL` starts with `postgresql://` without `SUPABASE_URL` or `VITE_SUPABASE_URL` → **Pure PostgreSQL**.
- Any other database URL, or `SUPABASE_URL`/`VITE_SUPABASE_URL` is set → **Supabase**.

There are three Prisma schema files:

| Prisma file | Mode | Table count |
|:---|:---|:---|
| `prisma/schema.pg.prisma` | Pure PostgreSQL | 44 |
| `prisma/schema.prisma` | Supabase | 30 application tables + Supabase `auth` tables |
| `prisma/schema.sqlite.prisma` | SQLite | 47 |

The `DB_VARIANT` variable (`pg`, `supabase`, or `sqlite`) only selects the schema file and migrations folder for Prisma CLI commands. The server still selects the mode from `DATABASE_URL`. The full table structure is in [Database Schema](../database-schema.mdx).

---

## Option A: Pure PostgreSQL (Recommended)

### 1. Prepare the Database
```bash
createdb erd_builder_pro
```

### 2. Configure `.env`
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erd_builder_pro"
ERD_ENCRYPTION_KEY="output-of-openssl-rand-hex-32"
```
Leave all `SUPABASE_*` and `VITE_SUPABASE_*` variables empty.

### 3. Create Tables and Run
```bash
npm run dev:pg:local
```
This command runs `db:push:pg:local` (creates or syncs the tables), `db:generate:pg:local`, and then the development server at `http://localhost:3000`.

The default AI providers and models are created automatically when the server starts. `npm run db:seed:pg:local` is still available, but it does not create any account.

Use `npm run db:migrate:pg:local` (`prisma migrate dev`) if you need migration history.

### 4. Create the Administrator Account
Open the app. On an empty database, the **Create administrator account** page appears so you can create the first SuperAdmin.

:::caution
Do not use `admin@local.dev` / `admin123` on Self-host. That combination is only an internal Desktop/CLI credential and is rejected by the Self-host login.
:::

In Docker, the image entrypoint creates the database and tables automatically. See [Deployment](../getting-started/deployment.md#yang-dilakukan-container-saat-start).

---

## Option B: Supabase (Legacy) {/* #opsi-b-supabase-legacy */}

This mode is only for deployments that already used Supabase. Supabase mode does not support Team Workspace or notifications. New installations should use pure PostgreSQL.

### Schema
- Base tables: run the contents of `sql/supabase/schema.sql` in the Supabase **SQL Editor**.
- Tables added later, such as comments and discussions, are in the `prisma/migrations` folder (Supabase variant).

### Prisma Client
```bash
npm run db:generate:supabase
```
`npm install` also runs this command automatically.

### Configure `.env`
```env
DATABASE_URL="postgresql://user:pass@host:6543/db?pgbouncer=true&connection_limit=10"
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ERD_ENCRYPTION_KEY="output-of-openssl-rand-hex-32"
```

If `pgbouncer=true` and `connection_limit` are missing from the URL, the server adds them.

### User Accounts
Supabase Auth manages accounts. To keep other people from using the app, turn off **Allow new users to sign up** in **Authentication → Settings**, then create accounts through **Authentication → Users → Add User**.

### Run
```bash
npm run dev
```

---

## Option C: SQLite (Desktop and CLI)

The Desktop app and CLI create and update the SQLite database automatically. You do not need to run any commands. The SQLite database has 47 tables: the PostgreSQL tables without the Web MCP OAuth tables, plus the DB Client tables (`db_accounts`, `db_catalogs`, `db_clients`, `db_client_layouts`, `db_client_queries`, `sql_queries`).

### Running Desktop Mode from Source
```bash
# Create ./data.db
npm run db:push:sqlite

# API on port 3100 + Vite on port 3098
npm run dev:tauri:servers

# Tauri window (requires the Rust toolchain)
npm run dev:tauri
```

- `npm run dev:desktop` runs only the API on port `3100` with `DATABASE_URL=file:./data.db`, ignoring the value in `.env`.
- `npm run dev:desktop:client` runs Vite on port `3098`.
- The built Desktop app uses port `3099`.

`npm run db:seed:sqlite` creates the internal `admin@local.dev` account for Desktop/CLI automatic login. This account is not a credential for Self-host.

---

## Quick Script Reference

| Command | Purpose | Schema |
|:---|:---|:---|
| `npm run db:generate:pg:local` | Generate the PostgreSQL Prisma Client | `schema.pg.prisma` |
| `npm run db:push:pg:local` | Create/sync PostgreSQL tables | `schema.pg.prisma` |
| `npm run db:migrate:pg:local` | Create a PostgreSQL migration | `schema.pg.prisma` |
| `npm run db:seed:pg:local` | Seed PostgreSQL data | `schema.pg.prisma` |
| `npm run db:generate:supabase` | Generate the Supabase Prisma Client | `schema.prisma` |
| `npm run db:generate:sqlite` | Generate the SQLite Prisma Client | `schema.sqlite.prisma` |
| `npm run db:push:sqlite` | Create `./data.db` | `schema.sqlite.prisma` |
| `npm run db:seed:sqlite` | Seed SQLite | `schema.sqlite.prisma` |
| `npm run dev:pg:local` | Push the schema + run pure PostgreSQL | `schema.pg.prisma` |
| `npm run dev` | Run the server without pushing the schema | from `DATABASE_URL` |
| `npm run dev:desktop` | Run the Desktop-mode API (port 3100) | `schema.sqlite.prisma` |

---

## Common Issues

### Team menu does not appear, or `Teams are available only on a self-hosted server.`
The server is not running in pure PostgreSQL mode. Make sure `DATABASE_URL` starts with `postgresql://` and that neither `SUPABASE_URL` nor `VITE_SUPABASE_URL` is set. Teams also require an active Self-host Commercial license.

### `PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions`
Prisma 7 requires the `adapter` option; `new PrismaClient()` without arguments fails. Make sure the app uses the matching *driver adapter*.

### Seed or push fails because of the wrong database
Make sure `DATABASE_URL` points to the correct database:
- **SQLite**: `DATABASE_URL=file:./data.db`
- **PostgreSQL**: `DATABASE_URL` in `.env` points to the local database

### Stale `prisma/data.db` file
The `prisma/data.db` file is sometimes created by accident. For Desktop mode from source, use `./data.db` in the project root and delete `prisma/data.db`.
