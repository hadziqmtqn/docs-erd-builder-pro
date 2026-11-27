---
sidebar_position: 5
slug: /core-features/notes
---
# Notes & Documentation

Notes is a **Tiptap**-based rich text editor for writing project documentation: business rules, API explanations, meeting notes, or cost estimates with tables that can calculate.

## Text Formatting

Select text to show the **bubble menu** with Bold, Italic, Underline, Strikethrough, Code, Link, alignment, lists, text color (**Theme Colors**: Default, Red, Orange, Green, Blue, Indigo, Purple, Pink), **Comment on block** (Team), and **Send to AI**.

Links are inserted with the Link button in the bubble menu, which opens the **Edit Link** dialog.

## Blocks & Structure

Type `/` at the start of a line or after a space to open the **Slash Menu**:

| Group | Items |
| :--- | :--- |
| Basic blocks | Text, Heading 1–4, Badge, Divider |
| Lists | Bulleted list, Ordered list, To-do list |
| Media | Image, Lucide Icon |
| Organization | Blockquote, Toggle Section, Code block, SQL Query (Desktop/CLI), Open preview › ERD Builder / Flowchart / Drawing |
| Advanced | Table Actions › Insert Table, Add Column, Delete Column, Add Row, Delete Row, Delete Table; Insert Calendar |
| History | Undo, Redo |

### Open Preview {/* #open-preview */}

**Open preview** opens an ERD, Flowchart, or Drawing from the same Project in a side panel of the Note, so you can refer to the diagram while you write. Use **Open full editor** to open that file in its own editor, or **Close preview** to close the panel.

### Calendar

**Insert Calendar** inserts today's date and opens a date picker. A Calendar node holds **one date**. Turn off **All-day** to add a time. Hover over the node and choose **Edit date** to change it, or the trash icon to delete it.

### Document Outline

When a Note has headings, a small bar appears on the left edge of the editor. Hover over or click the bar to see the list of H1–H5 headings, then click one to jump to that section.

## Images

Paste an image from the clipboard, drag a file into the editor, or choose **Image** in the Slash Menu.

- Formats: JPEG, PNG, WebP, and SVG.
- Images up to 5 MB are compressed automatically in the browser to at most 1 MB and 1280 px wide.
- A document can hold up to 15 images and 2 MB in total.
- Uploads require storage (Cloudflare R2, or Settings → Storage in Desktop/CLI). See [Upload Images](../cloud-storage/upload-feature.md).

## Smart Paste

- **Tables from Excel, Google Sheets, or Office** have their styling removed and are tidied into editor tables.
- **Markdown-style text** (headings, lists, code fences, tables) is converted to rich text.
- ` ```markdown ... ``` ` blocks are unwrapped automatically.

## Smart Tables & Auto-Calculation

Tables in Notes can calculate like a simple spreadsheet. Type a formula in a table cell, then move out of that cell; the result appears automatically.

### Supported Formulas

| Formula | Aliases | Direction | Function |
| :--- | :--- | :--- | :--- |
| `=sum` | `=sumv` | Vertical | Sums the numbers in the same column |
| `=avg` | `=average`, `=avgv` | Vertical | Averages the numbers in the same column |
| `=mul` | `=product`, `=mulv`, `=productv` | Vertical | Multiplies the numbers in the same column |
| `=sumh` | — | Horizontal | Sums the numbers in the same row (to the left) |
| `=avgh` | — | Horizontal | Averages the numbers in the same row (to the left) |
| `=mulh` | `=producth` | Horizontal | Multiplies the numbers in the same row (to the left) |

Formulas are case-insensitive and can be written with `()`, for example `=SUM()`. Hover over a result cell to see its source range, for example `SUMV(B2:B5)`. The full guide is in the **Actions → Calculation Guide** menu (**Table Calculation Guide**).

### Special Row Types

The row type determines the scope of vertical formulas:

| Row Type | Function | Vertical Formula Scope |
| :--- | :--- | :--- |
| **Data** (default) | Regular data row | Source data for formulas |
| **Header** (Subtotal) | Sub-group separator | Formulas below it only calculate up to the next Header |
| **Footer** (Grand Total) | Final total | Formulas in this row calculate **all** data in the table |

Change the row type from the table bubble menu: **Table Actions → Rows → Header Row / Footer Row**, or right-click a table cell.

### Numbers & Formatting

- Numbers are formatted with a period as the thousands separator, for example `1.500.000`.
- A comma can be used as the decimal separator, for example `15,5`.
- Empty or non-numeric cells are ignored.

## Table Management

- **Insert Table**: `⌥⌘T` / `Ctrl+Alt+T`, or **Table Actions → Insert Table** in the Slash Menu. A new table is 3×3 with a header row.
- The **table bubble menu** appears when the cursor is in a table: alignment, then **Table Actions** with **Rows** (Add Row Above/Below, Delete Row, Header Row, Footer Row), **Columns** (Add Column Before/After, Delete Column, Move Left/Right), **Insert Line Above** (an empty paragraph above the table), and **Delete Table**.
- Right-click a table cell for the same menu, plus moving rows up/down and **Comment on block** (Team).
- Wide tables can be scrolled horizontally.

## Keyboard Shortcuts

On Windows and Linux, replace `⌘` with `Ctrl`, `⌥` with `Alt`, and `⇧` with `Shift`.

### Text Formatting
| Action | Mac | Windows/Linux |
| :--- | :--- | :--- |
| **Bold** | `⌘ B` | `Ctrl B` |
| **Italic** | `⌘ I` | `Ctrl I` |
| **Underline** | `⌘ U` | `Ctrl U` |
| **Inline Code** | `⌘ E` | `Ctrl E` |
| **Align Left / Center / Right** | `⇧ ⌘ L` / `⇧ ⌘ C` / `⇧ ⌘ R` | `Ctrl Shift L` / `C` / `R` |
| **Justify** | `⇧ ⌘ J` | `Ctrl Shift J` |

### Blocks
| Action | Mac | Windows/Linux |
| :--- | :--- | :--- |
| **Heading 1–6** | `⌥ ⌘ 1`–`6` | `Ctrl Alt 1`–`6` |
| **Paragraph** | `⌥ ⌘ 0` | `Ctrl Alt 0` |
| **Bulleted List** | `⇧ ⌘ 8` | `Ctrl Shift 8` |
| **Numbered List** | `⇧ ⌘ 7` | `Ctrl Shift 7` |
| **Task List** | `⇧ ⌘ 9` | `Ctrl Shift 9` |
| **Blockquote** | `⇧ ⌘ B` | `Ctrl Shift B` |
| **Code Block** | `⌥ ⌘ C` | `Ctrl Alt C` |
| **Badge** | `⌥ ⌘ B` | `Ctrl Alt B` |
| **Insert Table** | `⌥ ⌘ T` | `Ctrl Alt T` |

### Document
| Action | Mac | Windows/Linux |
| :--- | :--- | :--- |
| **Save to server now** | `⌘ S` | `Ctrl S` |
| **Import** | `⇧ ⌘ I` | `Ctrl Shift I` |
| **Export** | `⇧ ⌘ E` | `Ctrl Shift E` |
| **Undo / Redo** | `⌘ Z` / `⇧ ⌘ Z` | `Ctrl Z` / `Ctrl Y` |

Strikethrough, Lucide Icon, Divider, and Link have no working shortcut yet; use the bubble menu or the Slash Menu. `⌘K` / `Ctrl+K` opens [Search](../workspace/search-and-filter.md), not the link dialog.

## Import & Export

The **Actions** menu (⋯) in the Note header contains **Calculation Guide**, **Copy Markdown**, **Import**, **Export**, and **Text Stats**.

### Import

:::warning Experimental
The imported result may not fully match the original document.
:::

1. Press `⇧⌘I` / `Ctrl+Shift+I`, or choose **Actions → Import**.
2. Choose an **.md**, **.docx**, or **.txt** file (up to 3 MB). `.txt` files are processed as Markdown.
3. The file content is added to the end of the open Note. If no Note is open, a new Note is created with the file's name.

Images in a Word file that fail to upload are skipped.

### Export

Press `⇧⌘E` / `Ctrl+Shift+E`, or choose **Actions → Export**, then choose a format:

| Format | Description |
| :--- | :--- |
| **MD** | Markdown |
| **PDF** | Compact PDF |
| **Print** | High-quality printing through the browser dialog. Not available in Desktop. |
| **Word** | Microsoft Word document |

PDF, Print, and Word have the **Include Document Title**, **Include Metadata**, and **Preserve Formatting** options. The page size is A4.

## Saving

Notes are saved in two stages:
1. **Local draft** in the browser (IndexedDB), about 0.4 seconds after you stop typing.
2. **Server sync**, about 1 second after you stop typing.

Press `⌘S` / `Ctrl+S` to sync pending changes immediately. **Guest** mode saves only in the browser.

## Collaboration

In a Team Workspace, hover over a block and click **Comment** to comment on that block. See [Comments & Discussions](../collaboration/comments-discussions.md). Change history is available in [Version History](../collaboration/version-history.md).
