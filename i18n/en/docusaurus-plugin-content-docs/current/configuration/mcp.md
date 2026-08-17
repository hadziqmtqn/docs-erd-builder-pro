---
sidebar_position: 5
slug: /configuration/mcp
---

# Model Context Protocol (MCP)

:::warning[Experimental]
The MCP integration is still **Experimental**. Tool names, input formats, and capability limits may change in later releases. Review every tool call that writes data, and do not enable automatic approval for write tools.
:::

MCP allows external AI applications such as Codex, Claude, and VS Code to access ERD Builder Pro context through standard tools. It is separate from the **AI Assistant** inside ERD Builder Pro: the conversation remains in the external AI client, while ERD Builder Pro provides the permitted data and actions.

## Availability

MCP is available only in:

- the **CLI** application through `erdbpro mcp`;
- the **Desktop** application through `erdbpro mcp --desktop`.

MCP is not available in the Web App, Docker self-host deployment, or through a public HTTP endpoint. The server runs locally over `stdio` and stops when the MCP client closes.

:::info[Local database selection]
`erdbpro mcp` reads the CLI installation data from `~/.erdbpro/data.db`. `erdbpro mcp --desktop` reads the Desktop application's database. These are separate installations and do not automatically share data.
:::

## Prerequisites

1. Update ERD Builder Pro to a release that includes MCP.
2. Open the CLI or Desktop application at least once so its local database and user are created.
3. For the CLI, verify that this command starts from your terminal:

```bash
erdbpro mcp
```

The command uses `stdio`, so it does not show the web interface or open a network port.

## Client configuration

### Codex

Add the server with the Codex CLI:

```bash
codex mcp add erdbpro -- erdbpro mcp
codex mcp list
```

Alternatively, add the following configuration to `~/.codex/config.toml`:

```toml
[mcp_servers.erdbpro]
command = "erdbpro"
args = ["mcp"]
default_tools_approval_mode = "writes"
```

See the [Codex MCP documentation](https://developers.openai.com/codex/mcp/) for more details.

### Claude Desktop

Add this server to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "erdbpro": {
      "command": "erdbpro",
      "args": ["mcp"]
    }
  }
}
```

Save the configuration and restart Claude Desktop. The equivalent Claude Code command is:

```bash
claude mcp add erdbpro -- erdbpro mcp
```

See the [Claude MCP guide](https://docs.anthropic.com/en/docs/mcp) for operating-system-specific configuration locations.

### Visual Studio Code

Create `.vscode/mcp.json` in the workspace or open **MCP: Open User Configuration**, then use:

```json
{
  "servers": {
    "erdbpro": {
      "type": "stdio",
      "command": "erdbpro",
      "args": ["mcp"]
    }
  }
}
```

After saving, run **MCP: List Servers** and start or restart `erdbpro`. See the [VS Code MCP configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration).

### Using Desktop application data

Use the same command with the additional `--desktop` argument:

```json
{
  "command": "erdbpro",
  "args": ["mcp", "--desktop"]
}
```

The launcher detects the Desktop executable in standard macOS, Windows, and Linux installation locations. In development, run the MCP client with the repository root as its working directory to use the Desktop dev database. If the app is installed in a custom location, set `ERDBPRO_DESKTOP_MCP_TARGET` to the Desktop executable path.

## Available tools

| Tool | Access | Purpose |
| --- | --- | --- |
| `workspace_list_files` | Read-only | Lists projects, Notes, Flowcharts, and ERDs. |
| `document_read` | Read-only | Reads one Note, Flowchart, or ERD. |
| `history_list` | Read-only | Lists snapshots stored in `entity_changes`. |
| `history_read` | Read-only | Reads one snapshot without restoring it. |
| `db_list_catalogs` | Read-only | Lists DB Client catalogs without passwords or TLS keys. |
| `db_read_schema` | Read-only | Reads tables, columns, indexes, checks, and foreign keys. |
| `db_query_read_only` | Read-only | Runs one `SELECT`/CTE against PostgreSQL or MySQL. |
| `note_append_propose` | Read-only | Creates a preview of plain text to append to a Note. |
| `note_append_apply` | Write | Applies a confirmed Append proposal. |

Drawings are not included yet. Write access for Flowcharts, ERDs, database structures, and DB Client records is also unavailable.

## Data protection

- MCP never returns database passwords, TLS private keys, or connection credentials to the client.
- DB Client queries run in a forced read-only session, accept only one `SELECT`/CTE, and return no more than 500 rows.
- Notes Append uses two stages: proposal followed by apply with the matching confirmation ID.
- Proposals expire after 10 minutes and are rejected if the Note changes after the preview is created.
- Appended text is escaped before it is stored.
- Before a write is applied, a safety version is stored in `entity_changes` with `mcp` as its source.

:::caution
Tool approval is controlled by the MCP client. Check the Note name, preview, and change contents before approving `note_append_apply`.
:::

## Example prompts

- “List every ERD in this project and explain the tables related to authentication.”
- “Read this PostgreSQL catalog schema and suggest indexes without changing the database.”
- “Read this Note's history and compare its latest two snapshots.”
- “Create a proposal to append the following summary to the documentation Note.”

## Troubleshooting

### `erdbpro: command not found`

Make sure the CLI package is installed globally and the npm binary directory is available on `PATH`:

```bash
npm install -g erdbpro@latest
erdbpro --version
```

### No local user was found

Open the same ERD Builder Pro installation at least once, then restart the MCP client.

### Multiple local users were found

Select the user explicitly by setting `ERDBPRO_MCP_USER_ID` in the MCP client's environment configuration.

### DB Client connection fails

Test the connection from the DB Client panel first. MCP uses the account, TLS mode, safe mode, and timeout stored by the application without exposing those credentials.
