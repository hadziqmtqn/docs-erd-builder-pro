---
sidebar_position: 1
slug: /security-backup/manual-backup
---
# Database Backup

**Database Backup** creates a copy of the entire database from inside the app, then manages the backup history.

:::info Availability
- **Self-host (PostgreSQL)**: SuperAdmin only.
- **Desktop and CLI**: available to the local user.
- **Cloud**: not available. Cloud backups are managed at the infrastructure level by the ERD Builder Pro team.
:::

## Opening Database Backup

Open the profile menu at the bottom left of the sidebar, choose **Settings**, then the **Database Backup** tab in the **More** group. This page has the **Histories** and **Settings** tabs.

## Creating a Backup

1. Click **Create Backup**.
2. The message *Backup process started in the background* appears. The backup status changes from **Processing** to **Completed**.

Backup names are generated automatically, for example `Backup_20261127_1430`. Automatic backups are named `AutoBackup_…`, and safety backups made before a restore are named `PreRestore_…`.

## Status and Columns

The history table shows **Backup Name**, **Size**, **Status**, **Destinations**, **Date**, and **Action**.

| Status | Meaning |
| :--- | :--- |
| **Processing** | The backup is being created. |
| **Creating safety backup** | A safety backup is being created before a restore. |
| **Completed** | The backup is finished and ready to use. |
| **Failed** | The backup failed. |

The **Destinations** column shows **Local** (a file on the computer/server), and **Cloud** when a copy was also sent to storage.

## Backup File Contents

- A single compressed `.sql.gz` file that contains the entire database:
  - **PostgreSQL**: an SQL dump from `pg_dump`.
  - **SQLite** (Desktop/CLI): a compressed copy of the SQLite database file, even though its name ends in `.sql.gz`.
- **Not included**: images in storage and the `.erd-encryption-key` encryption key file. Store `ERD_ENCRYPTION_KEY` or the key file separately.

## Storage Location

| Operating system | Default folder |
| :--- | :--- |
| macOS and Linux | `~/ERD Builder Pro` |
| Windows | `~\Documents\ERD Builder Pro` |

- **Desktop**: the folder can be changed from the **Storage location** panel (**Change**, **Browse**, **Save**, **Reset**).
- **Self-host and CLI**: files are stored in the home folder of the user that runs the server.
- **Docker**: the home folder is inside the container (`/root/ERD Builder Pro`) and is lost when the container is recreated. See [Backups in Docker](../getting-started/deployment.md#backup-di-docker).

When storage (Cloudflare R2 or S3-compatible) is configured, each backup is also copied to the bucket at `backups/<id>.sql.gz`. If sending the copy fails, the local file is kept.

## Downloading a Backup

- **Web and CLI**: click the **Download backup** icon to download the `.sql.gz` file.
- **Desktop**: click **Show in folder** to open the file location.

Keep a copy of your backups somewhere else, such as offsite storage, so they stay safe if the server fails.

## Next Steps

- Schedule automatic backups in [Auto Backup](./auto-backup.md).
- Restore the database from a backup in [Restore & Recovery](./disaster-recovery.md).
