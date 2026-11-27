---
sidebar_position: 6
slug: /getting-started/cli
---
# CLI (`erdbpro`)

The `erdbpro` npm package runs ERD Builder Pro on your computer without cloning the repository, without Docker, and without setting up a database. Data is stored in local SQLite, and the app signs you in directly, without a login page.

## Requirements
- **Node.js 22** or later. The `start`, `mcp`, and `schema` commands exit with the message `ERD Builder Pro requires Node.js 22+.` if the version is lower.

## Quick Start

```bash
npx erdbpro
```

The server runs at `http://localhost:3101`, then an interactive menu appears.

Or install it globally:

```bash
npm install -g erdbpro
erdbpro
```

## Interactive Menu

Running `erdbpro` without arguments is the same as `erdbpro start`. The menu that appears:

```
▶ Web UI (Open in Browser)
  Hide to Background
  Exit
```

- **↑ ↓** moves the selection, **Enter** runs the action, **q** quits.
- When a new version is available, the menu adds **Update to vX (current: vY)** at the top.
- On macOS, the CLI also shows an icon in the menu bar when the package includes it.

## Commands

| Command | Purpose |
| :--- | :--- |
| `erdbpro` or `erdbpro start` | Starts the server and shows the menu. |
| `erdbpro start --port 4000` | Uses a different port (default `3101`). |
| `erdbpro start --background` | Runs the server in the background. |
| `erdbpro start --open` | Skips the menu and opens the browser directly. |
| `erdbpro start --force` | Starts the server even if a previous server appears to still be running. |
| `erdbpro stop` | Stops the background server. |
| `erdbpro status` | Checks whether the server is running. |
| `erdbpro update` | Checks for a new version and shows the command to install it. |
| `erdbpro mcp` | Runs the local MCP server over stdio. See [MCP](../configuration/mcp.md). |
| `erdbpro schema check` | Validates schema sources in a Git repository without running the app. |
| `erdbpro schema diff` | Compares schema sources between two Git refs without a checkout. |
| `erdbpro --version` | Shows the CLI version. |

## Update

```bash
erdbpro update
```

This command checks npm for the latest version, then prints one of these results:

- `✅ erdbpro vX is up to date.`
- `⬆  Update vX → vY`, followed by the command to run.

`erdbpro update` does not install anything itself. Run the command it shows, for example:

```bash
npm install -g erdbpro@latest --prefer-online
```

Beta versions (version numbers containing `-beta`) use the `beta` npm tag. The **Update** item in the interactive menu stops the server, then shows the same command. After updating, run `erdbpro` again.

## Schema Checks in a Repository {/* #pemeriksaan-skema-di-repositori */}

`schema check` and `schema diff` read schema sources directly from a Git repository, which makes them suitable for CI. Recognized sources:

- Laravel migrations in `database/migrations/*.php`;
- `.dbml` files;
- `schema.sql` files;
- `.sql` files inside a `migrations/` folder.

### `schema check`

```bash
erdbpro schema check --repo . --fail-on-warnings
```

| Option | Description |
| :--- | :--- |
| `-r, --repo <path>` | Repository folder. Default: the current folder. |
| `--ref <git-ref>` | Git ref to read. Default: `WORKTREE` (the contents of the current folder). |
| `--source <id>` | Schema source when there is more than one, for example `laravel:database/migrations`, `dbml:schema.dbml`, or `sql:database/schema.sql`. |
| `--json` | JSON output. |
| `--fail-on-warnings` | Exits with code `2` if there are warnings. |

### `schema diff`

```bash
erdbpro schema diff --base origin/main --markdown --fail-on-destructive
```

| Option | Description |
| :--- | :--- |
| `-r, --repo <path>` | Repository folder. Default: the current folder. |
| `--base <git-ref>` | Base ref to compare against (required). |
| `--head <git-ref>` | Ref to check. Default: `WORKTREE`. |
| `--source <id>` | Schema source to compare. |
| `--json` / `--markdown` | Output format. |
| `--fail-on-destructive` | Exits with code `2` if there are destructive changes. |

Both commands exit with code `1` on error.

## Data Location {/* #lokasi-data */}

All CLI data is in `~/.erdbpro/`:

| File | Contents |
| :--- | :--- |
| `data.db` | SQLite database. |
| `server.pid` | PID of the background server. |
| `logs/` | Server logs. |
| `update.json` | Update check cache. |

A local encryption key is created next to the database when neither `ERD_ENCRYPTION_KEY` nor `ERD_ENCRYPTION_KEY_FILE` is set.

## Features Specific to CLI and Desktop

The CLI runs the same local installation mode as the Desktop app, so the following features are available: [DB Client](../core-features/db-client.md), [Git Repository](../core-features/git-repository.md), local MCP, and **Settings → Storage**. Team Workspace, comments, and notifications are not available because the CLI is for a single user only.

## Uninstall

```bash
npm uninstall -g erdbpro
rm -rf ~/.erdbpro
```

:::caution
The `rm -rf ~/.erdbpro` command deletes your local database. Make a backup first if you still need the data.
:::
