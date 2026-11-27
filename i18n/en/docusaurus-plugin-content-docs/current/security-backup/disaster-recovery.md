---
sidebar_position: 3
slug: /security-backup/disaster-recovery
---
# Restore & Recovery

This page explains how to restore the database from a backup, either from inside the app or manually when the app cannot be opened.

## Restore from the App

Available in Self-host (PostgreSQL, SuperAdmin only), Desktop, and CLI.

1. Open the **Histories** tab in **Settings → Database Backup**.
2. Click **Restore** on a backup with the **Completed** status whose local file still exists.
3. Read the **Restore database from this backup?** dialog: the entire database will be replaced with the contents of the backup, and the current data will be lost.
4. Type the backup name to confirm, then click **Restore Database**.

The restore runs in several stages: **Creating safety backup**, **Decompressing backup**, **Replacing database**, and **Cleaning up**. Before the database is replaced, the app creates a `PreRestore_…` safety backup of the current data. When it finishes, *Database restored successfully.* appears with a **Reload** button.

- You may need to log in again, and unsaved changes in other tabs will be lost.
- If the restore fails, the error message names the `PreRestore_…` backup that holds the data from before the restore.
- Legacy Supabase mode does not support restoring from the app.

## Import Database (Desktop and CLI)

The **Import Database** button on the Database Backup page restores the database from a file on your computer: `.db`, `.sqlite`, `.sqlite3`, `.sql`, or `.sql.gz`, up to 50 MB. A safety backup is also created first.

## Manual Recovery

Use this method when the app cannot be opened.

### 1. Get the Backup File
- From the local backup folder (`~/ERD Builder Pro`, or the folder you chose in Desktop), or
- from the storage bucket at `backups/<id>.sql.gz` if storage is configured.

### 2. Extract the File
```bash
gunzip backup_file_name.sql.gz
```

### 3a. PostgreSQL (Self-host)
Restore into an **empty** database, then point the app to that database:
```bash
createdb erd_builder_pro_restore
psql "postgresql://user:password@host:5432/erd_builder_pro_restore" -v ON_ERROR_STOP=1 -f backup_file_name.sql
```
Change `DATABASE_URL` to the restored database, then restart the server.

### 3b. SQLite (Desktop and CLI)
The extracted file is an SQLite database. Close the app first, keep a copy of the old `data.db`, then replace `data.db` with the extracted file. The location of `data.db` is described in [Desktop app](../getting-started/desktop-app.md#lokasi-data) and [CLI](../getting-started/cli.md#lokasi-data).

:::caution
A restore overwrites existing data. Create a fresh backup before you restore.
:::

## What to Store Separately

Database backups do not include:
- **Encryption key** (`ERD_ENCRYPTION_KEY` or the `.erd-encryption-key` file). Without the same key, stored AI API keys and DB Client credentials cannot be decrypted.
- **Images** in the storage bucket.
- **License state** for Self-host Commercial (`license-state.json` and `installation-identity.json`). See [Persistent License State](../getting-started/deployment.md#persistent-license-state-paid-self-host).

## Prevention Strategies
- Enable [Auto Backup](./auto-backup.md) and keep copies outside the server.
- Test recovery regularly in a separate environment.
- Store the `.env` file and the encryption key in a password manager or secret manager.
