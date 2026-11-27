---
sidebar_position: 5
slug: /collaboration/public-share
---
# Public Links

**Share** creates a read-only link that anyone can open without an account. It is available for Notes, ERD, Drawing, and Flowchart.

## Creating a Link

1. Open the file, then select **Actions → Share**. This menu appears only for the file creator when they have edit rights, and is disabled while offline.
2. In the **Share "&lt;title&gt;"** dialog, check **Public Access** (*Enable sharing via public link*).
3. Copy the **Public Link** with the copy button.
4. Optional:
   - **Access Token (Optional)**: click **Generate** so visitors must enter the token before opening the document.
   - **Duration (Days)**: the number of days the link is valid. Leave it empty for a link that never expires.
5. Click **Save Changes**.

Link format: `<app-url>/view/<diagram|note|drawing|flowchart>/<id>`.

A shared file shows a **Public** badge in the header, and its **Actions** menu contains **Copy Public Link**.

## What Visitors See

- The document in read-only mode, without login and without the sidebar.
- The **Actions** menu contains only **Copy Public Link**.
- If the link uses a token, an **Access Denied** page appears with an *Enter access token...* field and an **Unlock Document** button.
- If sharing is turned off, visitors see *This document is private*. If the link has expired, they see *This share link has expired*.

Images in the document are shown through signed URLs that are regenerated each time the page is opened.

## Stopping Sharing

Open **Actions → Share**, uncheck **Public Access**, then **Save Changes**. The token and expiration are removed too. The link is built from the file ID, so if sharing is turned on again, the link address stays the same.

## Notes

- In a Team Workspace, only the file creator can share it.
- Links from Desktop and CLI use your computer's local address (`localhost`), so they can only be opened from that computer. To share with other people, use Cloud or Self-host.
