---
sidebar_position: 4
slug: /core-features/sql-generator
---
# Export Schema & Code

After designing an ERD, you can export the whole schema to SQL and framework code, or download the diagram as SVG.

## Opening Export

1. Open an ERD diagram.
2. Click the **Actions** menu (⋯) in the header, then **Export All**.
3. Choose **Export Schemas** for SQL and code, or **Download SVG** for an image.

The **Export All** dialog shows the number of tables and relationships, followed by the format tabs.

## Available Formats

| Category | Format | Downloaded file |
| :--- | :--- | :--- |
| **SQL** | MySQL, PostgreSQL | One `<diagram>_schema.sql` file |
| **Laravel** | Migration, Model | `.zip` archive |
| **Goravel** | Model, Migration | `.zip` archive |
| **TypeScript** | Interface, Zod | `.zip` archive |
| **Prisma** | Schema | One `<diagram>_schema.prisma` file |

- **SQL** contains one `CREATE TABLE` per table, followed by `ALTER TABLE … ADD CONSTRAINT … FOREIGN KEY` for relationships.
- **Prisma** contains all models in one file, with the `generator client` and `datasource db` (PostgreSQL) blocks.
- Contents of the `.zip` archives:
  - Laravel: `migrations/<timestamp>_create_<table>_table.php` and `models/<Class>.php`.
  - Goravel: `models/<Struct>.go` and `migrations/create_<table>_table.go`.
  - TypeScript: `<Class>.ts`; Zod: `<Class>Schema.ts`.

## Downloading and Copying

- Single-file formats use the **Download** button; archive formats use **Download .zip**.
- The **Copy** button is available for single-file formats (SQL and Prisma).
- The code preview uses syntax highlighting.

## Per-Table Export

The table editor (double-click a table) has a **Schema** tab with the same formats for a single table. Use **Download** or **Copy** in that tab.

## Image Export (SVG)

**Download SVG** downloads the tables and relationships as `<diagram>.svg` in the light or dark theme that is currently active. PNG and PDF export are not available for ERDs.
