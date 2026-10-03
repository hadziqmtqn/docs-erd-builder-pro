---
sidebar_position: 1
slug: /configuration/env-variables
---
# Environment Variables

This application uses environment variables to manage database, authentication, API, and optional feature configurations. These variables must be placed in a `.env` file in the project root during local development or set as *Secrets* on the deployment platform (Vercel/VPS).

ERD Builder Pro supports **two PostgreSQL database modes**:

- **Supabase (Production/Cloud)**: PostgreSQL via Supabase pooler, Supabase Auth (JWT) authentication, `BigInt` ID type.
- **Local PostgreSQL (Development/Self-hosted)**: PostgreSQL running directly on local/server, local authentication (email + password), `Int` ID type.

For complete setup guides, see [Database Setup](./database-setup).

## Self-host Profiles: Free Personal and Commercial Team

This section separates plans only for Local PostgreSQL Self-host Web. Supabase Auth/Cloud SaaS is a separate deployment mode and does not use this Self-host plan split.

| Profile | Use | License environment |
| --- | --- | --- |
| **Self-host Personal (free)** | One local Personal Workspace; no Teams or Team members | Does not need the Team license client variables below |
| **Self-host Commercial Team (paid)** | The application owner’s Personal Workspace plus Team Workspaces and licensed member capacity | Requires the license API and issuer; license state and installation identity must persist |

Both profiles still use shared server settings such as `DATABASE_URL` and `ERD_ENCRYPTION_KEY` below. Upgrade from Personal to Commercial Team by activating a license in **Application Settings**. Do not put a license key in `.env`.

## Self-host Commercial Team License (Paid)

These variables are needed only when the installation uses Team capacity licensing. Use the endpoints supplied for your license environment; production must use HTTPS.

- `ERDBPRO_LICENSE_API_URL`: **Required**. The license API origin, such as `https://license.example.com`, without an endpoint path. The app appends the activation and license-check routes.
- `ERDBPRO_LICENSE_ISSUER`: **Required**. The exact issuer value used by the control plane in signed entitlements. Do not infer it from a plan name.
- `ERDBPRO_LICENSE_STATE_FILE`: Optional path for the license state file. In a container, put it on a persistent mount, for example `/app/data/.erdbpro/license-state.json`. This file contains a client token and is secret.
- `ERDBPRO_INSTALLATION_IDENTITY_FILE`: Optional override for the installation identity path. When unset, `installation-identity.json` is placed beside the license state file. It contains the local private key and must be preserved with the state file.

The official verification key is bundled with the server. Do not set a custom public key or key ID in production. Free Personal does not need the Team license client variables to run its Personal Workspace.

When moving an existing container, copy **both existing state files** to the persistent mount before changing the path or recreating the container. Do not replace the existing installation identity with a newly generated one. See [deployment and state migration](../getting-started/deployment#persistent-license-state-paid-self-host).

## Core (Required)
These variables are mandatory for the application to function.
- `DATABASE_URL`: PostgreSQL connection string.
  - **Supabase**: Use the pooler string (port `6543`, with `pgbouncer=true&connection_limit=10`).
  - **Local PostgreSQL**: Use `postgresql://user:password@localhost:5432/database_name`.
- `PORT`: Backend server port (default: 3000).

## Secret Encryption (Required for Web/Self-host)
Database connection passwords and AI API keys are stored encrypted on the server.

- `ERD_ENCRYPTION_KEY`: Secret key required for web, Docker, and server deployments. Use a random value of at least 32 characters and keep the same value on every instance using the same database.
- `ERD_ENCRYPTION_KEY_FILE`: Key-file path for Desktop/CLI when `ERD_ENCRYPTION_KEY` is not set. Desktop/CLI creates a local key beside the database when neither value is configured.

> [!CAUTION]
> Never commit or share `ERD_ENCRYPTION_KEY`, the key file, or `.env`. If the key is lost or changed, stored DB Connect passwords and AI API keys cannot be decrypted.

## Authentication (Optional — Mode-Dependent)
The following variables are **only required for Supabase mode**. Not needed for Local PostgreSQL.

- `SUPABASE_URL`: Your Supabase project API URL.
- `SUPABASE_ANON_KEY`: The anon/public key used by the server to validate Supabase sessions.
- `SUPABASE_SERVICE_ROLE_KEY`: The service role key for server-side operations. **Never expose this key to the frontend.**

## Web MCP (Optional — Web App)

Public MCP runs only in the Web App over HTTPS. Desktop and CLI continue to use local MCP over `stdio`.

- `MCP_PUBLIC_URL`: Canonical HTTPS URL of the MCP Streamable HTTP endpoint, including its path, such as `https://app.example.com/api/mcp` or `https://mcp.example.com/api/mcp`. Setting this variable enables public MCP.
- `MCP_AUTH_PROVIDER`: MCP OAuth provider: `local` for Pure PostgreSQL or `supabase` for Supabase Auth. When unset, the server selects `supabase` when `SUPABASE_URL` is present and `local` otherwise; set it explicitly in deployments.
- `MCP_CONSENT_URL`: OAuth consent page URL for the `local` provider. It defaults to the origin of `MCP_PUBLIC_URL` with the `/oauth/consent` path.
- `MCP_AUTH_ISSUER_URL`: OAuth issuer override for the `supabase` provider only. Leave unset to use `${SUPABASE_URL}/auth/v1`; set it only when Supabase Auth uses a custom domain.

For `MCP_AUTH_PROVIDER=local`, `DATABASE_URL` must point to Pure PostgreSQL and `SUPABASE_URL` must not be set. For `MCP_AUTH_PROVIDER=supabase`, configure Supabase Auth and make the JWT `aud` claim exactly match `MCP_PUBLIC_URL`. See [Web MCP configuration](./mcp#web-mcp-public-api).

## AI, Guest Mode, and Realtime Sync (Optional)
AI provider, model, and API key configuration is managed through **Settings > AI Configuration** and stored encrypted in the database. The server does not read `AI_API_KEY`, `AI_BASE_URL`, or `AI_MODEL` from `.env`.

- `VITE_SUPABASE_URL`: Same as `SUPABASE_URL`, required by the Supabase client in the browser.
- `VITE_SUPABASE_ANON_KEY`: Anonymous (anon/public) key for public Supabase access.
- `VITE_ENABLE_GUEST_MODE`: Set to `true` to enable Guest mode (default: `false`).
- `GUEST_AI_ENABLED`: Set to `true` to let Guests use AI through the server API key (default: `false`). Guests may consume your API quota.
- `AI_ALLOW_PRIVATE_BASE_URL`: Set to `true` only when intentionally allowing private AI endpoints such as Ollama. Keep `false` for SSRF protection.

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
| `ERD_ENCRYPTION_KEY` | ✅¹ | ✅ | DB password and AI API key encryption |
| `ERD_ENCRYPTION_KEY_FILE` | 💡² | 💡² | Desktop/CLI key file |
| `SUPABASE_URL` | 💡¹ | 💡¹ | Supabase Auth |
| `SUPABASE_ANON_KEY` | 💡¹ | 💡¹ | Supabase session validation |
| `SUPABASE_SERVICE_ROLE_KEY` | 💡¹ | 💡¹ | Admin Auth |
| `MCP_PUBLIC_URL` | 💡 | 💡 | Public Web MCP + OAuth resource |
| `MCP_AUTH_PROVIDER` | 💡 | 💡 | MCP OAuth provider: `local` or `supabase` |
| `MCP_CONSENT_URL` | 💡 | 💡 | Local OAuth consent URL |
| `MCP_AUTH_ISSUER_URL` | 💡 | 💡 | Custom Supabase OAuth issuer |
| `R2_ACCOUNT_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_ACCESS_KEY_ID` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_SECRET_ACCESS_KEY` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_BUCKET_NAME` | ⭐️ | ⭐️ | Cloudflare R2 |
| `R2_PUBLIC_URL` | ⭐️ | ⭐️ | Cloudflare R2 |
| `VITE_SUPABASE_URL` | 💡² | 💡² | AI & Realtime |
| `VITE_SUPABASE_ANON_KEY` | 💡² | 💡² | AI & Realtime |
| `VITE_ENABLE_GUEST_MODE` | 💡 | 💡 | Guest Mode (disabled by default) |
| `GUEST_AI_ENABLED` | 💡 | 💡 | Guest AI (disabled by default) |
| `AI_ALLOW_PRIVATE_BASE_URL` | 💡 | 💡 | Private AI endpoints (disabled by default) |
| `VITE_API_URL` | ❌ | 💡 | Custom Backend URL |

*Note: ✅ Required | ⭐️ Recommended | 💡 Optional | ❌ Not Required*
*¹ Required for web/Docker/self-host; Desktop/CLI can generate a local key | ² Desktop/CLI key-file alternative*

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
*For more information on database setup, see [Database Setup](./database-setup).*
