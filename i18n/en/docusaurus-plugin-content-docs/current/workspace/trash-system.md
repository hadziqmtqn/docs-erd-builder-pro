---
sidebar_position: 2
slug: /workspace/trash-system
---
# Trash & Data Recovery

Your data security is our priority. ERD Builder Pro uses a **Soft Delete** system, which means files you delete are not permanently gone immediately but are moved to a temporary storage area.

## Understanding Soft Delete
When you click the delete icon on any file (ERD, Flowchart, Note, or Drawing):
- The file will be marked as `deleted`.
- The file will be hidden from the active project sidebar to avoid distracting your focus.
- All data and relationships within the file remain intact and safe in the **Trash** folder.

> [!WARNING]
> **Project/Workspace Deletion**: If you delete a **Project** or **Workspace**, all files (ERD, Flowchart, Note, and Drawing) within it will be automatically deleted as well. Make sure to move important files to another project before performing a project-level deletion.

## Restoring Files (Restore)
If you accidentally delete a file or need an old document back:
1. Click the **Trash** menu at the bottom of the main sidebar.
2. Find the file you want to restore.
3. Click the **Restore** button.
4. **Result**: The file will automatically return to its original project with all data exactly the same as before deletion.

## Permanent Deletion
Permanent deletion is an **irreversible** action. Use this feature only if you are sure you no longer need the data.

1. Open the **Trash** menu.
2. Click **Delete Permanently** on the selected file.

### What Happens When You Delete Permanently?
- **Database**: The file record and all its contents (ERD tables, note contents, etc.) will be completely deleted from the Supabase database.
- **Storage (R2)**: If the file is a **Note** containing images, the system will also attempt to delete those image assets from your **Cloudflare R2** bucket to free up storage space.

> [!CAUTION]
> We highly recommend periodically reviewing the contents of your Trash folder before performing permanent cleanup.