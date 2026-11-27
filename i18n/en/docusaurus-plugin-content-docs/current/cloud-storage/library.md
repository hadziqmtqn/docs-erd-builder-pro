---
sidebar_position: 3
slug: /cloud-storage/library
---
# Library

**Library** shows all images uploaded to the active workspace by all of its members, so you can see which images take up storage and clean up the ones that are not used.

## Opening Library

- **Cloud**: click **Library** in the sidebar, or open **Settings → Usage → Open Library**.
- **Self-host (PostgreSQL)**: there is no sidebar menu yet; open the `/library` address in your app.
- Desktop, CLI, and Supabase do not have Library.

## Contents and Controls

- **Filter**: **All files** or **Unused only**.
- **Sort**: **Largest first** or **Newest first**.
- **Refresh** reloads the list.
- 50 images per page.

The **Unused** label appears on images that are no longer used by any document. This label is updated by the daily cleanup, so an image that was just removed from a document may not be marked Unused right away.

## Deleting Images

1. Click **Delete** on an image.
2. Confirm in the **Delete from Library?** dialog.

A deleted image immediately stops counting toward storage and is labeled **Deleted · removed &lt;date&gt;**. The image is only permanently deleted after 30 days; until then, you can click **Undo**. Undo checks the remaining storage quota again.

- An image that is still in use cannot be deleted: *This image is still used by: &lt;title&gt;. Remove it from those documents first.*
- Only the user who uploaded the image or a Team Manager can delete it (*Uploader or Manager only*).
- **Delete unused (N)** deletes all Unused images on the page currently shown. This button is available to Team Managers, and to all users in a Personal Workspace.

See also [Cloud Quotas](./cloud-quota.md).
