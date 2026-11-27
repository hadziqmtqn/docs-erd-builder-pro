---
sidebar_position: 2
slug: /core-features/dbml-editor
---

# DBML Editor

ERD Builder Pro includes a **DBML** (*Database Markup Language*) editor for defining schemas as text. The editor syncs both ways with the ERD canvas.

## What is DBML?

[DBML](https://dbml.dbdiagram.io/) is an open markup language for defining database structures declaratively. Unlike SQL, which focuses on executing commands, DBML is designed to be easy for **humans to read and write**.

### DBML Syntax Example

```dbml
Table users {
  id integer [pk, increment]
  username varchar [not null]
  email varchar [unique]
  created_at timestamp
}

Table posts {
  id integer [pk, increment]
  user_id integer [ref: > users.id]
  title varchar
  body text
  published_at timestamp
}

Enum status {
  draft
  published
  archived
}

Ref: posts.user_id > users.id
```

## Opening the DBML Editor

1. Open an ERD diagram.
2. Click the **DBML** button (database icon) in the canvas toolbar, right after **Import SQL**.
3. The editor opens as a *drawer* at the bottom of the canvas, titled **DBML Editor**.

- The drawer's default height is 48% of the screen. Drag its top edge to change the height between 20% and 85%, or use `↑`/`↓` on the drawer handle.
- Opening the DBML editor closes Explorer and the table editor, and vice versa.
- An unapplied draft is kept when the drawer is closed and opened again.
- The DBML button is not shown to users with read-only access or in the DB Client ERD.

## Two-Way Sync

- **DBML → canvas**: applied 1.5 seconds after you stop typing, only when the curly braces are balanced, the text contains `Table`, and the DBML is valid. Invalid DBML is never applied.
- **Canvas → DBML**: the text is regenerated 0.8 seconds after a structural change. Moving a table does not change the text.

:::caution DBML replaces the schema
When DBML is applied, tables that are not in the DBML are **removed from the canvas**. Tables whose names match (case-insensitively) keep their position, color, and collapsed state. Each change applied this way can be undone with **Undo**.
:::

## Supported Syntax

### Table & Columns

```dbml
Table products {
  id integer [pk]
  name varchar [not null]
  price decimal
  description text
  is_active boolean [default: true]
}
```

Column settings inside `[]`:

| Setting | Description | Example |
| :--- | :--- | :--- |
| `pk` | Primary Key | `[pk]` |
| `not null` | Cannot be empty | `[not null]` |
| `unique` | Unique value | `[unique]` |
| `increment` | Auto-increment | `[increment]` |
| `default` | Default value | `[default: 'active']` |
| `note` | Column note | `[note: 'User display name']` |
| `ref` | Inline relationship | `[ref: > users.id]` |

### Relationships (Ref)

```dbml
Ref: orders.customer_id > customers.id
Ref: order_items.order_id > orders.id
Ref: profiles.user_id - users.id  // one-to-one
```

| Operator | Meaning |
| :--- | :--- |
| `>` | Many-to-one (FK → PK) |
| `<` | One-to-many (PK → FK) |
| `-` | One-to-one |

### Enum

```dbml
Enum priority {
  low
  medium
  high
  critical
}

Table tasks {
  id integer [pk]
  priority priority
}
```

AI-generated DBML sometimes uses inline enums such as `role enum('admin', 'editor', 'viewer')`. The editor converts them into separate `Enum` blocks during processing.

### TableGroup, Note, and Indexes

```dbml
TableGroup user_management {
  users
  profiles
}

Table products {
  id integer [pk]
  name varchar
  Note: 'Product catalog'
  indexes {
    (name) [unique]
  }
}
```

## Editor Features

### Autocomplete

The suggestion list shows at most 8 items. Use `↑`/`↓` to select, `Enter` or `Tab` to accept, and `Esc` to close.

| Context | Suggestions |
| :--- | :--- |
| Start of a line | `Table`, `Ref`, `Enum`, `TableGroup`, `Note`, `Indexes` |
| Column type | Data types such as `varchar`, `integer`, `timestamp` |
| Inside `[...]` | `pk`, `unique`, `not null`, `note`, `default`, `increment`, `ref`, `headerColor` |
| References | Table and column names |

### Validation

The editor checks data types, relationships, enums, and syntax errors about 0.5 seconds after you stop typing, then marks the lines that have problems.

### Navigation

- `⌘F` / `Ctrl+F` opens search inside the editor.
- Blocks can be folded from the gutter.
- Placing the cursor on a `Table table_name {` line selects that table on the canvas.

### Syntax Reference

Click the help button in the drawer header to open **DBML Reference**: syntax examples and a few tips.

## Importing from SQL

The DBML editor reads only DBML. SQL pasted into the editor is not converted and is marked as an error. To create tables from `CREATE TABLE`, use [Import SQL](./import-sql.md).

## Copying DBML

The DBML drawer has no copy button; select the text and copy it as usual. For a single table, the **DBML** tab in the table editor has a **Copy** button.

## AI Integration

The AI Assistant can generate a DBML schema from your description. In the ERD view, use the **Append** button on the AI reply to review the changes before they are merged. In other views, use **Create or update ERD from this DBML schema**. See [AI Integration](./ai-integration.md).

## Data Persistence

- The DBML text is stored in the database together with the diagram (`dbml_source`).
- When the diagram is opened again, the last DBML text is restored. If there is none yet, the DBML is generated from the canvas.

## What Is Regenerated from the Canvas

When the canvas changes, the editor regenerates the DBML text:

| Element | Regenerated from the canvas |
| :--- | :---: |
| `Table`, columns, `pk`, `not null`, `unique`, `default`, column `note` | ✅ |
| Table `Note` and `indexes` | ✅ |
| `Ref` | ✅ |
| `Enum` used by columns | ✅ |
| Other `Enum` blocks, `TableGroup`, and `Note` outside tables | Kept from the previous text |

## Limitations

- DBML **`Project` blocks** are not supported.
- **SQL as an intermediate**: DBML is processed through PostgreSQL-dialect SQL, so some MySQL-specific types may not be recognized.
- **Sync delay**: changes from the editor reach the canvas after about 1.5 seconds.
