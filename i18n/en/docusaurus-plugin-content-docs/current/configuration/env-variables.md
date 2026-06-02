---
sidebar_position: 1
slug: /configuration/env-variables
---
# Environment Variables

This application uses environment variables to manage security, API, and optional feature configurations. These variables must be placed in a `.env` file in the project root during local development or set as *Secrets* on the deployment platform (Vercel/VPS).

## Core (Required)
These variables are mandatory for the application to run and connect to the database.
- `SUPABASE_URL`: Your Supabase project API URL.
- `SUPABASE_SERVICE_ROLE_KEY`: The service role key for server-side operations. **Never expose this key to the frontend.**
- `PORT`: Port for the backend server (default: 3000).

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
Optional feature to send user feedback directly to a GitHub repository.

### GitHub
- `GITHUB_TOKEN`: GitHub Personal Access Token.
- `GITHUB_REPO_OWNER`: Username or organization owning the repository.
- `GITHUB_REPO_NAME`: Target repository name.

## Platform Requirements Matrix

| Variable Name | Local / Dev | Vercel / VPS | Usage |
| :--- | :---: | :---: | :--- |
| `SUPABASE_URL` | ✅ | ✅ | DB Connection |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | ✅ | Admin Auth |
| `R2_ACCOUNT_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_ACCESS_KEY_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_SECRET_ACCESS_KEY` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_BUCKET_NAME` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_PUBLIC_URL` | ⭐️ | ⭐️ | Cloudflare R2 |
| `VITE_SUPABASE_URL` | 💡 | 💡 | AI & Realtime |
| `VITE_SUPABASE_ANON_KEY` | 💡 | 💡 | AI & Realtime |
| `VITE_ENABLE_GUEST_MODE` | 💡 | 💡 | Guest Mode |
| `VITE_API_URL` | ❌ | 💡 | Custom Backend URL |

*Note: ✅ Required | ⭐️ Recommended | 💡 Optional | ❌ Not Required*

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
*For more information on how to obtain Supabase credentials, see [Setup Supabase](./supabase-setup).*