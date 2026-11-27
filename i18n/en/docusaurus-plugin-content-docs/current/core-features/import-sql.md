---
sidebar_position: 3
slug: /core-features/import-sql
---
# Import SQL

**Import SQL** creates tables in the ERD from `CREATE TABLE` statements (*reverse engineering*). It is useful for visualizing an existing database.

## How to Import

1. Open an ERD diagram, then click **Import SQL** in the canvas toolbar.
2. In the **Import SQL (Reverse Engineering)** dialog, paste the SQL into **SQL Schema Editor**, or click **Upload .sql File**.
3. Click **Import SQL**. The button shows **Parsing...** while the SQL is processed.

The supported syntax is **PostgreSQL** and **MySQL**. End each statement with a semicolon (`;`).

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  title VARCHAR(200)
);
```

## How Results Are Merged

Import SQL **adds and updates**; it never deletes existing tables or columns.

- **Tables with the same name and different columns**: a review step appears that shows new columns, changed columns, and **New Tables**. Click **Apply Changes** to apply them or **Cancel** to cancel.
- **No column differences**: the tables are added directly. If a table name is already taken, the new table is named `<name>_imported_N`. Importing the same SQL twice duplicates the tables.
- **Foreign keys** become relationships on the canvas.

When it finishes, the message *Success! N table(s) updated, M table(s) added.* appears. The import can be undone with **Undo**.

## Limits and Error Messages

| Message | Meaning |
| :--- | :--- |
| *Invalid file format. Please upload a .sql file.* | Only `.sql` files are accepted. |
| *No valid CREATE TABLE statements found.* | The SQL contains no `CREATE TABLE`. SQL that contains only `ALTER TABLE` cannot be imported. |
| *Failed to parse SQL. Check your syntax.* | The syntax cannot be parsed. Check the dialect and semicolons, or import it in parts. |

The **Import SQL** button is not shown to users with read-only access.

## Alternatives

- To write a schema as text, use the [DBML Editor](./dbml-editor.md). SQL pasted into the DBML editor is not converted.
- In Desktop and CLI, [DB Client](./db-client.md) can read the schema directly from a database and import it into an ERD.
- In Desktop and CLI, the [Git Repository](./git-repository.md) panel reads the schema from Laravel migrations, `.dbml` files, or `.sql` files in the repository.
