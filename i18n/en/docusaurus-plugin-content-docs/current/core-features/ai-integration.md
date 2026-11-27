---
sidebar_position: 8
slug: /core-features/ai-integration
---

# AI Assistant

AI Assistant helps create and explain content in ERD, Notes, Flowchart, and DB Client. You can always review AI output before it is applied to your document.

:::warning
The AI feature is still in **active development**. Answer quality depends heavily on the selected model.
:::

## Opening AI Assistant

Click the **AI Assistant** button in the header, or press `⌘J` / `Ctrl+J`.

- Available in the ERD, Notes, Flowchart, and DB Client (Desktop/CLI) views.
- Not available in Drawings, on public link pages, or in documents you cannot edit.
- The provider and model are set in [AI Configuration](../configuration/ai-setup.md). On Cloud, AI is available when your Team plan includes AI Assistant and credits remain.

## Tools

The **Tools** menu in the input box contains instruction presets for specific tasks. A tool applies to one message, then returns to **No tool**. Click the active tool to turn it off.

| View | Tools |
| :--- | :--- |
| **ERD** (*ERD tools*) | Generate DBML, Edit Columns, Explain Table, Suggest Indexes, Seed Data |
| **Notes** (*Tools*) | Summarize, Improve Grammar, Generate Docs |
| **Flowchart** (*Flowchart tools*) | Generate Flowchart, Explain Flow, Generate Pseudocode, Insert Symbol, Import from Description |
| **DB Client** (*DB Client tools*) | Explain Table, Analyze Query, Generate Query, Suggest Indexes, Find Schema Issues |

## Plan Mode

The **Plan** pill makes the AI interview you one question at a time, then write a planning document containing a DBML schema. See [Plan Mode](./ai-plan-mode.md).

## Referencing Other Files (@mention)

Type `@` or click **Reference a file** to add the content of another file as context.

- Only for files that are in a Project.
- The options are Notes, ERDs, and Flowcharts from the same Project. Drawings cannot be referenced.
- Each referenced file is truncated to at most 2,000 characters. An ERD reference includes the table list and DBML.

Example: `@Database Schema create a flowchart for the login flow`.

## Sending a Selection to AI

- **Notes**: select text, then click **Send to AI** in the bubble menu.
- **ERD**: tables selected on the canvas appear as **Active Selection** above the input box.

## Buttons on AI Replies

Hover over an AI reply to show its action buttons:

| Button | When it appears |
| :--- | :--- |
| **Replace All** / **Append** | In the ERD and Flowchart views, when the reply contains DBML/SQL or flowchart JSON. |
| **Save as Note** | Always. |
| **Create or update ERD from this DBML schema** | Outside the ERD view, when the reply contains a schema. |
| **Create or update Flowchart** | Outside the Flowchart view, when the reply contains a flowchart. |
| **Copy message** | Always. |

Your own messages have **Copy message**. When your message is the last one in the conversation, it also has **Resend**.

## Applying AI Results

- **ERD**: **Append** opens **Review Changes**, which marks the changes on the canvas. Choose **Merge Selected** to apply the selected parts or **Reject All** to cancel.
- **Flowchart**: **Replace All** and **Append** open **Preview Flowchart Changes**, which compares *Current canvas* with *After applying AI*. Replace can be limited to one symbol group.
- **Notes**: use **Save as Note**. On a Note page, the options are **Create New**, **Replace All**, or **Append**, with a before-and-after preview. On other pages, the options are **Create New** or **Update Existing**.
- From other views, the **Create ERD from DBML** and **Flowchart from AI** dialogs create a new file or update an existing one.

## Conversation History

- **New Chat** starts a new conversation. The conversation list can be searched with **Search conversations...**.
- Conversations are shared across the whole Project (or per file when the file is not in a Project).
- Only the creator of a conversation can send messages in it. Other members see *This conversation is read-only. Only its creator can send messages.*

## Rules and Prompts

Set the style and limits of AI answers in **Settings → AI Rules** and **Settings → System Prompts**. See [Settings](../configuration/settings.md#ai-rules).
