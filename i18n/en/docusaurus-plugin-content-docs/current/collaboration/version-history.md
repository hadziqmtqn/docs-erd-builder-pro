---
sidebar_position: 4
slug: /collaboration/version-history
---
# Version History

**Version History** keeps earlier versions of a file so you can see what changed and restore a previous state. It is available for Notes, ERD, Flowchart, and Drawing in every usage option.

## Opening Version History

Open the file, then select **Actions → Version History**. This menu is disabled while offline or while the file is being saved, and is not available for Guest or public links.

The **Version History** panel shows up to 100 versions, each with its time and *Changed by &lt;name&gt;*. The **Safety** label marks a safety version created before a restore, and **Restored** marks a version created by a restore.

- **ERD** and **Notes**: select a version to preview it in the editor.
- **Flowchart**: shows the number of symbols (*Nodes*) and connections (*Connections*).
- **Drawing**: shows the number of elements (*Elements*) and image files (*Files*).

If there are no versions yet, the panel shows *No saved versions yet. A version is created after document changes.*

## When Versions Are Created

- When changes are saved successfully, at most once every 5 minutes per file. A save without changes does not create a new version.
- The app keeps the 100 most recent automatic versions per file.
- Changes made through MCP are always recorded.
- Before a restore, the current version is saved as a **Safety** version.

## Restoring a Version

1. Select a version, then click **Restore**.
2. In the **Restore this version?** dialog, click **Restore version**.

The current version is saved first as a safety version, then the message *Version restored. The previous state was saved as a safety revision.* appears. If the file changes while the panel is open, the restore is rejected with the message *Document changed while history was open*; reopen the panel and try again.

In a Team Workspace, only the file creator can restore a version. Other members can read the history.

## Retention

| Option | Retention |
| :--- | :--- |
| **Cloud** | Versions older than 30 days are deleted. |
| **Self-host** | Not deleted by age, unless an administrator sets `REVISION_RETENTION_DAYS`. |
| **Desktop and CLI** | Not deleted by age. |

Permanently deleting a file from Trash also deletes its entire Version History.
