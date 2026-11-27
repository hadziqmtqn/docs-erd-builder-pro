---
sidebar_position: 5
slug: /workspace/trash-system
---
# Trash & Data Recovery

ERD Builder Pro uses **soft delete**: a deleted file or Project is moved to **Trash** first, so it can still be restored.

## Opening Trash

Click the profile menu at the bottom left of the sidebar, then select **Trash**. The **Trash Bin** page has the tabs **Projects**, **ERD**, **DB Client** (Desktop/CLI), **Notes**, **Drawings**, and **Flowcharts**.

Trash shows the contents of the active workspace, including items deleted by other members in a Team Workspace. The Trash menu is disabled while the connection to the server is lost.

## Restoring Items

1. Open the tab for the file type.
2. Click **Restore** on the item you want to restore.

The file returns to its original Project with the same content it had before it was deleted.

- Only the creator of an item can restore or delete it. Items owned by others show **Creator only**.
- A file cannot be restored while its Project is still in Trash. Restore the Project first.
- Restoring a Project also restores the files in it. Only the Project creator can restore a Project, and only if they also created every file in it.

## Deleting Permanently

1. Click **Delete** on the item.
2. Confirm with **Permanently Delete**.

Permanent deletion **cannot be undone**. The file record, all of its content, and its [Version History](../collaboration/version-history.md) are deleted too.

### Empty Trash (Cloud)

On Cloud, the **Empty Trash** button permanently deletes all items **you created** in the active workspace. Items created by other members remain.

## Automatic Deletion

| Option | Behavior |
| :--- | :--- |
| **Cloud** | Items in Trash are permanently deleted after **30 days**. The Trash page shows a warning and each item's deletion date (*Deleted permanently on …*). |
| **Self-host** | No automatic deletion, unless an administrator sets `TRASH_RETENTION_DAYS`. See [Environment Variables](../configuration/env-variables.md#retensi-data-opsional). |
| **Desktop and CLI** | No automatic deletion. |

## Images in Storage

Images used by Notes or Drawings are not removed from storage right away:
- **Cloud and Self-host**: images that are no longer used are flagged by a daily cleanup, then deleted from the bucket after 30 days. See [Library](../cloud-storage/library.md).
- **Desktop and CLI**: images are deleted from storage when the file is permanently deleted.

:::caution
Check the contents of Trash regularly before deleting anything permanently. On Cloud, restore files within 30 days if you still need them.
:::
