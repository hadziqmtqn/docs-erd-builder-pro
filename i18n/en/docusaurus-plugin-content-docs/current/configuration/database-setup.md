---
sidebar_position: 2
slug: /configuration/database-setup
---
# Database Setup

ERD Builder Pro supports **three database modes**. Choose the one that fits your needs.

| Aspect | Supabase PostgreSQL | Local PostgreSQL | Desktop (SQLite) |
|:---|:---|:---|:---|
| **Best for** | Production / Cloud | Development / Self-hosted | Desktop App / Tauri |
| **Authentication** | Supabase Auth (JWT) | Local (email + password) | Local (email + password) |
| **ID Type** | `BigInt` | `Int` | `Int` |
| **Extra env vars** | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ERD_ENCRYPTION_KEY` | `ERD_ENCRYPTION_KEY` | — |
| **Schema setup** | SQL Editor in Supabase Dashboard | `npm run db:push:pg:local` | `npm run db:push:sqlite` |
| **Seed data** | — (via SQL Editor) | `npm run db:seed:pg:local` | `npm run db:seed:sqlite` |
| **Generate client** | `npm run db:generate:pg` | `npm run db:generate:pg:local` | `npm run db:generate:sqlite` |
| **Run** | `npm run dev` | `npm run dev:pg:local` | `npm run dev:desktop` |

---

## Prisma 7 + Driver Adapter Architecture

All modes use **Prisma 7** with the *driver-adapter pattern*. Prisma 7 no longer supports `datasource.url` or the legacy query engine — every connection **must** be created with a matching adapter:

| Mode | Adapter | Package |
|:---|:---|:---|
| PostgreSQL | `PrismaPg` | `@prisma/adapter-pg` |
| SQLite | `PrismaBetterSqlite3` | `@prisma/adapter-better-sqlite3` |

Adapter selection happens automatically at runtime based on `DATABASE_URL`:

- If `DATABASE_URL` starts with `file:` or ends with `.db` → **SQLite** mode
- If `DATABASE_URL` starts with `postgresql://` **without** `SUPABASE_URL` → **Local PostgreSQL** mode
- If `DATABASE_URL` starts with `postgresql://` **with** `SUPABASE_URL` → **Supabase** mode

Three Prisma schema files are used depending on the mode:

| Prisma File | Mode | ID Type | Auth |
|:---|:---|:---|:---|
| `schema.prisma` | Supabase | `BigInt` | Supabase Auth |
| `schema.pg.prisma` | Local PostgreSQL | `Int` | Local |
| `schema.sqlite.prisma` | Desktop SQLite | `Int` | Local |

---

## Option A: Supabase PostgreSQL (Production)

### 1. Create a New Project
1. Go to [Supabase Dashboard](https://database.new).
2. Create a new project, select the nearest **Region**, and save your **Database Password** securely.

### 2. Initialize Database (Schema)
Create the required tables manually using the SQL Editor:
1. Open the `supabase_schema.sql` file in the ERD Builder Pro root directory.
2. Copy the entire file content.
3. In the Supabase dashboard, open the **SQL Editor** menu.
4. Click **New Query**, paste the copied code, then click **Run**.
5. Verify that all tables (e.g. `projects`, `diagrams`, etc.) were created successfully.

### 3. Generate Prisma Client
```bash
npm run db:generate:pg
```
This generates the Prisma Client using the `schema.prisma` file (Supabase variant).

### 4. Configure Authentication (Private)
To keep your application private:
1. Go to **Authentication > Settings**.
2. Under **Sign Up**, uncheck **Allow new users to sign up**.
3. Save the changes. *Now strangers cannot register themselves.*

### 5. Register Your Account
After disabling public registration, create your account manually:
1. Go to **Authentication > Users**.
2. Click **Add User** and select **Create new user**.
3. Enter the **Email** and **Password** you want to use.
4. (Optional) Disable "Auto-confirm user" for email verification, or leave it enabled for instant login.
5. Click **Create User**. Use this account to log into your ERD Builder Pro app.

### 6. Get API Keys
Go to **Settings > API** to get the required `.env` variables:
- **Project URL**: Set as `SUPABASE_URL` and `VITE_SUPABASE_URL`.
- **anon public**: Set as `VITE_SUPABASE_ANON_KEY`.
- **service_role**: Set as `SUPABASE_SERVICE_ROLE_KEY`.

> [!CAUTION]
> Never share your `service_role` key with anyone or include it in frontend code (without the `VITE_` prefix).

### 7. Configure `.env`
```env
DATABASE_URL="postgresql://user:pass@host:6543/db?pgbouncer=true&connection_limit=10"
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 8. Run the Application
```bash
npm run dev
```

---

## Option B: Local PostgreSQL (Development / Self-hosted)

### 1. Install & Prepare PostgreSQL
Make sure PostgreSQL is installed. Create a new database:
```bash
createdb erd_builder_pro
```

### 2. Configure `.env`
In `.env`, set `DATABASE_URL` and **comment out or remove** `SUPABASE_URL`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erd_builder_pro"
# SUPABASE_URL=   ← not needed for this mode
# SUPABASE_SERVICE_ROLE_KEY=   ← not needed
```
The app will automatically detect Local PostgreSQL mode when `SUPABASE_URL` is not set.

### 3. Generate Prisma Client
```bash
npm run db:generate:pg:local
```
This uses the `schema.pg.prisma` schema (Local PostgreSQL variant). Do not use `npm run db:generate:pg`, because that command selects the Supabase schema.

### 4. Push Schema
```bash
npm run db:push:pg:local
```
This creates all required tables in your local database.

> Prisma 7 uses `db push` to sync the schema without migration files. Use `db:migrate:pg:local` if you need migration history.

### 5. Seed Data
```bash
npm run db:seed:pg:local
```
Output:
```
Seeding database...
  - Self-host admin user skipped; use the one-time setup screen
  ✓ AI Providers: OpenAI, Gemini, OpenAI Compatible
  ✓ OpenAI models: GPT-4o, GPT-4o Mini, GPT-4 Turbo
  ✓ Gemini models: Gemini 1.5 Pro, Gemini 1.5 Flash
  ✓ OpenAI Compatible models: DeepSeek V4 Flash
  ✓ Default system prompt: Simple & Direct

✅ Seed complete
```

Local PostgreSQL seeding does not create default credentials. After an empty database is initialized, open the application and use the **Create administrator account** page to create the first super admin.

> Do not use `admin@local.dev` / `admin123` in self-host mode. This is the Desktop/CLI bootstrap credential and is rejected by self-host login.

> The seed script uses the same Prisma 7 adapter pattern. Make sure `DATABASE_URL` points to the local database and `ERD_ENCRYPTION_KEY` is configured.

### 6. Run the Application
```bash
npm run dev:pg:local
```
The app will be available at `http://localhost:3000`.

> Local PostgreSQL mode uses local authentication (email + password) with Prisma Session, not Supabase Auth. The super admin is created through the initial setup screen.

---

## Option C: Desktop / Tauri (SQLite)

This mode uses SQLite as the local database for the Tauri-based desktop application.

### 1. Generate Prisma Client for SQLite
```bash
npm run db:generate:sqlite
```
Uses the `schema.sqlite.prisma` schema with the `@prisma/adapter-better-sqlite3` adapter.

### 2. Push Schema to SQLite
```bash
npm run db:push:sqlite
```
This creates the `data.db` file with 19 tables:
```
ai_chat_messages, ai_chat_sessions, ai_models, ai_providers, ai_system_prompts,
backups, columns, diagrams, drawings, entities, entity_changes, flowcharts,
notes, projects, relationships, sessions, user_ai_configs, user_ai_rules, users
```

### 3. Seed Data
```bash
npm run db:seed:sqlite
```
Output:
```
Seeding SQLite database...
  ✓ Admin user: admin@local.dev
  ✓ AI Providers: OpenAI, Gemini, OpenAI Compatible
  ✓ OpenAI models: GPT-4o, GPT-4o Mini, GPT-4 Turbo
  ✓ Gemini models: Gemini 1.5 Pro, Gemini 1.5 Flash
  ✓ OpenAI Compatible models: DeepSeek V4 Flash
  ✓ Default system prompt: Simple & Direct

✅ Seed complete
```

Desktop/SQLite seeding keeps the internal bootstrap account `admin@local.dev` for local-data compatibility. Desktop/CLI use auto-login; these bootstrap credentials are not for self-host deployments and must not be used in shared deployments.

### 4. Verify
```bash
sqlite3 data.db ".tables"
# 19 tables listed

sqlite3 data.db "SELECT email FROM users;"
# admin@local.dev
```

### 5. Run the Application
```bash
# API + Vite mode (without Tauri shell)
npm run dev:desktop

# Full Tauri mode (requires Rust toolchain)
npm run dev:tauri:servers   # API :3099 + Vite :3098
npm run dev:tauri           # opens Tauri window
```

> `dev:desktop` uses `DATABASE_URL=file:./data.db` to **override** the `.env` value, so both modes (Supabase PG in `.env` and SQLite in the script) can coexist.

### 6. Login Bootstrap
Desktop/CLI auto-login through the local server without a login page. A local encryption key is created beside the database when neither `ERD_ENCRYPTION_KEY` nor `ERD_ENCRYPTION_KEY_FILE` is configured.

---

## Quick Script Reference

| Command | Purpose | Schema | `DATABASE_URL` |
|:---|:---|:---|:---|
| `npm run db:generate:sqlite` | Generate Prisma Client | `schema.sqlite.prisma` | — |
| `npm run db:push:sqlite` | Create SQLite tables | `schema.sqlite.prisma` | `file:./data.db` |
| `npm run db:seed:sqlite` | Seed SQLite data | (via `seed.sqlite.ts`) | `file:./data.db` |
| `npm run db:generate:pg` | Generate Supabase Prisma Client | `schema.prisma` | — |
| `npm run db:generate:pg:local` | Generate Local PG Prisma Client | `schema.pg.prisma` | — |
| `npm run db:push:pg:local` | Create Local PG tables | `schema.pg.prisma` | (from `.env`) |
| `npm run db:seed:pg:local` | Seed Local PG | (via `seed.sqlite.ts`) | (from `.env`) |
| `npm run dev` | Run Supabase mode | `schema.prisma` | (from `.env`) |
| `npm run dev:pg:local` | Run Local PG mode | `schema.pg.prisma` | (from `.env`) |
| `npm run dev:desktop` | Run Desktop mode | `schema.sqlite.prisma` | `file:./data.db` |

---

## Cross-Mode Differences

| Aspect | Supabase | Local PostgreSQL / Desktop |
|:---|:---|:---|
| **ID type** | `BigInt` (via `toProjectId()`) | `Number` / `Int` |
| **Admin status** | Managed via Supabase Auth | Super admin is created through initial setup |
| **Auth** | Supabase Auth (JWT) | Prisma Session (local) |
| **`uid` columns** | `@default(uuid())` in Prisma | Must be set manually via `randomUUID()` (SQLite) |

---

## Common Pitfalls

### `PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions`
Prisma 7 requires the `adapter` option — `new PrismaClient()` without arguments will fail. Make sure the app uses the correct *driver adapter*.

### Schema mismatch on seed
The seed script can fail if `DATABASE_URL` points to the wrong database. Make sure:
- **SQLite**: `DATABASE_URL=file:./data.db`
- **Local PG**: `DATABASE_URL` in `.env` points to your local database

### Stale `prisma/data.db` file
The `prisma/data.db` file is sometimes created unintentionally. For desktop mode, always use `./data.db` (project root) and delete `prisma/data.db`.
