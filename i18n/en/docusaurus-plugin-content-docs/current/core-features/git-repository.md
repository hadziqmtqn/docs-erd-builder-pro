---
sidebar_position: 11
slug: /core-features/git-repository
---
# Git Repository (Desktop & CLI)

The **Repository Schema** panel links an ERD to a Git repository on your computer, then reads the schema from migration or SQL files in that repository. The repository and the active branch are never changed.

:::info Desktop and CLI only
This panel is only available in the Desktop app and the CLI, and requires `git` to be installed on the computer.
:::

## Supported Schema Sources

- **Laravel migrations**: `database/migrations/*.php`
- `.dbml` files
- `schema.sql` files
- `.sql` files inside a `migrations/` folder

One source can contain 1–500 files, up to 5 MB in total.

## Connecting a Repository

1. Open an ERD, then click **Repository** in the canvas toolbar.
2. Enter the **Repository path** (on Desktop, a button lets you choose the folder), then click **Connect repository**.
3. Choose a **Git ref**: *Working tree* (the current folder contents), a local or remote branch, or one of the last 50 commits.
4. Choose a **Schema** when the repository has more than one source.

The repository link is saved per diagram.

## Comparing

- **Preview against current ERD** shows the differences between the repository schema and the current ERD directly on the canvas. Changes can be merged into the ERD.
- **Compare Git refs** compares two refs: choose a **Base ref**, then **Compare with selected ref**. The result is a preview only.
- **Disconnect** removes the link between the ERD and the repository.

## In CI and AI Clients

- The `erdbpro schema check` and `erdbpro schema diff` commands run the same checks without opening the app. See [CLI](../getting-started/cli.md#pemeriksaan-skema-di-repositori).
- The local MCP tool `workspace_resolve_repository` uses this link so AI clients can find the ERD from the repository folder they are working in. See [MCP](../configuration/mcp.md).
