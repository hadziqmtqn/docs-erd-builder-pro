---
sidebar_position: 1
slug: /configuration/env-variables
---
# Environment Variables

This application uses environment variables to manage database, authentication, API, and optional feature configurations. These variables must be placed in a `.env` file in the project root during local development or set as *Secrets* on the deployment platform (Vercel/VPS).

ERD Builder Pro supports **two PostgreSQL database modes**:

- **Supabase (Production/Cloud)**: PostgreSQL via Supabase pooler, Supabase Auth (JWT) authentication, `BigInt` ID type.
- **Local PostgreSQL (Development/Self-hosted)**: PostgreSQL running directly on local/server, local authentication (email + password), `Int` ID type.

For complete setup guides, see [Database Setup](./supabase-setup).

## Core (Required)
These variables are mandatory for the application to function.
- `DATABASE_URL`: PostgreSQL connection string.
  - **Supabase**: Use the pooler string (port `6543`, with `pgbouncer=true&connection_limit=10`).
  - **Local PostgreSQL**: Use `postgresql://user:password@localhost:5432/database_name`.
- `PORT`: Backend server port (default: 3000).

## Authentication (Optional — Mode-Dependent)
The following variables are **only required for Supabase mode**. Not needed for Local PostgreSQL.

- `SUPABASE_URL`: Your Supabase project API URL.
- `SUPABASE_SERVICE_ROLE_KEY`: The service role key for server-side operations. **Never expose this key to the frontend.**

## AI & Realtime Sync (Optional)
Variables with the `VITE_` prefix are required for the AI Context, @mentions, and real-time synchronization features to work in the frontend.
- `VITE_SUPABASE_URL`: Same as `SUPABASE_URL`, required by the Supabase client in the browser.
- `VITE_SUPABASE_ANON_KEY`: Anonymous (anon/public) key for public Supabase access.
- `VITE_ENABLE_GUEST_MODE`: Set to `true` to allow basic features without login (default: `true`).

## Storage - Cloudflare R2 (Recommended)
It is recommended to store assets (images/files) permanently in Cloudflare R2.
- `R2_ACCOUNT_ID`: Your Cloudflare account ID.
- `R2_ACCESS_KEY_ID`: Access Key from the R2 API Token.
- `R2_SECRET_ACCESS_KEY`: Secret Key from the R2 API Token.
- `R2_BUCKET_NAME`: The bucket name used.
- `R2_PUBLIC_URL`: Public URL or custom domain (CDN) to access files.

## Feedback Integration (Optional)
Optional feature to send user feedback to the developer via a **Telegram bot**.

### GitHub
- `GITHUB_TOKEN`: GitHub Personal Access Token.
- `GITHUB_REPO_OWNER`: Username or organization owning the repository.
- `GITHUB_REPO_NAME`: Target repository name.

## Platform Requirements Matrix

| Variable Name | Local / Dev | Vercel / VPS | Usage |
| :--- | :---: | :---: | :--- |
| `DATABASE_URL` | ✅ | ✅ | DB Connection |
| `SUPABASE_URL` | 💡¹ | 💡¹ | Supabase Auth |
| `SUPABASE_SERVICE_ROLE_KEY` | 💡¹ | 💡¹ | Admin Auth |
| `R2_ACCOUNT_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_ACCESS_KEY_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_SECRET_ACCESS_KEY` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_BUCKET_NAME` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_PUBLIC_URL` | ⭐️ | ⭐️ | Cloudflare R2 |
| `VITE_SUPABASE_URL` | 💡² | 💡² | AI & Realtime |
| `VITE_SUPABASE_ANON_KEY` | 💡² | 💡² | AI & Realtime |
| `VITE_ENABLE_GUEST_MODE` | 💡 | 💡 | Guest Mode |
| `VITE_API_URL` | ❌ | 💡 | Custom Backend URL |

*Note: ✅ Required | ⭐️ Recommended | 💡 Optional | ❌ Not Required*
*¹ Supabase mode only | ² Only if Supabase is used as backend auth*

## Setup Guide

### 1. Local (`.env`)
Copy the `.env.example` file to `.env` in the project root:
```bash
cp .env.example .env
```
Fill in the variable values according to each service provider's dashboard.

### 2. Deployment (Vercel / VPS)
- Enter the variables in the dashboard under **Project Settings > Environment Variables**.
- Make sure the `VITE_` variables are checked for all environments (Production & Preview).
- If using Docker, pass the variables via an `.env` file or the `-e` flag when running `docker run`.

---
*For more information on database setup, see [Database Setup](./supabase-setup).*
