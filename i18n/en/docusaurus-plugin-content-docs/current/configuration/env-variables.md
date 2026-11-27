---
sidebar_position: 1
slug: /configuration/env-variables
---
# Environment Variables

The ERD Builder Pro server is configured through environment variables. During development, set them in the `.env` file in the project root. For deployment, set them in Docker, your container panel, or your system service. The full list with comments is in [`.env.example`](https://github.com/hadziqmtqn/erd-builder-pro/blob/master/.env.example).

## Database and Authentication Modes

The server selects the mode based on `DATABASE_URL` and the Supabase variables:

| Mode | When active | Authentication | Team Workspace |
| :--- | :--- | :--- | :--- |
| **Pure PostgreSQL** (primary) | `DATABASE_URL` starts with `postgresql://` and neither `SUPABASE_URL` nor `VITE_SUPABASE_URL` is set | Local accounts (email + password) | Yes, with a Self-host Commercial license |
| **Supabase** (legacy) | `SUPABASE_URL` or `VITE_SUPABASE_URL` is set, or a PostgreSQL URL with another prefix such as `postgres://` | Supabase Auth | No |
| **SQLite** (Desktop, CLI) | `DATABASE_URL` is empty, starts with `file:`, or ends with `.db` | Automatic single-user login | No |

The official Cloud uses pure PostgreSQL plus `AUTH_MODE=sso` and is managed by the ERD Builder Pro team. Guides for each mode are in [Database Setup](./database-setup.md).

:::caution
Use the `postgresql://` prefix in `DATABASE_URL`. The `postgres://` prefix is not recognized as pure PostgreSQL, so the server runs in Supabase mode.
:::

## Self-host Profiles: Free Personal and Commercial Team

This section distinguishes the **Self-host plans**. Cloud SaaS uses its own Cloud configuration.

| Profile | Use | License environment |
| --- | --- | --- |
| **Self-host Personal (free)** | One Personal Workspace per account; no Teams or Team members | Does not need the Team license client environment below |
| **Self-host Commercial Team (paid)** | Personal Workspace plus Team Workspaces and a member quota set by the instance license | The official license server is built in, with no extra variables; the license state and installation identity must be persistent |

Both profiles use `DATABASE_URL` and `ERD_ENCRYPTION_KEY` from the sections below. Teams are available only in pure PostgreSQL mode. To upgrade from Personal to Commercial Team, activate a license in **Settings → Application License**. Do not put the license key in `.env`.

## Self-host Commercial Team License (Paid) {/* #self-host-commercial-team-license-berbayar */}

The following variables apply only when the installation uses a Team capacity license. Since version 3.5.6, the runtime uses the official license server by default, so `ERDBPRO_LICENSE_API_URL` and `ERDBPRO_LICENSE_ISSUER` do not need to be set. Earlier versions still require both; update to 3.5.6 or later.

- `ERDBPRO_LICENSE_API_URL`: **Optional**. Default: `https://license.erdbuilderpro.com`. Set it only to use a different license server, such as a staging environment. The value is an origin without an endpoint path, for example `https://license.example.com`; the app appends the activation and license-check paths. Production must use HTTPS.
- `ERDBPRO_LICENSE_ISSUER`: **Optional**. Default: the official issuers `https://erdbuilderpro.com` and `https://www.erdbuilderpro.com`. When set, only this value is accepted, so set it together with `ERDBPRO_LICENSE_API_URL` to the exact issuer from that license server's signed entitlement. Do not guess the value from the plan name.
- `ERDBPRO_LICENSE_STATE_FILE`: Optional full path to the license state file, for example `/app/data/.erdbpro/license-state.json` in Docker. Choose an absolute path on a persistent filesystem that the server process can write to. This variable only selects the path; it does not create or mount a volume. The file contains a client token and a signed entitlement, so treat it as a secret.
- `ERDBPRO_INSTALLATION_IDENTITY_FILE`: Optional path override for the installation identity. When it is not set, `installation-identity.json` is created next to the license state file. This file contains a local private key and must be kept together with the state file.
- `ERDBPRO_LEGACY_TEAM_ID`: Optional. The UUID of an active Team that the administrator chooses to hold older Projects from an installation that predates the Team feature. Older Projects are not moved into a Team without this explicit mapping.

The official public verification key is bundled with the server. Do not set a custom public key or key ID in production. For Free Personal, do not set the Team license client variables just to run a Personal Workspace.

The server needs outbound HTTPS access to the license server. If the license server is unreachable, Teams keep working for up to 72 hours after the last successful check.

The correct path value differs for Docker, managed containers, VPS, and Vercel. See the [path table by deployment type](../getting-started/deployment.md#nilai-path-per-jenis-deployment) and the [Docker/Easypanel notes](../getting-started/deployment.md#catatan-docker-dan-easypanel). When moving an existing installation, copy the existing state, identity, and installation marker files to persistent storage before changing the path or recreating the server. Do not create a new identity to replace the old installation identity.

## Core (Required)
- `DATABASE_URL`: Database connection string.
  - **Pure PostgreSQL**: `postgresql://user:password@localhost:5432/database_name`.
  - **Supabase (legacy)**: the Supabase pooler string.
- `PORT`: Server port (default `3000`).
- `APP_TIMEZONE`: Time zone for time formatting and logs on the server, for example `Asia/Jakarta`. Default `UTC`. Timestamps in the database are still stored as absolute time (UTC).

## Secret Encryption (Required for Web/Self-host)
AI API keys are stored encrypted in the database. On Desktop and CLI, the same key also encrypts DB Client connection credentials.

- `ERD_ENCRYPTION_KEY`: Secret key for web, Docker, and server deployments. Use a random value of at least 32 characters (for example, the output of `openssl rand -hex 32`) and use the same value on every instance that reads the same database.
- `ERD_ENCRYPTION_KEY_FILE`: Key file path for Desktop/CLI when `ERD_ENCRYPTION_KEY` is not set. Desktop/CLI creates a local key file next to the database when neither is set.

:::caution
Do not commit or share `ERD_ENCRYPTION_KEY`, the key file, or `.env`. If the key is lost or changed, stored AI API keys (and DB Client credentials on Desktop/CLI) cannot be decrypted.
:::

## Cloud Authentication Mode (`AUTH_MODE`)

- `AUTH_MODE`: Only for the official Cloud deployment, with the value `sso`. This value turns off local password login and hands login over to ERDBPro SaaS.

:::warning
Do not set `AUTH_MODE` on Self-host. Without the Cloud SSO configuration, users cannot log in. Desktop and CLI always ignore this variable.
:::

## Supabase (Legacy)
The following variables are **only for older Supabase deployments**. Leave them empty on pure PostgreSQL, because setting them switches the server to Supabase mode.

- `SUPABASE_URL`: Supabase project API URL.
- `SUPABASE_ANON_KEY`: The anon/public key the server uses to validate Supabase sessions.
- `SUPABASE_SERVICE_ROLE_KEY`: The *service_role* key for server-side operations. Never share it.
- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`: Fallback values that the **server** reads when `SUPABASE_URL` or `SUPABASE_ANON_KEY` is empty. The browser does not read these variables.

## Web MCP (Optional — Web App)

Public MCP runs only on the Web App over HTTPS. Desktop and CLI keep using local MCP over `stdio`.

- `MCP_PUBLIC_URL`: Canonical HTTPS URL of the MCP Streamable HTTP endpoint, including the path, for example `https://app.example.com/api/mcp` or `https://mcp.example.com/api/mcp`. Setting this variable enables public MCP.
- `MCP_AUTH_PROVIDER`: MCP OAuth provider: `local` for pure PostgreSQL or `supabase` for Supabase Auth. When it is empty, the server selects `supabase` when `SUPABASE_URL` is set and `local` otherwise; you should set it explicitly in deployments.
- `MCP_CONSENT_URL`: OAuth consent page URL for the `local` provider. The default is the origin of `MCP_PUBLIC_URL` with the path `/oauth/consent`.
- `MCP_AUTH_ISSUER_URL`: OAuth issuer override, only for the `supabase` provider. Leave it empty to use `${SUPABASE_URL}/auth/v1`; set it only when Supabase Auth uses a custom domain.

For `MCP_AUTH_PROVIDER=local`, `DATABASE_URL` must point to pure PostgreSQL and `SUPABASE_URL` must not be set. See [Web MCP configuration](./mcp.md#mcp-web-public-api).

## AI and Guest Mode (Optional)
The AI provider, model, and API key are set in **Settings → AI Configuration** and stored encrypted in the database. `AI_API_KEY`, `AI_BASE_URL`, and `AI_MODEL` are not read from `.env`. See [AI Configuration](./ai-setup.md).

- `AI_ALLOW_PRIVATE_BASE_URL`: Set to `true` only when you intentionally allow AI endpoints on a private network, for example Ollama on the same server. Keep it `false` for SSRF protection.
- `VITE_ENABLE_GUEST_MODE`: Set to `true` to allow logging in as a Guest (default `false`). The server reads this value at runtime.
- `GUEST_AI_ENABLED`: Default `false`. Guests currently cannot use AI even when this is `true`, so leave it disabled.

## Storage - Cloudflare R2 (Recommended)
Required for uploading images to Notes and Drawings. Images are stored in a private bucket and displayed through signed URLs. See [R2 Configuration](../cloud-storage/r2-config.md).

- `R2_ACCOUNT_ID`: Cloudflare account ID, or the endpoint `https://<account-id>.r2.cloudflarestorage.com`.
- `R2_ACCESS_KEY_ID`: Access Key from the R2 API Token.
- `R2_SECRET_ACCESS_KEY`: Secret Key from the R2 API Token.
- `R2_BUCKET_NAME`: Bucket name.
- `R2_PUBLIC_URL`: **Leave empty.** When it is set, every Notes and Drawings image upload is rejected with the message *Private document assets require storage without a public URL.*

## Data Retention (Optional) {/* #retensi-data-opsional */}

| Variable | Default | Purpose |
| :--- | :--- | :--- |
| `TRASH_RETENTION_DAYS` | Self-host: disabled. Cloud: `30` | Permanently deletes Trash items older than N days. On Self-host, the interface shows no warning, so tell your users if you enable it. |
| `REVISION_RETENTION_DAYS` | Self-host: disabled. Cloud: `30` | Deletes Version History older than N days. |
| `NOTIFICATION_READ_RETENTION_DAYS` | `90` | Deletes read notifications after N days. |
| `NOTIFICATION_RETENTION_DAYS` | `180` | Deletes all notifications after N days. |

Trash and Version History retention runs only in PostgreSQL mode.

## Image Limits per Document (Optional)

- `DOCUMENT_IMAGE_LIMIT`: Maximum number of images per document (default `15`).
- `DOCUMENT_IMAGE_BYTES`: Total image size per document in bytes (default `2097152`, which is 2 MB).

## Feedback (Optional)

The **Feedback** menu in the app sends messages to the ERD Builder Pro team through the default endpoint `https://api.erdbuilderpro.com/api/feedback`.

- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`: When set, the `/api/feedback` endpoint on this server forwards each feedback message to that Telegram chat. If either one is empty, the endpoint responds with `503`. Keep them on the server only; do not put them in `VITE_*` variables.
- `VITE_FEEDBACK_API_URL`: Build-time variable that replaces the feedback endpoint used by the frontend.

## GitHub (Legacy Supabase)

- `GITHUB_TOKEN`, `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`: Used only by the older Supabase mode to trigger the GitHub Actions backup workflow (a `repository_dispatch` named `database-backup`). Other modes do not use them.

## Network and Logging (Optional)

- `CORS_ORIGINS`: Comma-separated list of HTTPS origins, without trailing slashes, for example `https://app.example.com,https://www.example.com`. Needed only when the frontend is opened from an origin different from the API, such as an MCP subdomain. Requests from the same host do not need it.
- `VITE_API_URL`: Build-time variable for a custom backend URL. Default: relative URL.
- `LOG_LEVEL`, `LOG_SERVICE`, `LOG_ENVIRONMENT`, `LOG_REGION`: Configure structured logs. Production containers write JSON logs to stdout/stderr.

## Requirements Matrix

| Variable | Self-host (PostgreSQL) | Desktop / CLI | Purpose |
| :--- | :---: | :---: | :--- |
| `DATABASE_URL` | ✅ | ❌ (automatic) | Database connection |
| `ERD_ENCRYPTION_KEY` | ✅ | 💡 | AI API key encryption |
| `ERD_ENCRYPTION_KEY_FILE` | ❌ | 💡 | Desktop/CLI key file |
| `APP_TIMEZONE` | 💡 | 💡 | Server time zone |
| `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET_NAME` | ⭐️ | 💡 (or Settings → Storage) | Image uploads |
| `ERDBPRO_LICENSE_STATE_FILE` | ⭐️ (Commercial Team) | ❌ | Persistent license state |
| `MCP_PUBLIC_URL`, `MCP_AUTH_PROVIDER` | 💡 | ❌ | Public Web MCP |
| `AI_ALLOW_PRIVATE_BASE_URL` | 💡 | 💡 | Private AI endpoints |
| `TRASH_RETENTION_DAYS`, `REVISION_RETENTION_DAYS` | 💡 | ❌ | Data retention |
| `CORS_ORIGINS` | 💡 | ❌ | Other frontend origins |
| `AUTH_MODE` | ❌ | ❌ | Official Cloud only |

*Legend: ✅ Required | ⭐️ Recommended | 💡 Optional | ❌ Not used*

## Setup Guide

### 1. Local (`.env`)
Copy `.env.example` to `.env` in the project root, then fill in the values:
```bash
cp .env.example .env
```

### 2. Deployment (Docker, VPS, or Panel)
- Enter the variables in the panel dashboard or the service configuration.
- For Docker, pass the variables with `--env-file .env` or the `-e` flag on `docker run`; the license path must point to a persistent volume in the container.
- For a VPS without containers, use an absolute path that the service user can write to.
- Vercel does not support the persistent license state file that Self-host Commercial Team requires. See the [deployment guide](../getting-started/deployment.md).

---
*Guides for each database mode are in [Database Setup](./database-setup.md).*
