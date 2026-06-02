---
sidebar_position: 3
slug: /security-backup/disaster-recovery
---
# Disaster Recovery

This page outlines the steps to take in the event of a total system failure or data loss on the main Supabase database.

## Backup File Location (Emergency Access)
If the ERD Builder Pro dashboard is inaccessible, you can still retrieve your database file manually:
1. Log in to the **Cloudflare** dashboard.
2. Go to the **R2** menu and select the bucket you are using (e.g., `erd-builder-storage`).
3. Find the parent folder **`erd-builder-pro/`**, then open the subfolder **`backups/`**.
4. Inside that folder, you will find files named in the format `backup_[ID]_[TIMESTAMP].sql.gz`.
5. Download the latest file to your computer.

## Restoration Steps (Restore)
Once you have the `.sql.gz` file, follow these steps to restore the database:

### 1. Extract the File
Extract the file to get the raw `.sql` file. You can use applications such as WinRAR, 7-Zip, or the terminal command:
```bash
gunzip backup_file_name.sql.gz
```

### 2. Import into Supabase
You can import the data back via the **SQL Editor** in Supabase:
1. Open the `.sql` file with a text editor (Notepad++, VS Code, etc.).
2. Copy the entire code content.
3. In the Supabase dashboard, open **SQL Editor** and create a **New Query**.
4. Paste the code and click **Run**.

> [!CAUTION]
> **Warning**: This restore process will overwrite existing data. Ensure you take a final backup snapshot before attempting a full restoration.

## Prevention Strategies
- Periodically test downloading backup files from the **`backups/`** folder to ensure the R2 integration is working smoothly.
- Store a copy of your environment variables (`.env`) in a secure place (e.g., a password manager), because without those keys, you cannot access the backup folder in R2.