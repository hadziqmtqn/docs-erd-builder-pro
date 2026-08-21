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
3. Select your operating system tab for installation steps. Once the app is running, generate client configuration from **Settings → MCP Integration**.

<Tabs>
  <TabItem value="macos" label="macOS" default>

#### CLI

```bash
npm install -g erdbpro@latest
erdbpro --version
```

Install Desktop from the `.dmg` release, open it once, then use **Settings → MCP Integration**. Do not copy the `.app` path or `--mcp` argument manually; the panel provides the correct launcher for the active installation.

  </TabItem>
  <TabItem value="windows" label="Windows">

#### CLI

```powershell
npm install -g erdbpro@latest
erdbpro --version
```

Install Desktop from the `.msi` release, open it once, then use **Settings → MCP Integration**. Do not copy the `.exe` path or `--mcp` argument manually; the panel provides the launcher and correct Windows escaping.

  </TabItem>
  <TabItem value="linux" label="Linux">

#### CLI

```bash
npm install -g erdbpro@latest
erdbpro --version
```

Install Desktop from the `.deb` release, open it once, then use **Settings → MCP Integration**. Do not copy an executable path or `--mcp` argument manually; the panel provides the launcher and correct POSIX escaping.

  </TabItem>
</Tabs>

The `erdbpro mcp` command uses `stdio`, so it does not show the web interface or open a network port.

### Configure from the Desktop or CLI app

In the Desktop or CLI app, open **Settings → MCP Integration**. This page shows the `stdio` launcher for the active installation and provides ready-to-copy configurations for:

- JetBrains AI;
- VS Code;
- Codex;
- Hermes Agent; and
- generic MCP clients that support `stdio`.

Choose a client, click **Copy**, and paste the configuration into the AI client. `command` and `args` come from the active runtime and must not be replaced with a fixed example. On Windows, the Codex command uses Windows escaping; on macOS/Linux, it uses POSIX quoting. Use only one configuration in each AI client so it does not start two identical local MCP servers.

### Client configuration

#### Codex

Select the **Codex** tab, click **Copy**, and run the displayed command once in a terminal. It already contains the correct runtime command and arguments for the active OS and Desktop/CLI installation. Then verify it with:

```bash
codex mcp list
```

See the [Codex MCP documentation](https://developers.openai.com/codex/mcp/) for more details.

#### JetBrains AI

Open **Settings → Tools → AI Assistant → Model Context Protocol (MCP)**, then copy the output from the **JetBrains AI** tab into JetBrains' JSON server configuration. Do not replace the command or arguments with `erdbpro mcp`.

See the [JetBrains MCP documentation](https://www.jetbrains.com/help/ai-assistant/mcp.html) as well.

#### Visual Studio Code

Create `.vscode/mcp.json` in the workspace or open **MCP: Open User Configuration**, then paste the output from the **VS Code** tab. It already uses the `servers` format and `type: "stdio"` required by VS Code.

After saving, run **MCP: List Servers**, then start or restart the `erdbpro` server. See the [VS Code MCP configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration).

#### Hermes Agent

Select the **Hermes Agent** tab, then fill the **Add MCP Server** dialog with the displayed values:

- **Name**: `erdbpro`;
- **Transport**: `stdio`;
- **Command**: the `Command` value from the panel;
- **Args**: the `Args` value from the panel; and
- **Environment**: empty.

Do not replace these values with the old command. If `Args` shows `(leave empty)`, leave the args field empty.

#### Generic MCP (STDIO)

For other agents that accept a standard MCP configuration, select the **Generic MCP (STDIO)** tab and paste the generated JSON. Use the command and arguments exactly as shown in the panel.

After connecting, test with a read-only request such as “list my Desktop projects and documents.”

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
