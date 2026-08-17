---
sidebar_position: 5
slug: /configuration/mcp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Model Context Protocol (MCP)

:::warning[Experimental]
The MCP integration is still **Experimental**. Tool names, input formats, and capability limits may change in later releases. Web MCP is read-only; for local MCP, review every tool call that writes data and do not enable automatic approval for write tools.
:::

MCP allows external AI applications such as Codex, Claude, and VS Code to access ERD Builder Pro context through standard tools. It is separate from the **AI Assistant** inside ERD Builder Pro: the conversation remains in the external AI client, while ERD Builder Pro provides the permitted data and actions.

## Availability

MCP is available through two separate transports:

- **Local stdio**: CLI through `erdbpro mcp` and Desktop through `erdbpro mcp --desktop`;
- **Web Streamable HTTP**: Supabase-authenticated Web App deployments at the HTTPS URL configured in `MCP_PUBLIC_URL`.

Web MCP is disabled by default and cannot be enabled for Desktop, CLI, or Local PostgreSQL-authenticated Web Apps. Docker may expose Web MCP only when it runs the Supabase Web mode and satisfies the OAuth configuration below.

| Capability | Local MCP | Web MCP |
| --- | --- | --- |
| Transport | `stdio` | Streamable HTTP over HTTPS |
| Authentication | Local installation user | Supabase OAuth 2.1 with PKCE |
| Notes, Flowcharts, Drawings, regular ERDs | Yes | Yes, read-only |
| Document history | Read and confirmed restore | Read-only |
| DB Client / `production_db` | Limited read-only access | **Unavailable** |
| Write operations | Selected propose/apply flows | **Unavailable** |

## Web MCP (public API)

The Web endpoint follows the [MCP 2026-07-28 authorization specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization). It publishes OAuth Protected Resource Metadata, returns a Bearer challenge for unauthenticated requests, validates issuer, audience, expiry, and `client_id`, then scopes every query to the authenticated OAuth user's data.

### Choose the domain

Set one complete canonical URL, including the endpoint path:

```dotenv
# Same domain as the Web App
MCP_PUBLIC_URL=https://app.example.com/api/mcp

# Or a dedicated subdomain
# MCP_PUBLIC_URL=https://mcp.example.com/api/mcp
```

The same-domain option needs no extra DNS. For a dedicated subdomain, point DNS and the reverse proxy to the same ERD Builder Pro backend, enable TLS, preserve the `Host` header, and add the Web App origin to `CORS_ORIGINS`. The request path must exactly match the path in `MCP_PUBLIC_URL`.

:::caution[Canonical URL]
`MCP_PUBLIC_URL` is also the OAuth resource identifier and the required JWT `aud` claim. If its URL, domain, or path changes, update the audience hook and reconnect clients so they obtain new tokens.
:::

### Enable Supabase OAuth

1. In **Supabase Dashboard > Authentication > URL Configuration**, set **Site URL** to the Web App domain that displays the login page.
2. In **Authentication > OAuth Server**, enable OAuth 2.1 and set **Authorization Path** to `/oauth/consent`.
3. Enable **Dynamic Client Registration** when MCP clients should register themselves automatically. Otherwise, register each client manually.
4. Create a **Custom Access Token Hook** that sets the `aud` claim of MCP OAuth tokens exactly to `MCP_PUBLIC_URL`. Preserve every required Supabase claim and use `client_id` to limit the hook to allowed clients. See [Supabase Token Security](https://supabase.com/docs/guides/auth/oauth-server/token-security).
5. Set the server variables and redeploy:

```dotenv
MCP_PUBLIC_URL=https://app.example.com/api/mcp
SUPABASE_URL=https://project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Only when Auth uses a custom domain/issuer
# MCP_AUTH_ISSUER_URL=https://auth.example.com/auth/v1
```

The `/oauth/consent` page uses the existing Web App session. If the user is not logged in, the app shows login without discarding `authorization_id`; after login the user returns to the consent page to approve or deny access.

For dashboard setup and client registration details, see [Supabase OAuth 2.1 Getting Started](https://supabase.com/docs/guides/auth/oauth-server/getting-started).

### Verify the deployment

For an `/api/mcp` endpoint, metadata is served at:

```bash
curl https://app.example.com/.well-known/oauth-protected-resource/api/mcp
```

The response must contain a `resource` exactly matching `MCP_PUBLIC_URL` and `authorization_servers` pointing to the Supabase issuer. An MCP request without a token must return `401` with a `WWW-Authenticate` header:

```bash
curl -i -X POST https://app.example.com/api/mcp \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2026-07-28","capabilities":{},"clientInfo":{"name":"check","version":"1"}}}'
```

In a remote OAuth-capable MCP client, add `https://app.example.com/api/mcp`. The client discovers the issuer, runs OAuth Authorization Code + PKCE, opens the ERD Builder Pro consent page, and stores access/refresh tokens according to that client's policy.

### Web MCP tools

| Tool | Purpose |
| --- | --- |
| `workspace_list_files` | Lists active projects, Notes, Flowcharts, Drawings, and regular ERDs. |
| `document_read` | Reads one permitted Web App document. |
| `history_list` | Lists history revisions for a permitted document. |
| `history_read` | Reads one revision without restoring it. |

Web MCP does not register tools for DB Client, database connections, SQL queries, credentials, the filesystem, trash, restore, append, or any other write. Diagrams with `source_type=production_db` are filtered from lists and rejected when requested directly.

## Local MCP (CLI and Desktop)

:::info[Local database selection]
`erdbpro mcp` reads the CLI installation data from `~/.erdbpro/data.db`. `erdbpro mcp --desktop` reads the Desktop application's database. These are separate installations and do not automatically share data.
:::

### Prerequisites by operating system

1. Update ERD Builder Pro to a release that includes MCP.
2. Open the CLI or Desktop application at least once so its local database and user are created.
3. Select your operating system tab to see the CLI installation command and Desktop executable location.

<Tabs>
  <TabItem value="macos" label="macOS" default>

#### CLI

```bash
npm install -g erdbpro@latest
erdbpro --version
```

The Desktop production executable is usually located at:

```text
/Applications/ERD Builder Pro.app/Contents/MacOS/ERD Builder Pro
```

Direct Desktop configuration:

```json
{
  "command": "/Applications/ERD Builder Pro.app/Contents/MacOS/ERD Builder Pro",
  "args": ["--mcp"]
}
```

If the application is installed elsewhere, use its actual executable path.

  </TabItem>
  <TabItem value="windows" label="Windows">

#### CLI

```powershell
npm install -g erdbpro@latest
erdbpro --version
```

The Desktop production executable is usually located in one of these paths:

```text
C:\Program Files\ERD Builder Pro\ERD Builder Pro.exe
C:\Users\<username>\AppData\Local\Programs\ERD Builder Pro\ERD Builder Pro.exe
```

Example direct Desktop configuration:

```json
{
  "command": "C:\\Program Files\\ERD Builder Pro\\ERD Builder Pro.exe",
  "args": ["--mcp"]
}
```

Adjust `command` to the actual installation path.

  </TabItem>
  <TabItem value="linux" label="Linux">

#### CLI

```bash
npm install -g erdbpro@latest
erdbpro --version
```

The Desktop production executable is usually located in one of these paths:

```text
/usr/bin/erd-builder-pro
/usr/local/bin/erd-builder-pro
/opt/ERD Builder Pro/ERD Builder Pro
```

Example direct Desktop configuration:

```json
{
  "command": "/usr/bin/erd-builder-pro",
  "args": ["--mcp"]
}
```

Adjust `command` to the actual executable path.

  </TabItem>
</Tabs>

The `erdbpro mcp` command uses `stdio`, so it does not show the web interface or open a network port.

### Client configuration

#### Codex

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

#### Claude Desktop

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

#### Visual Studio Code

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

#### Using Desktop application data through the CLI

Use the CLI launcher with the additional `--desktop` argument:

```json
{
  "command": "erdbpro",
  "args": ["mcp", "--desktop"]
}
```

The launcher detects the Desktop executable in standard macOS, Windows, and Linux installation locations. In development, run the MCP client with the repository root as its working directory to use the Desktop dev database. If the app is installed in a custom location, set `ERDBPRO_DESKTOP_MCP_TARGET` to the Desktop executable path.

#### JetBrains AI Assistant (including Codex)

JetBrains AI Assistant supports local MCP through the `stdio` transport. Open **Settings > Tools > AI Assistant > Model Context Protocol (MCP)**, click **Add**, select **STDIO**, and use one of the configurations below. See the [JetBrains MCP documentation](https://www.jetbrains.com/help/ai-assistant/mcp.html) as well.

Choose **exactly one** option. Both options expose the same local tools; enabling both adds no capability and can make JetBrains start two MCP processes with the same tool names and Desktop database.

##### Option A — CLI launcher for Desktop data

Use this option when the npm CLI package is installed:

```bash
npm install -g erdbpro@latest
erdbpro --version
```

JetBrains configuration:

```json
{
  "mcpServers": {
    "erdbpro-desktop": {
      "command": "erdbpro",
      "args": ["mcp", "--desktop"]
    }
  }
}
```

`erdbpro mcp --desktop` is a launcher that detects the Desktop application. If the client's working directory is the repository root and contains `src-tauri/tauri.conf.json` and `dist-server/mcp.js`, the launcher can select the Desktop development database `data.db`. Do not use the repository root as the working directory when you intend to use the installed Desktop production database; use Option B for an explicit production target.

##### Option B — direct Desktop production executable

This option does not require the npm CLI. Use the configuration in the operating-system tab under [Prerequisites by operating system](#prerequisites-by-operating-system). The executable path and JSON examples for macOS, Windows, and Linux are provided there.

The argument must be `--mcp`, not `mcp`. The Desktop binary enters MCP mode only when it receives this flag.

:::warning[Do not enable both options]
If both servers are present in the JetBrains list, disable or remove one of them, then click **Apply** or **Reconnect** and restart AI Assistant. Enabling both launchers can cause two servers to register `workspace_list_files`, `document_read`, `history_list`, and the other local tools with the same names.
:::

After connecting, click the icon in the **Status** column to review the available tools. Test with a read-only request such as “list my Desktop projects and documents.”

### Available local tools

| Tool | Access | Purpose |
| --- | --- | --- |
| `workspace_list_files` | Read-only | Lists projects, Notes, Flowcharts, and ERDs. |
| `document_read` | Read-only | Reads one Note, Flowchart, or ERD. |
| `history_list` | Read-only | Lists snapshots stored in `entity_changes`. |
| `history_read` | Read-only | Reads one snapshot without restoring it. |
| `history_restore_propose` | Read-only | Creates a preview for restoring a snapshot. |
| `history_restore_apply` | Write | Applies a confirmed snapshot restore. |
| `db_list_catalogs` | Read-only | Lists DB Client catalogs without passwords or TLS keys. |
| `db_read_schema` | Read-only | Reads tables, columns, indexes, checks, and foreign keys. |
| `db_query_read_only` | Read-only | Runs one `SELECT`/CTE against PostgreSQL or MySQL. |
| `note_append_propose` | Read-only | Creates a preview of plain text to append to a Note. |
| `note_append_apply` | Write | Applies a confirmed Append proposal. |

Drawings are not included yet. Write access for Flowcharts, ERDs, database structures, and DB Client records is also unavailable.

### Local data protection

- MCP never returns database passwords, TLS private keys, or connection credentials to the client.
- DB Client queries run in a forced read-only session, accept only one `SELECT`/CTE, and return no more than 500 rows.
- Notes Append uses two stages: proposal followed by apply with the matching confirmation ID.
- Proposals expire after 10 minutes and are rejected if the Note changes after the preview is created.
- Appended text is escaped before it is stored.
- Before an append or restore is applied, a safety version is stored in `entity_changes` with `mcp` or `restore` as its source.

:::caution
Tool approval is controlled by the MCP client. Check the document name, preview, and change contents before approving `note_append_apply` or `history_restore_apply`.
:::

## Example prompts

- “List every ERD in this project and explain the tables related to authentication.”
- “Read this PostgreSQL catalog schema and suggest indexes without changing the database.”
- “Read this Note's history and compare its latest two snapshots.”
- “Create a proposal to restore this ERD to a specific snapshot, then show me the preview without applying it.”
- “Create a proposal to append the following summary to the documentation Note.”
- “Through Web MCP, read the Drawings in this project without changing the workspace.”

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

### Web MCP always returns `401`

Verify that the token has an `iss` matching `MCP_AUTH_ISSUER_URL` (or `${SUPABASE_URL}/auth/v1`), a `client_id` claim, an `exp` claim, and an `aud` claim exactly matching `MCP_PUBLIC_URL`. A regular Web App session token has a different audience and is intentionally rejected.

### OAuth metadata is not found

Ensure the reverse proxy forwards `/.well-known/oauth-protected-resource/...` to the same backend. For `MCP_PUBLIC_URL=https://mcp.example.com/api/mcp`, the metadata path is `/.well-known/oauth-protected-resource/api/mcp` on `mcp.example.com`.
