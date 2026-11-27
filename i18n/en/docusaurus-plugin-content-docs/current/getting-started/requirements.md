---
sidebar_position: 2
slug: /getting-started/requirements
---
# System Requirements

System requirements depend on how you use ERD Builder Pro.

## By Usage Option

| Option | Requirements |
| :--- | :--- |
| **Cloud** | The latest browser version (Chrome, Firefox, Safari, or Edge). No installation needed. |
| **Desktop** | macOS (Apple Silicon or Intel), Windows x64, or Linux x86_64 (AppImage or `.deb`). See [Desktop App](./desktop-app.md). |
| **CLI** | **Node.js 22** or later, and npm. See [CLI](./cli.md). |
| **Self-host with Docker** | Docker and a **PostgreSQL** database. Node.js is already included in the image (Node 26.12.1 or later). The image is available for the amd64 (x86_64) architecture. |
| **Self-host from source** | Node.js 22 (the version CI uses), npm, Git, and PostgreSQL. |

## Optional Services

- **Cloudflare R2**: required for uploading images to Notes and Drawings on Web and Self-host. Without storage, image uploads are rejected. Desktop and CLI can also use S3-compatible storage from **Settings → Storage**. See [R2 Configuration](../cloud-storage/r2-config.md).
- **AI provider**: an API key for OpenAI, Google Gemini, Anthropic, or an OpenAI-compatible provider. See [AI Configuration](../configuration/ai-setup.md).
- **Self-host Commercial license**: only if you need Team Workspace on Self-host. Personal Workspace is free.

## Network Access

- **Self-host Commercial** needs outbound HTTPS access to the license server `https://license.erdbuilderpro.com` for activation and periodic checks. If the license server is unreachable, Teams keep working for up to 72 hours after the last successful check.
- **AI Assistant** needs access from the server to the selected AI provider.
- **Image uploads** need access from the server to the R2 bucket.
- Desktop and CLI can be used without internet access, except for the features above and update checks.

:::note
Supabase is no longer a requirement. Supabase mode is kept only for older deployments; new installations use PostgreSQL. See [Database Setup](../configuration/database-setup.md).
:::
