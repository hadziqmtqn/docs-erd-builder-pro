---
sidebar_position: 4
slug: /core-features/notes
---
# Notes & Documentation

ERD Builder Pro includes a **Tiptap**-based rich text editor to help you create in-depth project documentation.

## Editor Features

The **Tiptap**-based (ProseMirror) editor supports extensive writing features:

### Text Formatting
- **Basic**: Bold (`⌘B`), Italic (`⌘I`), Underline (`⌘U`), Strikethrough (`⌘⇧X`), Inline Code (`⌘E`).
- **Text Color**: 8 theme color options.
- **Alignment**: Left, Center, Right (`⌘⇧L/C/R`).
- **Links**: Insert hyperlinks via `⌘K` or the bubble menu.

### Blocks & Structure
- **Headings**: H1–H4 (`⌘⌥1-4`).
- **Lists**: Bullet, Numbered, Task List (interactive checkboxes).
- **Blockquote** (`⌘⇧.`).
- **Code Block**: Code snippets with syntax highlighting.
- **Badge**: Colored inline badge text — `⌘⌥B`.
- **Toggle**: Collapsible blocks that can be opened/closed.
- **Divider**: Horizontal separator line.

### Media & Special Extensions
- **Images**: Upload images to Cloudflare R2. Images can be resized after insertion. Paste detection from Excel/Google Sheets.
- **Lucide Icons**: Insert Lucide icons — `⌘⌥I` or via Slash Menu. Icon name search supported.
- **Calendar**: Interactive date nodes — pick dates via a calendar popover. Insert via Slash Menu (`/today`, `/tomorrow`, `/date range`, etc.).

### Document Outline
Click the sidebar icon on the left of the editor to see a **heading list** (H1–H5) of the document. Click a heading to jump directly to that section.

### Smart Paste Handler
The editor automatically detects pasted content:
- **Markdown**: If the content contains markdown syntax (headings, lists, code fences, tables), it is converted to HTML via `marked.parse`.
- **Markdown Tables**: Markdown tables (`| col | col |`) are converted to editor tables.
- **Excel / Google Sheets**: Spreadsheet content (detected via HTML markers) is sanitized while preserving cell structure (colspan/rowspan).
- **Fenced Markdown**: `\`\`\`markdown ... \`\`\`` blocks are automatically unwrapped.

## Smart Tables & Auto-Calculation

The **Smart Table** feature allows you to perform mathematical calculations directly inside table cells — like a spreadsheet, but integrated into your document.

### Supported Formulas

| Formula | Other Aliases | Direction | Description |
| :--- | :--- | :--- | :--- |
| `=sum` | `=sum()` | Vertical | Sums all numbers in the same column (from data rows above) |
| `=sumv` | `=sumv()`, `=sum-vertical`, `=sumvertical` | Vertical | Alias for `=sum` — sum vertically |
| `=avg` | `=avg()`, `=average`, `=average()` | Vertical | Calculates the average of numbers in the same column |
| `=avgv` | `=avgv()`, `=avg-vertical`, `=avgvertical` | Vertical | Alias for `=avg` — average vertically |
| `=mul` | `=mul()`, `=product`, `=product()` | Vertical | Multiplies all numbers in the same column |
| `=mulv` | `=mulv()`, `=productv`, `=productv()` | Vertical | Alias for `=mul` — multiply vertically |
| `=sumh` | `=sumh()`, `=sum-horizontal`, `=sumhorizontal` | Horizontal | Sums all numbers in the same row (to the left) |
| `=avgh` | `=avgh()`, `=avg-horizontal`, `=avghorizontal` | Horizontal | Calculates the average of numbers in the same row (to the left) |
| `=mulh` | `=mulh()`, `=producth`, `=producth()` | Horizontal | Multiplies all numbers in the same row (to the left) |

**How to use**: Type any formula above in a table cell (e.g., `=sum`, `=sumv`, `=mulh`), then press Enter. The result will appear automatically. All alias forms produce the same result.

> [!TIP]
> **Vertical** (`=sum`, `=sumv`, `=avg`, `=avgv`, `=mul`, `=mulv`): Calculates from data rows above the formula cell, up to the next Header or Footer row.
> **Horizontal** (`=sumh`, `=avgh`, `=mulh`): Calculates from columns to the left in the same row.

### Numbers & Formatting

- **Thousands separator**: Numbers are automatically formatted with a period as the thousands separator following Indonesian standards (e.g., `1.500.000`).
- **Decimal comma**: Supports number input with a comma as the decimal separator (e.g., `15,5`).
- **Empty cells ignored**: Empty cells or non-numeric cells are excluded from calculations to keep results accurate.
- **`formulaTitle`**: Hovering over a formula cell shows a tooltip with the cell reference like `SUM(A2:A10)`.

### Special Row Types

Row types determine the **scope** of formula calculations:

| Row Type | Function | Vertical Formula Scope |
| :--- | :--- | :--- |
| **Data** (default) | Regular data row | Source data for formulas |
| **Header** (Subtotal) | Sub-group separator | Formulas below only calculate up to the next Header |
| **Footer** (Grand Total) | Final total | Formulas in this row calculate **ALL** data in the table |

**Usage example**:

```
┌──────────────┬────────┐
│ Header Row   │ Total  │   ← =sum (sums 2 data rows below)
├──────────────┼────────┤
│ Item A       │ 500    │
│ Item B       │ 300    │
├──────────────┼────────┤
│ Subtotal     │ 800    │   ← Header Row → =sum (reset counter)
├──────────────┼────────┤
│ Item C       │ 200    │
│ Item D       │ 100    │
├──────────────┼────────┤
│ Grand Total  │ 1100   │   ← Footer Row → =sum (total ALL: 500+300+200+100)
└──────────────┴────────┘
```

To change a row type:
1. Click inside a table cell.
2. Hover over the **Table Bubble Menu** that appears.
3. Open the **Rows** submenu → select **Header Row** or **Footer Row**.

## Advanced Table Management

### Table Bubble Menu & Sub-menus

To keep the workspace clean, table action menus are grouped into sub-menus:

- **Alignment**: Quick buttons for text alignment (Left, Center, Right) in the main menu bar.
- **Table Actions** → submenu:
    - **Rows**:
        - Add Row Below — inserts a row below the cursor position.
        - Delete Row — removes the current row.
        - Header Row — changes the row to Header type (Subtotal).
        - Footer Row — changes the row to Footer type (Grand Total).
    - **Columns**:
        - Add Column After — adds a column to the right.
        - Delete Column — removes the current column.
        - Move Left — moves the column to the left.
        - Move Right — moves the column to the right.
    - **Insert Line Above** — inserts an empty paragraph row above the table (useful when the table is at the very top of the document).
    - **Delete Table** — removes the entire table.

### Responsive Tables (Horizontal Scroll)

Tables with many columns or wide content support **Horizontal Scroll**. Scroll sideways using the custom scrollbar at the bottom of the table.

### Insert Table

How to insert a new table:
- **Keyboard**: `⌘⌥T` (Mac) / `Ctrl Alt T` (Win/Linux).
- **Slash Menu**: Type `/table` on an empty line → select **Table**.
- Default table size is 3×3 with Header row enabled.

## Keyboard Shortcuts & Slash Menu

The Notes Editor supports various keyboard shortcuts to speed up your writing process:

### Text Formatting & Navigation
| Action | Shortcut (Mac) | Shortcut (Win/Linux) |
| :--- | :--- | :--- |
| **Bold** | `⌘ B` | `Ctrl B` |
| **Italic** | `⌘ I` | `Ctrl I` |
| **Underline** | `⌘ U` | `Ctrl U` |
| **Strikethrough** | `⌘ ⇧ X` | `Ctrl Shift X` |
| **Inline Code** | `⌘ E` | `Ctrl E` |
| **Add Link** | `⌘ K` | `Ctrl K` |
| **Align Left** | `⌘ ⇧ L` | `Ctrl Shift L` |
| **Align Center** | `⌘ ⇧ C` | `Ctrl Shift C` |
| **Align Right** | `⌘ ⇧ R` | `Ctrl Shift R` |

### Blocks & Structure
| Action | Shortcut (Mac) | Shortcut (Win/Linux) |
| :--- | :--- | :--- |
| **Heading 1-4** | `⌘ ⌥ 1-4` | `Ctrl Alt 1-4` |
| **Bulleted List** | `⌘ ⇧ 8` | `Ctrl Shift 8` |
| **Numbered List** | `⌘ ⇧ 7` | `Ctrl Shift 7` |
| **Task List** | `⌘ ⇧ 9` | `Ctrl Shift 9` |
| **Blockquote** | `⌘ ⇧ .` | `Ctrl Shift .` |

### Special Features
| Action | Shortcut (Mac) | Shortcut (Win/Linux) |
| :--- | :--- | :--- |
| **Insert Table** | `⌘ ⌥ T` | `Ctrl Alt T` |
| **Lucide Icon** | `⌘ ⌥ I` | `Ctrl Alt I` |
| **Auto Sum/Avg** | `=sum` / `=sumv` / `=sumh` | `=sum` / `=sumv` / `=sumh` |
| **Auto Multiply** | `=mul` / `=mulv` / `=mulh` | `=mul` / `=mulv` / `=mulh` |
| **Auto Average** | `=avg` / `=avgv` / `=avgh` | `=avg` / `=avgv` / `=avgh` |
| **Import Note** | `⌘ ⇧ I` | `Ctrl Shift I` |
| **Export Note** | `⌘ ⇧ E` | `Ctrl Shift E` |
| **Insert Calendar** | `/` (Slash Menu) | `/` (Slash Menu) |

### Slash Menu (`/`)
Type `/` on a new line to open the quick menu. This menu includes various commands like inserting tables, headings, and the **Insert Calendar** category with options:
- **Time/Now**: Inserts the current time or date as text.
- **Today/Tomorrow/Yesterday**: Inserts an interactive calendar with the relevant date.
- **In a week/A week ago**: Inserts a calendar with a one-week offset.
- **Date Range**: Inserts an interactive date range picker.

## Import & Export Documentation

### Import External Files

> [!WARNING]
> The **Import** feature for external files is still in the **Experimental** stage. Document formatting may not be fully precise after import.

To import a file into Notes:
1. Use the shortcut `⌘⇧I` (Mac) / `Ctrl Shift I` (Win/Linux).
2. Select the file to import.

**Supported formats:**
- **Markdown** (`.md`) — converted via `marked.parse` + HTML sanitization.
- **DOCX** (`.docx`) — converted via Mammoth.js.
- **HTML** — sanitized via DOMPurify before being inserted into the editor.

**Direct paste**: You can also copy content from an external document and paste directly into the editor — markdown and spreadsheet tables will be automatically converted.

### Export to PDF
1. Use the shortcut `⌘⇧E` (Mac) / `Ctrl Shift E` (Win/Linux).
2. The document will be printed to PDF via the browser's print dialog.
3. A **Table of Contents** option is available for long documents.

## Sync & Storage

Notes are saved using a 2-stage system:
1. **Local Draft** (IndexedDB): Saved automatically ~400ms after you stop typing.
2. **Cloud Sync** (Server): Synced ~1000ms after you stop typing.

> [!NOTE]
> **Guest mode** saves to IndexedDB only — no cloud sync.

## Use Cases
Use this Notes feature to record:
- Project cost estimates using **Smart Tables** with `=sum` formulas.
- Business rules.
- API flow explanations.
- Technical documentation with images, tables, and code.
- Project schedules with **Calendar** nodes and **Task Lists**.