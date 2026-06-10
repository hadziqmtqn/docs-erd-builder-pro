---
sidebar_position: 2
slug: /configuration/supabase-setup
---
# Database Setup

ERD Builder Pro supports **two PostgreSQL database modes**. Choose the one that fits your needs.

| Aspect | Supabase PostgreSQL | Local PostgreSQL |
|:---|:---|:---|
| **Best for** | Production / Cloud | Development / Self-hosted |
| **Authentication** | Supabase Auth (JWT) | Local (email + password) |
| **ID Type** | `BigInt` | `Int` |
| **Additional env vars** | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | — |
| **Schema setup** | SQL Editor in Supabase Dashboard | `npm run db:push:pg:local` |
| **Seed data** | — (via SQL Editor) | `npm run db:seed:pg:local` |
| **Run command** | `npm run dev` | `npm run dev:pg:local` |

---

## Option A: Supabase PostgreSQL (Production)

### 1. Create a New Project
1. Log in to [Supabase Dashboard](https://database.new).
2. Create a new project, select the nearest **Region**, and securely save your **Database Password**.

### 2. Initialize Database (Schema)
You need to create the required tables manually using the SQL Editor:
1. Open the `supabase_schema.sql` file located in the root directory of the ERD Builder Pro application.
2. Copy the entire contents of the file.
3. In the Supabase dashboard, open the **SQL Editor** menu.
4. Click **New Query**, paste the copied code, then click **Run**.
5. Ensure all tables (such as `projects`, `files`, etc.) have been created successfully.

### 3. Configure Authentication (Private)
To keep your application private and prevent others from using it:
1. Open the **Authentication > Settings** menu.
2. In the **Sign Up** section, disable (uncheck) the **Allow new users to sign up** option.
3. Save the changes. *Now strangers cannot sign up on their own.*

### 4. Register Your Account
After disabling public registration, you must create your own account manually:
1. Open the **Authentication > Users** menu.
2. Click the **Add User** button and select **Create new user**.
3. Enter the **Email** and **Password** you want to use.
4. (Optional) Disable the "Auto-confirm user" option if you want to verify the email, or leave it enabled for instant login.
5. Click **Create User**. Use this account to log in to your ERD Builder Pro application.

### 5. Retrieve API Keys
Open the **Settings > API** menu to get the required variables for the `.env` file:
- **Project URL**: Insert into `SUPABASE_URL` and `VITE_SUPABASE_URL`.
- **anon public**: Insert into `VITE_SUPABASE_ANON_KEY`.
- **service_role**: Insert into `SUPABASE_SERVICE_ROLE_KEY`.

> [!CAUTION]
> Never share your `service_role` key with anyone or include it in frontend code (without the `VITE_` prefix).

### 6. Configure `.env`
```env
DATABASE_URL="postgresql://user:pass@host:6543/db?pgbouncer=true&connection_limit=10"
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 7. Run the Application
```bash
npm run dev
```

---

## Option B: Local PostgreSQL (Development / Self-hosted)

### 1. Install & Set Up PostgreSQL
Make sure PostgreSQL is installed on your machine. Create a new database:
```bash
createdb erd_builder_pro
```

### 2. Configure `.env`
In your `.env` file, set `DATABASE_URL` and **delete or comment out** the `SUPABASE_URL` variable:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erd_builder_pro"
# SUPABASE_URL=   ← not needed for this mode
# SUPABASE_SERVICE_ROLE_KEY=   ← not needed
```
The application will automatically detect Local PostgreSQL mode when `SUPABASE_URL` is not set.

### 3. Push Schema
```bash
npm run db:push:pg:local
```
This command will create all required tables (19 tables) in your local database.

### 4. Seed Data
```bash
npm run db:seed:pg:local
```
Output:
```
Seeding database...
  ✓ Admin user: admin@local.dev
  ✓ AI Providers: OpenAI, Gemini, OpenAI Compatible
  ✓ Default system prompt: Simple & Direct

✅ Seed complete
```

**Default credentials**:
- Email: `admin@local.dev`
- Password: `admin123`

### 5. Run the Application
```bash
npm run dev:pg:local
```
The application will be available at `http://localhost:3000`.

> [!NOTE]
> Local PostgreSQL mode uses local authentication (email + password) with Prisma Session, not Supabase Auth. All local accounts are automatically admin.
