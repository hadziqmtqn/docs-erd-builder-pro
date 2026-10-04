---
sidebar_position: 4
slug: /getting-started/deployment
---

# Deployment

ERD Builder Pro can run on several platforms, including serverless services and containers. Feature availability depends on the storage and process model each platform provides; Commercial Team licensing requires a persistent filesystem.

## Choose a Self-host Plan

Free Self-host Personal provides one Personal Workspace. Paid Self-host Commercial Team uses an instance license for Team Workspaces and member capacity. Cloud SaaS uses a separate environment; see [Environment Variables](../configuration/env-variables).

- **Free Personal:** configure the database and `ERD_ENCRYPTION_KEY`; Team license environment variables are not required.
- **Paid Commercial Team:** configure the license environment from [Environment Variables](../configuration/env-variables#self-host-commercial-team-license-paid), then enter the license key in **Application Settings**. Persist both license state files.

Both plans share the same Local PostgreSQL base configuration. Add these license endpoints to the Commercial Team `.env` only:

```env
ERDBPRO_LICENSE_API_URL=https://license.example.com
ERDBPRO_LICENSE_ISSUER=https://license.example.com
```

Replace the example URLs with the API and issuer provided by your license service. Do not store the license key in environment files. The value of `ERDBPRO_LICENSE_STATE_FILE` depends on the platform because it points to a file on the server filesystem. See [path examples by platform](../configuration/env-variables#path-values-by-deployment-type).

## Persistent License State (Paid Self-host)

Commercial Team deployments must keep license state on a persistent, writable local filesystem. `license-state.json` preserves the client token. The `installation-identity.json` file is normally stored beside it to preserve the installation ID and private key that signs local Team records.

`ERDBPRO_LICENSE_STATE_FILE` takes the full path to the `license-state.json` file, not a directory name or URL. Use an absolute path visible to the server process. If `ERDBPRO_INSTALLATION_IDENTITY_FILE` is not set, the runtime stores `installation-identity.json` beside the state file. Set the identity override only when needed, and make sure that file is also on persistent storage.

### Path Values by Deployment Type

| Deployment type | `ERDBPRO_LICENSE_STATE_FILE` | `ERDBPRO_INSTALLATION_IDENTITY_FILE` |
| --- | --- | --- |
| Docker or Docker Compose with the `erd-data:/app/data` volume | `/app/data/.erdbpro/license-state.json` | Optional: `/app/data/.erdbpro/installation-identity.json`; normally leave unset to use this default |
| Managed container such as Easypanel, Coolify, or Dokploy | `<persistent-mount-path>/.erdbpro/license-state.json`, for example `/data/.erdbpro/license-state.json` if the mount is available at `/data` | Optional: `<persistent-mount-path>/.erdbpro/installation-identity.json`; normally leave unset to use the sibling file |
| Linux VPS without Docker, such as a systemd service | `/var/lib/erd-builder-pro/.erdbpro/license-state.json` | Optional: `/var/lib/erd-builder-pro/.erdbpro/installation-identity.json`; normally leave unset to use the sibling file |
| Vercel Functions | No supported path for a licensed Commercial Team deployment at this time | No supported path |

For containers, use the path inside the container. For example, if the host mounts `/srv/erdbpro-data` at `/app/data`, set the variable to `/app/data/.erdbpro/license-state.json`, not the host path `/srv/erdbpro-data/...`. The runtime creates the parent directory, but the volume must already be mounted and writable by the application process user.

Vercel serves the API through Functions and recommends object storage for files written by Functions. ERDBPro currently reads and writes both license state files through the local filesystem; the application does not connect them to object storage. Therefore, the current Vercel integration has no supported persistent path for Commercial Team licensing. Do not replace `/app/data` with `/tmp`; the path variable only selects a file location and does not provide persistent storage. See Vercel's [guide to files in Vercel Functions](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions).

Daily capacity reports also run from a long-lived server process. The current Vercel entry point does not start that scheduler, so Vercel cannot ensure daily reports are sent. Use a container with a persistent volume or a VPS for Commercial Team deployments.

For an existing installation, before changing configuration or recreating the container/server:

1. Find the effective paths of both files on the running server. By default, they are under `.erdbpro/` inside the server working directory.
2. Copy and securely retain **both existing files**.
3. Attach persistent storage to the replacement deployment and restore the same files unchanged. Set `ERDBPRO_LICENSE_STATE_FILE` to the new file path; the installation identity uses the sibling file unless its override is set.
4. After startup, verify the license status and Team list before removing the backup copies.

On Easypanel or another managed container platform, create the persistent mount first and use the path visible inside the container. Do not change the path and restart before copying the current state; a newly generated identity can invalidate signatures on existing Teams. Keep both files as local secrets and never upload them to source control or SaaS.

:::caution If startup cannot write license state
Check that `ERDBPRO_LICENSE_STATE_FILE` points to persistent storage available and writable by the application process user. For Docker, confirm that `/app/data` is an actual mount. When running `npm run start` on a VPS outside a container, do not reuse the Docker path `/app/data`; omit the override to use the working-directory default or set a VPS path from the table above.

Also check that the startup log reports the version of the image you intended to test. Before retrying a paid deployment, make sure the previous `license-state.json` and `installation-identity.json` are safely backed up.
:::

Free Personal does not use this Team license state. Database, backups, and other files still follow the deployment’s own persistence policy.

### 1. Local Deployment (via Docker)

This is the fastest way to run ERD Builder Pro on your own server (self-hosted). We provide official images on Docker Hub.

:::warning Important
Prepare `.env` with database and encryption-key settings. Cloudflare R2 is recommended for file/image uploads:
- `DATABASE_URL` — PostgreSQL connection string (required, both Supabase and Local PG)
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — only required when using **Supabase** mode
- `ERD_ENCRYPTION_KEY` — required for securely storing DB Connect passwords and AI API keys in web/Docker deployments
- `ERDBPRO_LICENSE_API_URL` + `ERDBPRO_LICENSE_ISSUER` — required only for licensed Self-host Commercial Team deployments
- R2 vars — recommended for full file/image upload functionality

If R2 is not configured, the file/image upload feature will error. For **Local PostgreSQL** mode, ensure the PostgreSQL database is reachable from the container.
:::

### Steps (Pull from Docker Hub):
1. **Pull Image:**
   ```bash
   docker pull bekenweb/erd-builder-pro:latest
   ```
2. **Run Container:**
   ```bash
docker run -d \
  -p 3000:3000 \
  --name erd-builder-pro \
  --env-file .env \
  -v erd-data:/app/data \
  bekenweb/erd-builder-pro:latest
```

For a licensed Docker deployment, add the file path inside the mount to `.env`:

```env
ERDBPRO_LICENSE_STATE_FILE=/app/data/.erdbpro/license-state.json
```

The official Docker Compose file sets the same default path. Leave `ERDBPRO_INSTALLATION_IDENTITY_FILE` unset unless you move the identity file to another persistent path.

The following Local PostgreSQL base configuration is shared by both Self-host plans:
```env
DATABASE_URL="postgresql://user:password@db:5432/erd_builder_pro"
ERD_ENCRYPTION_KEY="replace-with-a-random-key-at-least-32-characters-long"
```

Do not use or share `admin@local.dev` / `admin123`. After an empty Local PostgreSQL database starts, the application shows a one-time setup page to create a new super admin.

:::info
The Vite environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) are baked into the Docker Hub image. Make sure you use the appropriate image tag for your needs.

The `.env` file content refers to [`.env.example`](https://github.com/hadziqmtqn/erd-builder-pro/blob/development/.env.example) in the main repository.

Available images: `latest`, specific versions (e.g., `v1.2.3`), and commit SHA.
:::

### Steps (Manual Build)
If you want to build your own image with custom configuration:
1. **Build Image:**
   ```bash
   docker build --build-arg VITE_SUPABASE_URL=your_url --build-arg VITE_SUPABASE_ANON_KEY=your_key -t erd-builder-pro .
   ```
2. **Run Container:**
   ```bash
   docker run -d \
     -p 3000:3000 \
     --name erd-builder-pro \
     --env-file .env \
     -v erd-data:/app/data \
     erd-builder-pro
   ```
3. Access the application at `http://localhost:3000`.

## 2. Vercel (Frontend & Serverless)

Use these steps only for deployment modes compatible with Vercel that do not use Team license state files:
1. Connect your GitHub repository to Vercel.
2. Use the *Framework Preset*: **Vite**.
3. Set the *Output Directory*: `dist`.
4. Enter the environment variables required by that mode in the Vercel dashboard.

Licensed Self-host Commercial Team is not supported on Vercel. See [persistent state and license paths](#persistent-license-state-paid-self-host). Use Docker with a persistent volume or a Linux VPS for licensed deployments.

## 3. CLI Installer (One-Command Setup)

The easiest way to run ERD Builder Pro locally — no clone, no Docker, no database setup.

```bash
npx erdbpro
```

Just Node.js 18+. Browser opens at `http://localhost:3101`.

### Global Install

```bash
npm install -g erdbpro
erdbpro
```

**Login:** The CLI uses local SQLite and auto-logs into the dashboard; there is no login page or default credential to share.

Data is stored in `~/.erdbpro/` (SQLite). Zero config, always ready. A local encryption key is created beside the database when neither `ERD_ENCRYPTION_KEY` nor `ERD_ENCRYPTION_KEY_FILE` is configured.

### CLI Commands

```bash
erdbpro                          # Start server + interactive menu
erdbpro start                    # Same as above
erdbpro start --background       # Run in background (detached)
erdbpro start --open             # Skip menu, open browser immediately
erdbpro start --port 4000        # Custom port
erdbpro start --force            # Restart if already running
erdbpro stop                     # Stop background server
erdbpro status                   # Check server status
```

### Database

**SQLite only.** Database auto-created at `~/.erdbpro/data.db`. No configuration needed.

Need PostgreSQL? Use the Docker image instead:
```bash
docker run -p 3101:3101 -e DATABASE_URL=postgresql://... bekenweb/erd-builder-pro
```

The CLI distribution keeps things simple — SQLite is fast, portable, and requires zero setup. Docker and desktop (Tauri) builds support PostgreSQL for production use.

### Interactive Menu

After running `erdbpro`, a navigable menu appears:

```
▶ Web UI (Open in Browser)
  Hide to Background
  Exit
```

- **↑↓** — move selector
- **Enter** — execute action
- **q** — quit

### Background Mode

```bash
erdbpro start --background
erdbpro status              # → ✅ Server running (PID: 12345)
erdbpro stop                # → 🛑 Server stopped
```

PID file at `~/.erdbpro/server.pid`.

### Update

```bash
npm update -g erdbpro
erdbpro start --force       # Stop old + start new
```

### Uninstall

```bash
npm uninstall -g erdbpro
rm -rf ~/.erdbpro
```

---

## 4. Coolify / Other PaaS

If you are using **Coolify**, you can use the **Dockerfile** method.
- Ensure the exposed port is `3000`.
- Enter all environment variables in the *Variables* section of the Coolify dashboard.

---
*Tips: Always ensure `NODE_ENV=production` when deploying for optimal performance.*
