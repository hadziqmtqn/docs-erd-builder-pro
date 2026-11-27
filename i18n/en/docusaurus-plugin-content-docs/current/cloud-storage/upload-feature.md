---
sidebar_position: 2
slug: /cloud-storage/upload-feature
---
# Image Upload

Images can be inserted into **Notes** and **Drawings**. Images are stored in the configured storage (Cloudflare R2, or S3-compatible storage in Desktop/CLI).

## How to Upload

### Notes
Paste an image from the clipboard, drag a file into the editor, or choose **Image** in the Slash Menu (`/`).

### Drawings
Use the *image* tool in the Excalidraw toolbar, then choose a file from your computer.

In the Desktop app, Drawings images are stored directly inside the Drawing file and are not uploaded to storage.

## Format and Size

| Rule | Limit |
| :--- | :--- |
| Format | JPEG, PNG, WebP, SVG (checked from the file contents) |
| Original file size | Up to 5 MB. The browser compresses the image to at most 1 MB and at most 1280 px wide. |
| Size after compression | Up to 1 MB (SVG is not compressed; up to 1 MB) |
| Per document | Up to 15 images and 2 MB in total (administrators can change these through `DOCUMENT_IMAGE_LIMIT` and `DOCUMENT_IMAGE_BYTES`) |

Possible error messages:
- *File type is not allowed. Use JPEG, PNG, WebP or SVG.*
- *The image is larger than 5 MB.*
- *The image is still larger than 1 MB after compression. Crop it or use a smaller image.*
- *A document can hold up to 15 images and 2 MB of images. Remove an image or use a smaller one.*

## Storage Structure

File names are generated automatically from a timestamp and a random number, for example `1714000000000-123456789.png`, so they do not collide.

| Option | Location in the bucket |
| :--- | :--- |
| **Cloud** | `erd-builder-pro/team/<organization-id>/<feature>/<file>` |
| **Self-host**, Team | `erd-builder-pro/team/<team-id>/<feature>/<file>` |
| **Self-host**, Personal | `erd-builder-pro/user/<user-id>/<feature>/<file>` |
| **Desktop, CLI, Supabase** | `erd-builder-pro/<feature>/<file>` |

`<feature>` is `notes` or `drawings`. Database Backup copies are stored in `backups/`.

## Image Cleanup

**Cloud and Self-host (PostgreSQL):**
- A daily cleanup marks images that are no longer used by any document.
- Marked images are deleted from the bucket after 30 days.
- Images that are still used by a document cannot be deleted (*This file is still used by a document.*).

You can view and clean up the list of images in a workspace through [Library](./library.md).

**Desktop and CLI:** images are deleted from storage when a Note or Drawing is permanently deleted from Trash.
