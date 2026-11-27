---
sidebar_position: 2
slug: /security-backup/auto-backup
---
# Auto Backup

**Auto Backup** creates database backups on a schedule from inside the app. It is available in Self-host (PostgreSQL), Desktop, and CLI, in the same place as [Database Backup](./manual-backup.md). Cloud does not have this menu.

## Enabling Auto Backup

1. Open **Settings → Database Backup**, then the **Settings** tab.
2. Check **Auto Backup**.
3. Choose the **Interval**: 15 minutes, 30 minutes, 1 hour, 6 hours, 12 hours, or 24 hours.
4. Choose **Keep**: keep the last 3, 5, 10, 20, 30, or 50 backups.

Defaults: disabled, every 1 hour, keeping 10 backups.

The server checks the schedule every minute, so Auto Backup only runs while the server (or the Desktop/CLI app) is running.

## Retention Rules

:::caution
The **Keep** setting counts **all** completed backups, including manual backups and `PreRestore_…` safety backups. After each Auto Backup, older backups beyond that number are deleted from the local folder together with their records. Copies in storage are not deleted.

If you need to keep a specific backup longer, download it and store it somewhere else.
:::

## Routine Checks

- Check the **Histories** tab regularly to make sure backups have the **Completed** status.
- Test a restore in a separate environment from time to time. See [Restore & Recovery](./disaster-recovery.md).
- In Docker, make sure the backup folder is on a persistent volume or that storage is configured. See [Backups in Docker](../getting-started/deployment.md#backup-di-docker).

## Supabase (Legacy)

Legacy Supabase deployments do not have Auto Backup in the app. In that mode, the **Create Backup** button triggers a GitHub Actions workflow (a `repository_dispatch` named `database-backup`) when `GITHUB_TOKEN`, `GITHUB_REPO_OWNER`, and `GITHUB_REPO_NAME` are set. The `auto-backup.yml` workflow in the repository also runs daily at 00:00 UTC, runs `pg_dump` on `SUPABASE_DB_URL`, then uploads the result to R2 at `erd-builder-pro/backups/`. Set these secrets in your GitHub repository: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL`, and the `R2_*` variables.
