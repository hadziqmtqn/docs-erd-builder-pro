---
sidebar_position: 2
slug: /core-features/sql-generator
---
# SQL Generator

Once you have finished designing the ERD, you can export it to various database schema formats and programming code using the **Export All** feature.

## Available Export Formats

ERD Builder Pro supports various generators:

### Schema (SQL)
- **PostgreSQL**: Standard SQL schema with `CREATE TABLE` and `ALTER TABLE` for Foreign Keys.
- **MySQL**: MySQL-compatible SQL schema with appropriate FK handling.

### Backend Framework
- **Laravel Migration**: PHP migration files for the Laravel framework (download as `.zip`).
- **Laravel Model**: PHP model files for Eloquent ORM (download as `.zip`).

### Type Safety
- **TypeScript Interface**: TypeScript interfaces for type-safe development (download as `.zip`).
- **Prisma Schema**: Schema for Node.js/TypeScript projects with Prisma ORM (download as `.zip`).
- **Zod Schema**: Schema for data validation on the application side (download as `.zip`).

### Visual
- **PDF**: Export the entire ERD canvas as a PDF document.
- **SVG**: Export the entire ERD canvas as an SVG image.

:::tip Batch Export
Non-SQL formats (Laravel, TypeScript, Prisma, Zod) produce one file per table wrapped in a `.zip` archive. Meanwhile, MySQL and PostgreSQL produce a single `.sql` file ready to be executed.
:::

## How to Export

1. Click the **"Export All"** button in the top right corner of the ERD view.
2. Select the desired format from the available tabs.
3. For SQL formats (MySQL/PostgreSQL), you can copy the code or download the file.
4. For other formats, click **"Download .zip"** to download an archive containing all files.

### Additional Features

- **Code Preview**: All schema formats are displayed using CodeMirror with syntax highlighting.
- **Copy to Clipboard**: Only available for single SQL formats (MySQL/PostgreSQL).
- **Experimental Badge**: The PDF and SVG tabs are marked as "Experimental" because they are new visual features.