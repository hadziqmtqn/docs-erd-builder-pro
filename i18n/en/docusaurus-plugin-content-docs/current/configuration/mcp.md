---
sidebar_position: 5
slug: /configuration/mcp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Model Context Protocol (MCP)

:::warning[Experimental]
The MCP integration is still **Experimental**. Tool names, input formats, and capability limits may change in later releases. Web MCP is read-only; for local MCP, review every tool call that will write data and do not enable automatic approval for write tools.
:::

MCP lets external AI applications such as Codex, Claude, and VS Code access ERD Builder Pro context through standard tools. This is different from the **AI Assistant** inside ERD Builder Pro: the conversation stays in the external AI client, while ERD Builder Pro provides the permitted data and actions.

## Availability

MCP is available through two separate transports:

- **Local stdio**: CLI through `erdbpro mcp` and Desktop through `erdbpro mcp --desktop`;
- **Web Streamable HTTP**: Web App deployments through the HTTPS URL set by `MCP_PUBLIC_URL`, with the `local` (Pure PostgreSQL) or `supabase` OAuth provider.

Web MCP is disabled by default and cannot be enabled on Desktop or CLI. For a Pure PostgreSQL Web App, use local OAuth; Supabase Auth remains available as an alternative provider. Docker can expose Web MCP as long as it runs the Web App with PostgreSQL and a matching OAuth configuration.

| Capability | Local MCP | Web MCP |
| --- | --- | --- |
| Transport | `stdio` | Streamable HTTP over HTTPS |
| Authentication | Local installation user | OAuth 2.1 with PKCE (`local` or `supabase`) |
| Notes, Flowcharts, regular ERDs | Yes | Yes, read-only |
| Drawings | No | Yes, read-only |
| Search files by name or path (`workspace_search`) | Yes | Yes |
| Find a workspace from a repository folder (`workspace_resolve_repository`) | Yes | No |
| Document history | Read and confirmed restore | Read-only |
| DB Client / `production_db` | Limited read-only | **Not available** |
| Write operations | Specific proposal/apply flows | **Not available** |

## Web MCP (public API) {/* #mcp-web-public-api */}

The Web endpoint follows the [MCP 2026-07-28 authorization specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization). The server publishes OAuth Protected Resource Metadata, returns a Bearer challenge for requests without a token, and validates the issuer, audience, expiry, and `client_id`. Each query can read only the OAuth user's personal documents or documents in Teams where the user's membership is still active; MCP does not accept a Team scope from the client. The endpoint is limited to 60 requests per minute.

In the Web app, **Settings → MCP Integration** shows the **Public MCP Integration** section with the **Public MCP URL (Streamable HTTP)**, which you can copy into the client.

### Choosing the domain

Use one complete canonical URL, including the endpoint path:

```dotenv
# Same domain as the Web App
MCP_PUBLIC_URL=https://app.example.com/api/mcp

# Or a dedicated subdomain
# MCP_PUBLIC_URL=https://mcp.example.com/api/mcp
```

The same domain needs no extra DNS. For a dedicated subdomain, point the subdomain's DNS and reverse proxy to the same ERD Builder Pro backend, enable TLS, preserve the `Host` header, then add the Web App origin to `CORS_ORIGINS`. The request path must exactly match the path in `MCP_PUBLIC_URL`.

:::caution[Canonical URL]
`MCP_PUBLIC_URL` is also the OAuth resource identifier. With the `supabase` provider, this URL must equal the JWT `aud` claim; with the `local` provider, this URL is used to bind the MCP resource and tokens. If the URL, domain, or path changes, reconnect clients so they get new tokens.
:::

### Local OAuth for Pure PostgreSQL

Use the `local` provider for a self-hosted Web App that uses Pure PostgreSQL. This provider stores MCP clients, authorization codes, access tokens, and refresh tokens separately from the app's login sessions.

Set the following server variables, then restart or redeploy:

```dotenv
DATABASE_URL=postgresql://user:password@db:5432/erd_builder_pro
MCP_PUBLIC_URL=https://app.example.com/api/mcp
MCP_AUTH_PROVIDER=local
MCP_CONSENT_URL=https://app.example.com/oauth/consent

# Do not set SUPABASE_URL in this mode.
```

`MCP_CONSENT_URL` can be omitted when you use the default: the origin of `MCP_PUBLIC_URL` with the `/oauth/consent` path. The consent URL must be on the same Web App deployment and use HTTPS. The user must log in to the Web App before approving read-only access.

The local provider accepts only Pure PostgreSQL. It is not active on Desktop/CLI, must not be combined with `SUPABASE_URL`, and does not use `MCP_AUTH_ISSUER_URL`.

### Supabase OAuth (optional)

Use the `supabase` provider if the Web App uses Supabase Auth:

1. In **Supabase Dashboard > Authentication > URL Configuration**, set **Site URL** to the Web App domain that shows the login page.
2. In **Authentication > OAuth Server**, enable OAuth 2.1 and set **Authorization Path** to `/oauth/consent`.
3. Enable **Dynamic Client Registration** if MCP clients will register themselves automatically. If it is disabled, register each client manually.
4. Create a **Custom Access Token Hook** that, for MCP OAuth tokens only, sets the `aud` claim exactly to the value of `MCP_PUBLIC_URL`. Keep all required Supabase claims and use `client_id` to limit the hook to allowed clients. See [Supabase Token Security](https://supabase.com/docs/guides/auth/oauth-server/token-security).
5. Set the server variables and redeploy:

```dotenv
MCP_PUBLIC_URL=https://app.example.com/api/mcp
MCP_AUTH_PROVIDER=supabase
SUPABASE_URL=https://project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key

# Only if Auth uses a custom domain/issuer
# MCP_AUTH_ISSUER_URL=https://auth.example.com/auth/v1
```

The `/oauth/consent` page uses the existing Web App session. If the user is not logged in, the app shows the login page without discarding `authorization_id`; after logging in, the user returns to the consent page to approve or deny access.

For details on dashboard settings and client registration, see [Supabase OAuth 2.1 Getting Started](https://supabase.com/docs/guides/auth/oauth-server/getting-started).

### Verifying the deployment

For the `/api/mcp` endpoint, the metadata is at:

```bash
curl https://app.example.com/.well-known/oauth-protected-resource/api/mcp
```

The response must contain a `resource` that exactly matches `MCP_PUBLIC_URL`. With the `local` provider, `authorization_servers` uses the Web App root domain; with the `supabase` provider, the value points to the Supabase issuer. An MCP request without a token must be rejected with `401` and a `WWW-Authenticate` header:

```bash
curl -i -X POST https://app.example.com/api/mcp \
  -H 'Content-Type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2026-07-28","capabilities":{},"clientInfo":{"name":"check","version":"1"}}}'
```

In an MCP client that supports remote OAuth, add the URL `https://app.example.com/api/mcp`. The client discovers the issuer, runs OAuth Authorization Code + PKCE, opens the ERD Builder Pro consent page, then stores the access/refresh tokens according to that client's policy.

### Web MCP tools

| Tool | Purpose |
| --- | --- |
| `workspace_list_files` | Lists active projects, Notes, Flowcharts, Drawings, and regular ERDs. |
| `workspace_search` | Searches projects or files by name or path. |
| `document_read` | Reads one permitted Web App document. |
| `history_list` | Lists history revisions of a permitted document. |
| `history_read` | Reads one revision without restoring it. |

Web MCP does not register tools for DB Client, database connections, SQL queries, credentials, the filesystem, trash, restore, append, or any other write. Diagrams with `source_type=production_db` are filtered out of lists and rejected when requested directly.

## Local MCP (CLI and Desktop)

:::info[Local database in use]
`erdbpro mcp` reads the CLI installation data in `~/.erdbpro/data.db`. `erdbpro mcp --desktop` reads the Desktop app's database. They are separate installations and do not share data automatically.
:::

### Preparation by OS

1. Update ERD Builder Pro to a version that includes MCP.
2. Open the CLI or Desktop app at least once so that the local database and user are created.
3. Select your OS tab to see the installation steps. Once the app is running, the client configuration is generated from **Settings → MCP Integration**.

<Tabs>
  <TabItem value="macos" label="macOS" default>

#### CLI

```bash
npm install -g erdbpro@latest
erdbpro --version
```

Install Desktop from the `.dmg` release, open the app once, then use **Settings → MCP Integration**. Do not copy the `.app` path or the `--mcp` argument manually; that panel provides the correct launcher for the active installation.

  </TabItem>
  <TabItem value="windows" label="Windows">

#### CLI

```powershell
npm install -g erdbpro@latest
erdbpro --version
```

Install Desktop from the `.msi` release, open the app once, then use **Settings → MCP Integration**. Do not copy the `.exe` path or the `--mcp` argument manually; that panel provides the correct launcher and Windows escaping.

  </TabItem>
  <TabItem value="linux" label="Linux">

#### CLI

```bash
npm install -g erdbpro@latest
erdbpro --version
```

Install Desktop from the `.deb` release, open the app once, then use **Settings → MCP Integration**. Do not copy the executable path or the `--mcp` argument manually; that panel provides the correct launcher and POSIX escaping.

  </TabItem>
</Tabs>

The `erdbpro mcp` command uses `stdio`, so it does not show a web interface or open a network port.

### Configuration from the Desktop or CLI app

In the Desktop or CLI app, open **Settings → MCP Integration**. The **Connect AI Clients** section shows the `stdio` launcher for the active installation and provides ready-to-copy configurations for:

- JetBrains AI;
- VS Code;
- Codex;
- Hermes Agent; and
- generic MCP clients that support `stdio`.

Select a client, click **Copy**, then paste the configuration into the AI client. `command` and `args` are generated from the active runtime, so do not replace them with a fixed example. On Windows, the Codex command uses Windows escaping; on macOS/Linux, it uses POSIX quoting. Use only one configuration per AI client so that it does not run two identical local MCP servers.

### Client configuration

#### Codex

Select the **Codex** tab, click **Copy**, then run the displayed command once in a terminal. The command already contains the correct runtime command and args for the OS and the active Desktop/CLI installation. Then verify with:

```bash
codex mcp list
```

See also the [Codex MCP documentation](https://developers.openai.com/codex/mcp/).

#### JetBrains AI

Open **Settings → Tools → AI Assistant → Model Context Protocol (MCP)**, then copy the output from the **JetBrains AI** tab into the JetBrains JSON configuration. Do not replace the command or args with `erdbpro mcp`.

See also the [JetBrains MCP documentation](https://www.jetbrains.com/help/ai-assistant/mcp.html).

#### Visual Studio Code

Create `.vscode/mcp.json` in the workspace or open **MCP: Open User Configuration**, then paste the output from the **VS Code** tab. That output already uses the `servers` format and `type: "stdio"` that VS Code requires.

After saving, run **MCP: List Servers**, then start or restart the `erdbpro` server. See the [VS Code MCP configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration).

#### Hermes Agent

Select the **Hermes Agent** tab, then fill in the **Add MCP Server** dialog with the displayed values:

- **Name**: `erdbpro`;
- **Transport**: `stdio`;
- **Command**: the `Command` value from the panel;
- **Args**: the `Args` value from the panel; and
- **Environment**: empty.

Do not replace these values with an old command. If `Args` shows `(leave empty)`, leave the args field empty.

#### Generic MCP (STDIO)

For other agents that accept a standard MCP configuration, select the **Generic MCP (STDIO)** tab and paste the generated JSON. Use the command and args exactly as shown in the panel.

After the connection succeeds, test it with a read-only request such as “list my Desktop projects and documents.”

### Available local tools

| Tool | Access | Purpose |
| --- | --- | --- |
| `workspace_list_files` | Read-only | Lists projects, Notes, Flowcharts, and ERDs. |
| `workspace_search` | Read-only | Searches projects or files by name or path. |
| `workspace_resolve_repository` | Read-only | Finds the workspace linked to the repository folder the AI client is working in. |
| `document_read` | Read-only | Reads one Note, Flowchart, or ERD. |
| `history_list` | Read-only | Lists snapshots in `entity_changes`. |
| `history_read` | Read-only | Reads one snapshot without restoring it. |
| `history_restore_propose` | Read-only | Creates a restore preview from a snapshot. |
| `history_restore_apply` | Write | Applies a confirmed snapshot restore. |
| `db_list_catalogs` | Read-only | Lists DB Client catalogs without passwords or TLS keys. |
| `db_read_schema` | Read-only | Reads tables, columns, indexes, checks, and foreign keys. |
| `db_query_read_only` | Read-only | Runs one `SELECT`/CTE on PostgreSQL or MySQL. |
| `note_append_propose` | Read-only | Creates a preview of text to append to a Note. |
| `note_append_apply` | Write | Applies a confirmed Append proposal. |

Drawings are not yet included in local MCP. Writes for Flowcharts, ERDs, database structures, and DB Client records are also not yet available.

### Searching files and workspaces

`workspace_search` is available in local and Web MCP. The AI client can search by name or path, for example `Backend > Notes > Business Rules`, then read the result with `document_read`.

| Parameter | Description |
| --- | --- |
| `query` | Name or path keyword, 1–500 characters. |
| `type` | Optional: `projects`, `notes`, `flowcharts`, `drawings`, `diagrams`, or `db_clients` (local only). |
| `limit` | Optional, 1–50. Default 20. |

Results include `type`, `uid`, `name`, `path`, `project_uid`, and `updated_at`.

`workspace_resolve_repository` is available only in local MCP. It accepts `repository_path`, the repository folder or subfolder the AI client is working in. The tool matches it against the ERDs linked to a repository through the [Git Repository](../core-features/git-repository.md) panel, then returns the repository information, the project, the linked ERDs, and that workspace's file list.

### Local data protection

- MCP does not send database passwords, TLS private keys, or connection credentials to the client.
- DB Client queries are forced into a read-only session, accept only one `SELECT`/CTE, and return at most 500 rows.
- Notes Append uses two steps: a proposal, then apply with the same confirmation ID.
- Proposals expire after 10 minutes and are rejected if the Note changed after the preview was created.
- Appended text is escaped before it is saved.
- Before an append or restore is applied, a safety version is saved to `entity_changes` with the source `mcp` or `restore`.

:::caution
Tool approval is still controlled by the MCP client. Check the document name, the preview, and the change contents before approving `note_append_apply` or `history_restore_apply`.
:::

## Usage examples

- “List all ERDs in this project and explain the tables related to authentication.”
- “Read the schema of this PostgreSQL catalog and suggest indexes without changing the database.”
- “Read this Note's history and compare the last two snapshots.”
- “Create a proposal to restore this ERD to a specific snapshot, then show the preview without applying it.”
- “Create a proposal to append the following summary to the documentation Note.”
- “Through Web MCP, read the Drawings in this project without changing the workspace.”

## Troubleshooting

### `erdbpro: command not found`

Make sure the CLI package is installed globally and the npm binary directory is on `PATH`:

```bash
npm install -g erdbpro@latest
erdbpro --version
```

### Local user not found

Open the same ERD Builder Pro installation at least once, then restart the MCP client.

### Multiple local users

Set the user explicitly through the `ERDBPRO_MCP_USER_ID` environment variable in the client's MCP configuration.

### DB Client connection fails

Test the connection from the DB Client panel first. MCP uses the account, TLS mode, safe mode, and timeout saved in the app without exposing those credentials.

### Web MCP always returns `401`

Make sure `MCP_PUBLIC_URL` exactly matches the URL entered in the client, including the `/api/mcp` path, and reconnect the client after changing it. For `MCP_AUTH_PROVIDER=local`, make sure `DATABASE_URL` is Pure PostgreSQL, `SUPABASE_URL` is not set, and the consent was approved by the correct Web App user. For `MCP_AUTH_PROVIDER=supabase`, the token must have an `iss` equal to `MCP_AUTH_ISSUER_URL` (or `${SUPABASE_URL}/auth/v1`), a `client_id` claim, an `exp` claim, and an `aud` claim that exactly matches `MCP_PUBLIC_URL`. A regular Web App session token has a different audience and is rejected on purpose.

### OAuth metadata not found

Make sure the reverse proxy forwards the `/.well-known/oauth-protected-resource/...` path to the same backend. For `MCP_PUBLIC_URL=https://mcp.example.com/api/mcp`, the metadata path is `/.well-known/oauth-protected-resource/api/mcp` on the host `mcp.example.com`.
