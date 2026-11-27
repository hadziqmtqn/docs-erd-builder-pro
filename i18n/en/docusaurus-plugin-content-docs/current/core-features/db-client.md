---
sidebar_position: 10
slug: /core-features/db-client
---
# DB Client (Desktop & CLI)

**DB Client** opens a database that is already running, such as a development or staging database, directly from ERD Builder Pro: view data, run read-only queries, and read the schema into an ERD.

:::info Desktop and CLI only
DB Client is only available in the [Desktop app](../getting-started/desktop-app.md) and the [CLI](../getting-started/cli.md). Self-host Web and Cloud do not provide it, because the web server must not store credentials or reach office databases. This feature is still labeled **Experimental**.
:::

## Supported Databases

- PostgreSQL
- MySQL
- SQLite

## Creating a Connection

1. Open the Project page, then click **Database connections**. The **Database Accounts** panel opens. In the new file dialog, the button is named **Open database connections**.
2. Click **New DB Client**. In the **New Server Account** dialog, choose the **Database Type** (PostgreSQL, MySQL, or SQLite) and fill in **Server Name**.
   - **PostgreSQL and MySQL**: fill in Host, Port, User, and Password.
   - **SQLite**: fill in the database file path (or click **Choose**), the name of the ERD to create, and the target Project.
3. Set the connection security:

| Setting | Options | Default |
| :--- | :--- | :--- |
| **Environment** | Local, Development, Staging, Production | Development |
| **Safe Mode** | Normal, Protected, Read-only | Protected |
| **TLS / SSL** | Disable, Require, Verify CA, Verify Full, plus file paths for the CA, client certificate, and private key | Disable |
| **Query timeout (ms)** | 1,000–600,000 | 30,000 |

4. Click **Test Connection**, then **Create**.
5. For PostgreSQL and MySQL, pick a database in the **Create DB Client** dialog, name the ERD and choose its Project, then confirm. For SQLite, the file's schema is imported right away, for example *Imported 4 tables as "Demo Shop Schema"*.

![DB Client in ERD mode](/img/core-features/db-client-erd.png)

- **Read-only** rejects all data and structure changes.
- In the **Production** environment or in **Protected** Safe Mode, destructive actions ask you to type the table name to confirm.
- Passwords and keys are stored encrypted in the local Desktop/CLI database.

DB Client files appear in the Project's **DB Client** tab, the dashboard filter, the Search filter, and Trash.

## View Modes

DB Client has three modes:

### Data
- Shows table contents, 50 rows per page (maximum 200).
- Editing a record requires a primary key. Records in SQLite catalogs cannot be edited from DB Client.
- Table structure can be edited, and the structure SQL can be exported or imported.
- Listing and creating databases is available for PostgreSQL and MySQL.

### ERD
Shows the database schema as a **read-only** ERD: *Schema is read-only. Layout changes do not modify the database.* Use **Sync** to reread the schema and **Export SVG** to download it as an image. A catalog schema can also be imported into a regular ERD.

### Query
- Buttons: **Run**/**Stop**, **Explain**, **Save**, and **Export** to JSON or CSV.
- Only one `SELECT` or `WITH` statement per run, always executed as a read-only transaction.
- Available for PostgreSQL and MySQL.
- Results are limited to 500 rows; truncated results are marked.
- A running query can be stopped.

Queries can be saved with a name and a group (default **Ungrouped**).

## AI and MCP

- AI Assistant in DB Client has **DB Client tools**: Explain Table, Analyze Query, Generate Query, Suggest Indexes, and Find Schema Issues. See [AI Assistant](./ai-integration.md).
- External AI clients can read catalogs and schemas and run read-only queries through local MCP (`db_list_catalogs`, `db_read_schema`, `db_query_read_only`) without receiving passwords. See [MCP](../configuration/mcp.md).
