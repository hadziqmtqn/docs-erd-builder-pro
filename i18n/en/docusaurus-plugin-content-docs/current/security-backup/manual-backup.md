---
sidebar_position: 1
slug: /security-backup/manual-backup
---
# Manual Backup

ERD Builder Pro provides an intuitive **Database Backup** interface to instantly back up data and manage your backup history.

## How to Create a New Backup
1. Click on **User Profile** (profile icon in the bottom left corner) and select the **Database Backup** menu.
2. Click the **"+ Create Backup"** button in the top right corner.
3. The system will start processing the backup of your database.

## Understanding Backup Status
The backup list displays real-time status for each process:
- **Processing**: The system is dumping the database and uploading it to Cloudflare R2. You cannot download the file while this status is active.
- **Completed**: The backup has been successfully created and stored in your cloud storage.

## Backup File Management
In the backup history table, you can perform several actions:
- **Download**: Click the download icon on the **Action** column to save the `.sql.gz` file to your local computer.
- **Refresh**: Use the *refresh* button (spin icon) on the top right of the table to update the latest backup status.
- **Identity**: Each backup is automatically named based on a timestamp (example: `Backup_20260425_1837`) for easy tracking.

> [!IMPORTANT]
> This feature is fully dependent on the connection to **Cloudflare R2**. Ensure the `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` variables are properly configured on the server so that the upload process does not fail (status stuck at Processing).