---
sidebar_position: 4
slug: /core-features/notes
---
# Notes & Documentation

ERD Builder Pro includes a **Tiptap**-based rich text editor to help you create in-depth project documentation.

## Editor Features
- **Rich Formatting**: Bold, italic, underline, strikethrough, and text alignment (left, center, right).
- **Task Lists**: Interactive checklists to track development progress.
- **Code Blocks**: Display code snippets with syntax highlighting.
- **Image Support**: Upload images directly into documents (stored in Cloudflare R2).
- **Smart Tables**: Interactive tables with auto-calculation and smart row management.

## Smart Tables & Auto-Calculation

The **Smart Table** feature allows you to perform simple mathematical calculations directly inside table cells without needing an external calculator.

### Auto-Calculation (`=sum` and `=avg`)
You can perform calculations within a column by typing a special shortcut inside a cell:
- **`=sum`** or **`=SUM`**: The system automatically sums all numbers above that cell (up to the previous Header/Subtotal row).
- **`=avg`** or **`=AVG`**: The system automatically calculates the average of the numbers above it. Empty cells are excluded from the calculation to keep the average accurate.
- **Auto-Formatting**: Numbers entered or generated are automatically formatted according to the Indonesian currency standard (Rupiah) with a period as the thousands separator (e.g., `1.500.000`).

### Special Row Types
Use the **Table Bubble Menu** that appears when you click inside a table cell to change the row type:
- **Header Row (Subtotal)**: Located in the sub-menu **Rows > Header Row**. Marks a row as a subtotal that limits the calculation range of `=sum` or `=avg` below it.
- **Footer Row (Grand Total)**: Located in the sub-menu **Rows > Footer Row**. This row sums all component values in the table without recalculating subtotal rows.

## Advanced Table Management

The Notes Editor now supports more flexible table management for complex documents:

### Responsive Tables (Horizontal Scroll)
Tables with many columns or very wide content now support **Horizontal Scroll**. You don't need to worry about the table overflowing out of the document container; simply scroll the table sideways using the custom scrollbar available at the bottom of the table.

### Table Bubble Menu & Sub-menus
To keep the workspace clean, table action menus are now grouped into sub-menus:
- **Alignment**: Quick buttons for text alignment (Left, Center, Right) in the main menu bar.
- **Table Actions**: Main menu containing:
    - **Rows**: Add/delete rows and set Header/Footer types.
    - **Columns**: Add/delete columns as well as **Move Left** and **Move Right** features to easily reorder columns.
    - **Insert Line Above**: A practical solution to insert a new paragraph line above the table, especially if the table is at the very top of the document.
    - **Delete Table**: Instantly delete the entire table.

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
| **Auto Sum/Avg** | `=sum` / `=avg` | `=sum` / `=avg` |
| **Import Note** | `⌘ ⇧ I` | `Ctrl Shift I` |
| **Export Note** | `⌘ ⇧ E` | `Ctrl Shift E` |
| **Insert Calendar** | `/` (Slash Menu) | `/` (Slash Menu) |

### Slash Menu (`/`)
Type `/` on a new line to open the quick menu. This menu includes various commands like inserting tables, headings, and the **Insert Calendar** category with options:
- **Time/Now**: Inserts the current time or date as text.
- **Today/Tomorrow/Yesterday**: Inserts an interactive calendar with the relevant date.
- **In a week/A week ago**: Inserts a calendar with a one-week offset.
- **Date Range**: Inserts an interactive date range picker.

## Use Cases
Use this Notes feature to record:
- Project cost estimates using the **Smart Table**.
- Business rules.
- API flow explanations.
- Technical guides for other team members.

## Import Documentation (Experimental)
> [!WARNING]
> The **Import** feature for external files (such as `.md` or `.docx`) into Notes is currently in the **Experimental** stage. Document formatting may not be fully precise after import.