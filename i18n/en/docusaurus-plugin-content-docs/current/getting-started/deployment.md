---
sidebar_position: 4
slug: /getting-started/deployment
---

# Deployment

This page covers how to run ERD Builder Pro as **Self-host** on your server: Docker (recommended), Docker Compose, container panels such as Easypanel, Coolify, or Dokploy, and Vercel with limitations. For personal use without a server, see [Desktop App](./desktop-app.md) and [CLI](./cli.md).

## Choose a Self-host Plan

Free Self-host Personal provides only Personal Workspace. Self-host Commercial Team uses an instance license to add Team Workspace and member capacity. Cloud SaaS configuration uses a different environment; see [Environment Variables](../configuration/env-variables.md).

- **Free Personal:** set up a PostgreSQL database and `ERD_ENCRYPTION_KEY`; Team license environment variables are not needed.
- **Paid Commercial Team:** attach persistent storage as described below, then enter the license key through **Settings → Application License**. The official license server is built in, so license endpoint environment variables are not needed.

Team Workspace is available only when the server uses **plain PostgreSQL** (without Supabase). Both plans use the same base PostgreSQL configuration. Since version 3.5.6, Commercial Team needs neither `ERDBPRO_LICENSE_API_URL` nor `ERDBPRO_LICENSE_ISSUER`; set them only to use a different license server, as described in [Environment Variables](../configuration/env-variables.md#self-host-commercial-team-license-berbayar). Do not store the license key in an environment file. The value of `ERDBPRO_LICENSE_STATE_FILE` differs by platform because the variable points to a file on the server filesystem. See [path examples by platform](#nilai-path-per-jenis-deployment).

## 1. Docker (Recommended)

The official image is available on Docker Hub as `bekenweb/erd-builder-pro`.

:::warning Use PostgreSQL for servers
If `DATABASE_URL` is empty or starts with `file:`, the container uses SQLite at `/app/data/erd-builder.db`. This mode is only for one person trying it out on a local computer. For a server that other people access, use PostgreSQL. Team Workspace is also available only on PostgreSQL.
:::

### Prepare `.env`

```env
DATABASE_URL="postgresql://user:password@db:5432/erd_builder_pro"
ERD_ENCRYPTION_KEY="output-of-openssl-rand-hex-32"
```

- `DATABASE_URL` (required): a PostgreSQL connection string reachable from the container, starting with `postgresql://`.
- `ERD_ENCRYPTION_KEY` (required): a random value of at least 32 characters, for example the output of `openssl rand -hex 32`. This key encrypts stored AI API keys. Use the same value for as long as the database is in use.
- R2 variables (recommended): required for uploading images to Notes and Drawings. Do not set `R2_PUBLIC_URL`. See [R2 Configuration](../cloud-storage/r2-config.md).
- `ERDBPRO_LICENSE_STATE_FILE`: for Commercial Team, point it to a persistent volume, for example `/app/data/.erdbpro/license-state.json`.

Full examples are in [`.env.example`](https://github.com/hadziqmtqn/erd-builder-pro/blob/master/.env.example) and [Environment Variables](../configuration/env-variables.md).

### Run the Container

```bash
docker pull bekenweb/erd-builder-pro:latest
docker run -d \
  -p 3000:3000 \
  --name erd-builder-pro \
  --env-file .env \
  -v erd-data:/app/data \
  bekenweb/erd-builder-pro:latest
```

Open `http://localhost:3000`. On an empty database, the application shows the **Create administrator account** page to create the first SuperAdmin. Do not use `admin@local.dev` / `admin123`; the Self-host login rejects that combination.

### Image Tags

| Tag | Contents |
| :--- | :--- |
| `latest` | Latest stable release. |
| `3.5.7` | Exact version. Suitable if you want to control your own upgrade schedule. |
| `3.5` | Latest patch in the 3.5 series. |
| `54a7f36` (short SHA) | Build of one specific commit. |
| `3.5.8-rc.1` | Release candidate for testing. Do not use it in production. |

The image is available for the **amd64** (x86_64) architecture.

### What the Container Does on Start {/* #yang-dilakukan-container-saat-start */}

The image entrypoint prepares the database before the server starts:

1. **PostgreSQL** (`postgresql://`): waits up to 30 seconds for the database to be ready, creates the database if it does not exist, syncs the tables with the application schema (`prisma db push`), seeds initial data, then starts the server.
2. **Supabase** (`SUPABASE_URL` set): starts the server directly without changing the schema.
3. **SQLite** (`DATABASE_URL` empty or `file:`): uses `/app/data/erd-builder.db`.

The server runs on port `3000`. The image also has a healthcheck against `/api/health`.

### Docker Compose with PostgreSQL

The following example runs the application and PostgreSQL in one Compose project:

```yaml
services:
  app:
    image: bekenweb/erd-builder-pro:3.5
    ports:
      - "3000:3000"
    env_file: .env
    environment:
      ERDBPRO_LICENSE_STATE_FILE: /app/data/.erdbpro/license-state.json
    volumes:
      - erd-data:/app/data
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: erd
      POSTGRES_PASSWORD: change-this-password
      POSTGRES_DB: erd_builder_pro
    volumes:
      - pg-data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  erd-data:
  pg-data:
```

Fill in `.env` in the same folder:

```env
DATABASE_URL="postgresql://erd:change-this-password@db:5432/erd_builder_pro"
ERD_ENCRYPTION_KEY="output-of-openssl-rand-hex-32"
```

The `docker-compose.yml` in the repository builds the image from source and uses SQLite by default. For servers, use PostgreSQL as in the example above. Do not run `docker compose down -v`, `docker volume rm`, or `docker volume prune` on a volume that stores application data.

### Build Your Own Image

```bash
docker build -t erd-builder-pro .
docker run -d -p 3000:3000 --name erd-builder-pro --env-file .env -v erd-data:/app/data erd-builder-pro
```

The `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` build arguments are only relevant for older Supabase deployments.

### Backups in Docker {/* #backup-di-docker */}

**Settings → Database Backup** saves backup files in the home folder of the user that runs the server process. In the Docker image, that folder is `/root/ERD Builder Pro` inside the container, outside the `/app/data` volume, so it is lost when the container is recreated. Choose one:

- download backup files regularly from the Database Backup page;
- mount a volume at `/root/ERD Builder Pro`; or
- configure R2 so that every backup is also copied to the bucket.

See [Database Backup](../security-backup/manual-backup.md).

## Persistent License State (Paid Self-host) {/* #persistent-license-state-paid-self-host */}

Commercial Team deployments must store license state on a persistent local filesystem that the application process can write to. `license-state.json` stores the client token and signed entitlement, not the raw license key. The `installation-identity.json` file is usually stored in the same folder to preserve the installation ID and the private key that signs local Team records.

`ERDBPRO_LICENSE_STATE_FILE` takes the full path to the `license-state.json` file, not a folder name or URL. Use an absolute path visible to the server process. If `ERDBPRO_INSTALLATION_IDENTITY_FILE` is not set, the runtime stores `installation-identity.json` in the same folder. Set the identity override only when needed, and make sure that file is also on persistent storage.

The server also needs outbound HTTPS access to `https://license.erdbuilderpro.com`. If the license server is unreachable, Teams keep working for up to 72 hours after the last successful check.

### Path Values by Deployment Type {/* #nilai-path-per-jenis-deployment */}

| Deployment type | `ERDBPRO_LICENSE_STATE_FILE` | `ERDBPRO_INSTALLATION_IDENTITY_FILE` |
| --- | --- | --- |
| Docker or Docker Compose with the `erd-data:/app/data` volume | `/app/data/.erdbpro/license-state.json` | Optional: `/app/data/.erdbpro/installation-identity.json`; usually leave it empty to use this default |
| Managed containers such as Easypanel, Coolify, or Dokploy | `<persistent-mount-path>/.erdbpro/license-state.json`, for example `/data/.erdbpro/license-state.json` if the mount is visible at `/data` | Optional: `<persistent-mount-path>/.erdbpro/installation-identity.json`; usually leave it empty to use the sibling file |
| Linux VPS without Docker, for example a systemd service | `/var/lib/erd-builder-pro/.erdbpro/license-state.json` | Optional: `/var/lib/erd-builder-pro/.erdbpro/installation-identity.json`; usually leave it empty to use the sibling file |
| Vercel Functions | No supported path value for the Commercial Team license at this time | No supported path value |

For containers, use the path inside the container. For example, if the host mounts `/srv/erdbpro-data` at `/app/data`, set the variable to `/app/data/.erdbpro/license-state.json`, not the host path `/srv/erdbpro-data/...`. The runtime creates the parent folder, but the volume must already be mounted and writable by the application process user.

### Docker and Easypanel Notes {/* #catatan-docker-dan-easypanel */}

The Docker image does not set `ERDBPRO_LICENSE_STATE_FILE` or a volume by default. If the variable is empty, the runtime uses `.erdbpro/license-state.json` in the server working directory, which is `/app/.erdbpro/license-state.json` in the Docker image. Creating a volume at `/app/data` alone does not move the state there; the Compose example above also points the path variable into that volume.

- **Docker Compose:** the example above creates the named volume `erd-data` at `/app/data` and sets the license path to `/app/data/.erdbpro/license-state.json`.
- **Easypanel App service:** open **Storage**, add a Volume mount at `/app/data`, then make sure the environment contains `ERDBPRO_LICENSE_STATE_FILE=/app/data/.erdbpro/license-state.json`. Without a mount, files in the container filesystem can be lost when Easypanel recreates the service. Neither the image nor an environment variable creates persistent storage by itself.
- **Mount target:** mount the volume at `/app/data`, not at `/app`; a mount can hide files that already exist in the target directory. Back up the contents of `/app/data` before mounting the volume if that directory already contains files.
- **Backup:** a persistent volume protects files when the container is replaced, but it is not a backup. Set up volume backups separately and make sure you can restore them.

See also the [Docker volume documentation](https://docs.docker.com/engine/storage/volumes/) and the [Easypanel Storage documentation](https://easypanel.io/docs/services/app) for details on the volume and mount lifecycle.

The `/app/data` application volume does not store a PostgreSQL database that runs in a separate service; set up a volume for that PostgreSQL service separately. Keep the same `ERD_ENCRYPTION_KEY` value while using the same database, because the application needs it to decrypt stored AI API keys.

Vercel runs the API as Functions and recommends object storage for files written from Functions. The ERDBPro runtime currently reads and writes both license state files through the local filesystem; the application does not yet connect them to object storage. Therefore, the current Vercel integration has no supported persistent path for the Commercial Team license. Do not replace `/app/data` with `/tmp`; the path variable only selects a file location and does not provide persistent storage. See the [guide to files in Vercel Functions](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions).

Daily capacity reports are also run by a long-running server process. The current Vercel entry point does not run that scheduler, so Vercel does not guarantee delivery of daily reports. Use a container with a persistent volume or a VPS for Commercial Team deployments.

For an installation that is already running, before changing the configuration or recreating the container/server:

1. Check the value of `ERDBPRO_LICENSE_STATE_FILE` on the running service to find its effective path. Do not assume the file in `/app/.erdbpro` is the one being read if the variable points to another path.
2. Back up **both original files** (`license-state.json` and `installation-identity.json`). If the `.erdbpro` folder contains `team-provisioning-baseline-v1`, back it up too. Copying the whole folder is usually safest. Do not share or upload these files.
3. Attach persistent storage to the new deployment and restore the files without changing their contents. Set `ERDBPRO_LICENSE_STATE_FILE` to the file path on the mount; the installation identity uses the sibling file unless you set its override.
4. After the server starts, check the license status and the Team list before deleting the backup copies.

If you move from the default `/app/.erdbpro` to the `/app/data` volume, restore the old state to `/app/data/.erdbpro/` before starting the service with the new path. Do not let the runtime create a new installation identity to replace the old one; a changed identity can make the signatures of existing Teams stop matching. If the old license state is not available, do not assume that reactivation will automatically restore the old binding.

:::caution If startup cannot write the license state
Check that `ERDBPRO_LICENSE_STATE_FILE` points to persistent storage that is available and writable by the application process user. For Docker/Easypanel, make sure `/app/data` is actually a mount and the path in the variable is inside it. If you run `npm start` on a VPS without a container, do not use the Docker path `/app/data`; remove the override so the runtime uses the default in the working directory, or set a VPS path as in the table above.

Also check that the version in the startup log matches the image you are testing. Before retrying on a paid deployment, make sure the old copies of `license-state.json` and `installation-identity.json` are safe.
:::

Free Personal does not use this Team license state. The database, backups, and other files must still follow your deployment's persistence policy.

## 2. Coolify, Easypanel, Dokploy, and Other PaaS

Use the `bekenweb/erd-builder-pro` image or the **Dockerfile** method from the repository.

- Expose port `3000`.
- Set the environment in the panel dashboard, at least `DATABASE_URL` and `ERD_ENCRYPTION_KEY`.
- Mount a persistent volume at `/app/data`, especially for Commercial Team.

## 3. Vercel (Limited)

Use these steps only for deployment modes that are compatible with Vercel and do not use the Team license state file:
1. Connect your GitHub repository to Vercel.
2. Use *Framework Preset*: **Vite**.
3. Set *Output Directory*: `dist`.
4. Enter the environment variables that mode requires in the Vercel dashboard.

Licensed Self-host Commercial Team is not yet supported on Vercel. See [persistent state requirements and license paths](#persistent-license-state-paid-self-host). For licensed deployments, use Docker with a persistent volume or a Linux VPS.

## CLI and Desktop

The CLI (`npx erdbpro`) and the Desktop app run a local server with SQLite for one person. Their guides are in [CLI](./cli.md) and [Desktop App](./desktop-app.md).
