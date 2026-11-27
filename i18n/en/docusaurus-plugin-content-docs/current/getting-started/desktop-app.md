---
sidebar_position: 5
slug: /getting-started/desktop-app
---
# Desktop App

The Desktop app runs ERD Builder Pro on your computer with a local SQLite database. There is no login page and no server is needed. The only available workspace is **Personal**.

## Download and Install

Download the installer from the [GitHub Releases](https://github.com/hadziqmtqn/erd-builder-pro/releases/latest) page. Choose the file for your system:

| System | File |
| :--- | :--- |
| macOS Apple Silicon (M1 or later) | `ERD-Builder-Pro_<version>_aarch64.dmg` |
| macOS Intel | `ERD-Builder-Pro_<version>_x86_64.dmg` |
| Windows x64 | `ERD Builder Pro_<version>_x64-setup.exe` or `ERD Builder Pro_<version>_x64_en-US.msi` |
| Linux x86_64 | `ERD Builder Pro_<version>_amd64.AppImage` or `ERD Builder Pro_<version>_amd64.deb` |

Other files on the release page, such as `.sig`, `.app.tar.gz`, and `latest.json`, are used by the app updater; you do not need to download them. A release whose name contains `-rc` is a *pre-release* for testing.

### Warning on First Launch
The Windows installers are not Authenticode-signed, and the macOS app is not signed with an Apple Developer ID or notarized. As a result, macOS (Gatekeeper) or Windows (SmartScreen) may show a warning or block the app from opening. On macOS, close the *Apple could not verify…* dialog, open **System Settings → Privacy & Security**, then click **Open Anyway** next to ERD Builder Pro.

On macOS, move the app to the **Applications** folder. An app run from a read-only location, for example directly from the `.dmg` file, shows the message **Move ERD Builder Pro to Applications to update** and cannot update itself.

## Update

The app checks for updates about 5 seconds after it opens. When a new version is available:

1. An **Update Available** notification appears with the text *New version (vX) is ready.*
2. Choose **Update Now** to download and install it, or **Later** to postpone it.
3. After **Update installed successfully!**, the app relaunches with the new version.

To check manually:
- macOS: **Check for Updates…** in the app menu.
- All systems: the **Download Update** button in the **About** dialog.

The result is **You're up to date** if you already have the latest version, or **Check failed** if the check fails.

If the app's local server fails to start, a separate updater window may appear with the options **Install and Restart**, **Show Logs**, and **Download manually**.

## Data Location {/* #lokasi-data */}

The database (`data.db`) and its supporting files are in the app data folder:

| System | Folder |
| :--- | :--- |
| macOS | `~/Library/Application Support/com.erdbuilderpro.app` |
| Windows | `%APPDATA%\com.erdbuilderpro.app` |
| Linux | `$XDG_DATA_HOME/com.erdbuilderpro.app` or `~/.local/share/com.erdbuilderpro.app` |

The local encryption key (`.erd-encryption-key`) is created next to the database. Keep this folder when you move your data to another computer.

## Desktop-Specific Features

The following features are available only in Desktop and CLI:

- [DB Client](../core-features/db-client.md) for opening PostgreSQL, MySQL, and SQLite databases.
- The [Git Repository](../core-features/git-repository.md) panel for comparing an ERD with the schema in a repository.
- Local MCP for AI clients such as Codex, VS Code, and JetBrains AI. See [MCP](../configuration/mcp.md).
- **Settings → Storage** for configuring Cloudflare R2 or S3-compatible storage without an environment file.
- **Database Backup** with a choice of storage folder, plus **Import Database**.

Images inserted into Drawings are stored inside the drawing file itself, so they do not need storage. Images in Notes still need storage.

Desktop does not support PostgreSQL as the application database, Team Workspace, comments, or notifications.
