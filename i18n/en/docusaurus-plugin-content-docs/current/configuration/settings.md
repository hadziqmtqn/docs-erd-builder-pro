---
sidebar_position: 4
slug: /configuration/settings
---
# Settings

The **Settings** window opens from the profile menu in the bottom-left corner of the sidebar. The tabs shown depend on how you use the app and on your account role.

## Tab List

| Group | Tab | Shown for |
| :--- | :--- | :--- |
| General | **Account** | All users, except in Cloud (Cloud accounts are managed in ERDBPro SaaS) |
| General | **Appearance** | All users |
| General | **Storage** | Desktop and CLI |
| General | **Usage** | Cloud |
| Feature | **AI Configuration** | Self-host SuperAdmin, Desktop, and CLI. Not available in Cloud. |
| Feature | **Application License** | Self-host SuperAdmin |
| Feature | **MCP Integration** | All users |
| Feature | **AI Rules** | All users |
| Feature | **System Prompts** | All users |
| More | **Keymap** | All users |
| More | **Export Data**, **Import Data**, **Database Backup** | Self-host SuperAdmin, Desktop, and CLI |
| More | **What's New** | All users |

Guest users see only **Appearance**, **Keymap**, and **What's New**.

Self-host Team and user management is not in Settings; it is in the SuperAdmin's **Instance Administration → Team / Users** sidebar menu. In Cloud, the **Manage account & billing** menu opens ERDBPro SaaS.

## Appearance

Choose the **Light**, **Dark**, or **System** theme (follows the operating system). The default is **System**. The choice is saved in the browser.

## Storage (Desktop and CLI)

The **Storage** tab (titled **Storage Configuration**) sets where Notes images are uploaded, without an environment file:

1. Select **Cloudflare R2** or **S3-Compatible**.
2. Enter the credentials and bucket name.
3. Click **Test Connection**, then **Save Configuration**.

The configuration saved here is used in place of the `R2_*` variables. Leave the **Public URL (optional)** field empty, because image uploads are rejected when it is filled in.

## Usage (Cloud)

Shows the storage usage of the active workspace, for example *&lt;used&gt; of &lt;limit&gt; used*, a breakdown of documents and images, and the **Open Library** button. See [Cloud Quota](../cloud-storage/cloud-quota.md).

## Application License (Self-host)

This tab activates the Self-host Commercial license for Teams.

- The status shows **Active: &lt;plan&gt;** or **No commercial license is active**, the number of **Active Teams** and **Active members** against the license limits, and the **Last checked** time.
- To activate, enter the **Instance license key**, then click **Activate license** and confirm. The **Activation grant** field is needed only after the deployment binding has been reset.
- **Check license** refreshes the status from the license server.

See also [Deployment](../getting-started/deployment.md#persistent-license-state-paid-self-host) for the persistent storage requirements.

## MCP Integration

Shows the configuration for connecting external AI clients. On the Web, the **Public MCP Integration** section shows the MCP URL. On Desktop and CLI, the **Connect AI Clients** section provides configurations for JetBrains AI, VS Code, Codex, Hermes Agent, and Generic MCP (STDIO). See [MCP](./mcp.md).

## AI Rules {/* #ai-rules */}

Additional rules sent to the AI Assistant as system instructions. This tab has the **ERD**, **Notes**, **Flowchart**, and **DB Client** sub-tabs, each for the matching editor context. Click **Save Rules** to save.

- **Self-host:** one shared set of rules that only the SuperAdmin can change. Other users see it in read-only mode.
- **Desktop, CLI, and Cloud:** each user sets their own rules.

The default rules are written in Indonesian, and you can change them.

## System Prompts

System prompts you can select for the AI Assistant.

1. Click **Create Prompt**.
2. Fill in **Name**, **Category** (*System Instruction*, *Context*, *Format*, or *Custom*), and the prompt text.
3. On the prompt card, click **Set Active** to use it.

One prompt is active per scope. A **Global** prompt (only a Self-host SuperAdmin can create one) applies to all users, while a **Personal** prompt applies only to you. When both are active, both are sent. In Cloud, the global prompt is managed from ERDBPro SaaS.

## Keymap

A list of keyboard shortcuts for General, Notes, ERD Builder, Flowchart, and DB Client (Desktop/CLI). The list is read-only; shortcuts cannot be changed yet. For Drawings, see the Help menu in Excalidraw.

## Export Data, Import Data, and Database Backup

These tabs are for the Self-host SuperAdmin, Desktop, and CLI. Database Backup is described in [Database Backup](../security-backup/manual-backup.md).
