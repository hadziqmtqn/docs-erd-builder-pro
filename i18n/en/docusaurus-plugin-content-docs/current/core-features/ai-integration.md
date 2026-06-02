---
sidebar_position: 4
slug: /core-features/ai-integration
---

# AI Integration & Smart Actions

ERD Builder Pro integrates artificial intelligence (AI) not just as an ordinary chatbot, but as an **AI Assistant** that understands context and can perform direct actions on your content through various smart buttons (*Smart Actions*).

:::warning
The AI feature is currently in **active development**. The performance and intelligence of the AI depend heavily on the model you choose in the settings.
:::

## 1. AI Action Menu (Per View)

Each view has a specific set of AI actions tailored to its content type. These actions can be accessed via the AI menu or quick action buttons.

### 2.1 ERD View
Used to modify or analyze database tables.

| Button | Action | Auto-apply | Description |
| :--- | :--- | :---: | :--- |
| **Edit Columns** | Modify columns | ✅ Yes | Changes table structure (add/delete/modify columns) via JSON mutation. |
| **Explain Table** | Table description | ❌ No | Provides a natural language explanation of the table's function. |
| **Suggest Indexes** | Index recommendations | ❌ No | Suggests SQL indexes for query optimization. |
| **Seed Data** | Generate data | ❌ No | Creates example `INSERT INTO` statements for dummy data. |

### 2.2 Notes View
Focuses on text processing and documentation.

| Button | Action | Strategy | Description |
| :--- | :--- | :---: | :--- |
| **Summarize** | Summary | Append | Creates a short summary of the existing note. |
| **Improve Grammar** | Improve language | Replace | Corrects grammar and writing style. |
| **Generate Docs** | Documentation | Append | Generates a clean technical documentation draft. |

### 2.3 Flowchart View
Automates the creation of visual workflows.

| Button | Action | Strategy | Description |
| :--- | :--- | :---: | :--- |
| **Generate Diagram** | Create flowchart | Append | Generates a new flowchart based on a text description. |
| **Explain Flow** | Explain flow | ❌ No | Provides a step-by-step description of the diagram. |
| **Generate Pseudocode**| Create code | ❌ No | Converts the visual flow into programming logic. |
| **Insert Between** | Insert node | Append | Inserts a symbol between two selected nodes. |
| **Import Description** | Replace flow | Replace | Regenerates the entire flowchart and overwrites the canvas. |

## 2. Action Mode Selector (Radio Pills)

Above the chat input box, there are **Radio Pills** that act as an action mode selector.
- **Dynamic Context:** The icon and placeholder text change according to the selected action type.
- **HoverCard:** Hover over each pill to see a detailed description of that action's function.

## 3. Content-Aware Action Buttons

Each response from the AI in the Chat Panel comes with smart action buttons that appear dynamically based on the content of that message.

### 3.1 Replace All & Append
- **Flowchart View:** Appears automatically if the AI responds with a JSON nodes structure.
- **ERD View:** Appears automatically if the AI responds with SQL DDL (`CREATE TABLE`).
- **Replace:** Deletes the old content and replaces it with the new one.
- **Append:** Adds new content below or alongside existing content.

### 3.2 Diagram & Database Dialogs
If the AI detects specific content while you are on a different page, a special button will appear:
- **Database (SQL):** Opens the *ErdFromSqlDialog* to create a new table from SQL even if you are on the Notes page.
- **Flowchart (JSON):** Opens the *FlowchartFromJsonDialog* to create a diagram from JSON.
- **Notes (Text):** Always appears in all views to save conversation snippets as new notes or add them to the active note.

### 3.3 Button Priority
Button order (left to right): `Copy` → `Replace/Append` → `Database` → `Flowchart` → `Notes`.
*The system will automatically hide the Replace/Append button if it detects SQL or JSON to avoid action conflicts.*

## 4. Automatic Content Detection

The AI Assistant has internal detection logic:
- **SQL DDL:** Detects keywords like `CREATE TABLE`, `ALTER TABLE`, or `INSERT INTO`.
- **Flowchart JSON:** Looks for the structure pattern `{ nodes: [...] }` inside a JSON code block.

## 5. Data Flow Architecture

AI actions are managed through **AIActionContext** using a *Content Handler* pattern:
1. **Register:** A view (e.g., Notes) registers its handler function.
2. **Detection:** The chat panel detects the content type in the AI message.
3. **Apply:** When the button is clicked, `applyContent` triggers the registered handler to make changes to the application state or database.

## 6. Edge Cases

- **Streaming:** All action buttons are hidden while the AI is typing (streaming).
- **Guest Mode:** The feature still works using an in-memory session.
- **Multi-Selection:** In ERD, the "Edit Columns" action can handle modifying multiple tables at once in a single instruction.
- **Diff Preview:** Before applying a change (*Replace/Append*), the system displays a *Preview* window to compare changes.

---
*Tips: Use the **@mention** feature to refer to other files so that the AI understands the relationships between documents in a single project.*