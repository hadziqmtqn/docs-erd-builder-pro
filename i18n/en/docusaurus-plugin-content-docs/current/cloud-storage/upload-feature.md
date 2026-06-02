---
sidebar_position: 2
slug: /cloud-storage/upload-feature
---
# Image Upload Feature

ERD Builder Pro allows you to embed images directly into **Notes** or **Drawings** documents. All these assets are stored centrally in Cloudflare R2 for maximum performance.

## Storage Structure in R2
To facilitate asset management, the system automatically organizes files into the following directories within your bucket:

- **`erd-builder-pro/notes/`**: Contains all images you upload via the text editor (Tiptap).
- **`erd-builder-pro/drawings/`**: Contains image assets used on the Excalidraw or Flowchart canvas.
- **`erd-builder-pro/backups/`**: Contains database files from automatic and manual backups.
- **`erd-builder-pro/general/`**: A holding folder for assets that are not specifically categorized.

## How to Upload Images
### In the Notes Module
1. Open a **Notes** file.
2. You can directly **Copy-Paste** an image from the clipboard or **Drag & Drop** an image file into the editor.
3. The image will be automatically uploaded to R2 and displayed in the document.

### In the Drawings Module
1. Click the **Image** icon on the Excalidraw toolbar.
2. Select a file from your computer.
3. The image will be uploaded and you can freely position it on the canvas.

## Capacity Management
Each time you delete an image from the editor (Notes), the system will also attempt to delete the physical file from the R2 bucket (via a *cleanup* mechanism). However, we recommend periodically monitoring the `erd-builder-pro/` folder through the Cloudflare dashboard to ensure no orphaned files are left behind.

> [!TIP]
> File names are automatically changed to a random timestamp format (example: `1714000000-123456789.png`) to avoid naming conflicts.