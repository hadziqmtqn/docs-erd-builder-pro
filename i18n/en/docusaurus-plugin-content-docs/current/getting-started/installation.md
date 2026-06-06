---
sidebar_position: 3
slug: /getting-started/installation
---
# Local Installation

Follow these steps to run ERD Builder Pro on your local machine.

## 1. Clone Repository
```bash
git clone https://github.com/hadziqmtqn/erd-builder-pro.git
cd erd-builder-pro
```

## 2. Install Dependencies
You need to install dependencies for both frontend and backend.
```bash
npm install
```

## 3. Configure Environment
Copy the `.env.example` file to `.env` and fill it with your credentials.
```bash
cp .env.example .env
```
*For details on filling environment variables, see [Environment Variables](../configuration/env-variables.md).*

> [!TIP]
> By default, the backend server runs on port `3000`. If you need to use a different port (especially in production), you can set it via the `PORT` variable in the `.env` file.

## 3a. Database Setup
Set up the database according to your chosen mode. ERD Builder Pro supports two PostgreSQL modes — see [Database Setup](../configuration/supabase-setup) for a full comparison.

### Option A: Supabase PostgreSQL
1. Open Supabase dashboard → **SQL Editor**.
2. Run the contents of `supabase_schema.sql` from the project root.
3. Configure `DATABASE_URL`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` in `.env`.

### Option B: Local PostgreSQL
```bash
# Create database
createdb erd_builder_pro

# Push schema & seed
npm run db:push:pg:local
npm run db:seed:pg:local
```

## 4. Run the Application
Run the following command to start the development server — choose according to your database mode:

**Supabase:**
```bash
npm run dev
```

**Local PostgreSQL:**
```bash
npm run dev:pg:local
```

The application will be available at `http://localhost:3000`.
