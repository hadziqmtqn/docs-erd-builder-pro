---
sidebar_position: 1
slug: /core-features/erd-builder
---
# ERD Builder

ERD Builder is the core feature for designing database schemas visually with *drag-and-drop*. The same schema can be edited with [DBML](./dbml-editor.md), populated from [Import SQL](./import-sql.md), and exported to SQL and code with [Export Schema & Code](./sql-generator.md).

## Toolbar

The floating toolbar sits at the top left of the canvas (vertical on desktop, horizontal on small screens):

| Button | Function |
| :--- | :--- |
| **Explorer** (`⇧⌘F` / `Ctrl+Shift+F`) | Panel that lists tables and relationships, with search. |
| **Add Table** | Adds a new table in the center of the screen. |
| **Import SQL** | Creates or updates tables from SQL. See [Import SQL](./import-sql.md). |
| **DBML** | Opens the DBML editor at the bottom of the canvas. See [DBML Editor](./dbml-editor.md). |
| **Repository** | Desktop and CLI: compares the ERD with the schema in a Git repository. See [Git Repository](./git-repository.md). |
| **Auto Layout** | Rearranges table positions. |
| **Undo** (`⌘Z` / `Ctrl+Z`) and **Redo** (`⇧⌘Z` / `Ctrl+Y`) | Undoes or redoes changes. |

Zoom and *fit view* controls are at the bottom left of the canvas. Users with read-only access do not see the buttons that change the diagram.

## Creating a Table

1. Click **Add Table**. A table named `NewTable` (or `NewTable_1`, `NewTable_2`, and so on) appears with one `id` column of type `INT` as the primary key.
2. Double-click the table to open the table editor. The editor has the **Properties**, **Schema** (the table's code in several formats), and **DBML** (read-only) tabs.
3. Press `Esc` to close the table editor.

The table menu contains **Edit**, **Duplicate**, **Comment** (Team only), and **Delete Table**. Right-clicking a table also shows **Delete**.

## Configuring Columns
Each column supports the following properties:
- **Primary Key (PK)**: unique row identifier.
- **Data Type**: the data type that matches your database.
- **Constraints**: `not null`, `unique`, and a `default` value.

### Supported Data Types

| Category | Data Type | Database |
| :--- | :--- | :--- |
| **Numeric** | `INT`, `BIGINT`, `SMALLINT`, `TINYINT`, `MEDIUMINT`, `DECIMAL`, `NUMERIC`, `FLOAT`, `DOUBLE`, `REAL` | MySQL / PostgreSQL |
| | `INTEGER`, `SERIAL`, `BIGSERIAL`, `SMALLSERIAL`, `MONEY` | PostgreSQL |
| **String** | `VARCHAR`, `CHAR`, `TEXT` | MySQL / PostgreSQL |
| | `TINYTEXT`, `MEDIUMTEXT`, `LONGTEXT` | MySQL |
| **Date & Time** | `DATE`, `TIME`, `DATETIME`, `TIMESTAMP`, `YEAR` | MySQL / PostgreSQL |
| | `TIMESTAMPTZ`, `TIMETZ`, `INTERVAL` | PostgreSQL |
| **Boolean** | `BOOLEAN` | MySQL / PostgreSQL |
| **Binary/Blob** | `BINARY`, `VARBINARY`, `BLOB`, `TINYBLOB`, `MEDIUMBLOB`, `LONGBLOB` | MySQL |
| | `BYTEA` | PostgreSQL |
| **Identity & Special** | `BIT`, `ENUM`, `JSON` | MySQL / PostgreSQL |
| | `UUID`, `ULID`, `JSONB` | PostgreSQL |
| **Network & Search** | `INET`, `CIDR`, `MACADDR`, `MACADDR8`, `TSVECTOR`, `TSQUERY` | PostgreSQL |

## Creating Relationships

1. Hover over one of the connection points (*handles*) on the sides of a column. Each column has four handles.
2. Drag a line to a column in the target table. The new relationship is labeled `1:N`.
3. Click the relationship line, or the ✎ icon in Explorer, to set **Relationship Cardinality** (`1:1`, `1:N`, `N:M`) and **Foreign Key Actions** (*On delete* and *On update*).

The app rejects a relationship when:
- the two columns have different types (**Type Mismatch**);
- the same relationship already exists (**Relation already exists**);
- the foreign key column is already connected to another primary key (**FK already related**).

## Explorer

The **Explorer** panel has **Tables** and **Relationships** tabs, each with a search box. Click an item to select it on the canvas.

## Auto Layout

Click **Auto Layout** to arrange tables from left to right: referenced tables go on the left and referencing tables on the right. Groups of tables that are not connected to each other are stacked separately. The result is saved and can be reverted with **Undo**.

## Editing with DBML

Click **DBML** in the toolbar to open the text editor at the bottom of the canvas. Changes apply in both directions: edits on the canvas update the DBML, and valid DBML updates the canvas.

```dbml
Table users {
  id integer [pk, increment]
  name varchar [not null]
  email varchar [unique]
}

Ref: posts.user_id > users.id
```

See [DBML Editor](./dbml-editor.md) for the full guide.

## Collaboration and History

- In a Team Workspace, members can comment on tables and relationships. See [Comments & Discussions](../collaboration/comments-discussions.md).
- Every saved change can be viewed and restored from [Version History](../collaboration/version-history.md).

## Export Diagram

Open the **Actions** menu (⋯) in the header, then **Export All**:
- **Export Schemas** for SQL and code. See [Export Schema & Code](./sql-generator.md).
- **Download SVG** for an image of the diagram in the theme currently in use.
