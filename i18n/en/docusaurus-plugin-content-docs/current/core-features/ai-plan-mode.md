---
sidebar_position: 9
slug: /core-features/ai-plan-mode
---
# Plan Mode

**Plan mode** helps you plan an application before you draw the ERD. Instead of writing a long answer right away, the AI asks about your requirements one question at a time, then writes a planning document (PRD) in Markdown that contains a DBML schema block.

## Turning On Plan Mode

1. Open [AI Assistant](./ai-integration.md) from the header or with `⌘J` / `Ctrl+J`.
2. Click the **Plan** pill in the input box. Plan mode stays on until you click it again.
3. Describe the application you want to build, then send it.

Plan mode is available in every view that has AI Assistant, and it does not require any file content.

## Plan Interview

The AI shows a **Plan interview** card with one question, for example about feature scope, stack, data storage, authentication, access control (RBAC), and deployment.

- Choose one of the options. The option the AI suggests is labeled **Recommended**.
- Choose **Other answer** to write your own answer.
- **Skip** skips the question, and **Continue** sends the answer.
- A collapsed card shows **Open Plan interview · N questions**; click it to open the interview again.
- If the request to the AI is interrupted, the card shows **Resume** to continue the interview.

The chat input box is hidden while the interview card is shown.

## Result

When the questions are done, the AI writes the PRD in Markdown along with a DBML block. From that reply you can:

- **Save as Note** to save the PRD as a Note.
- **Create or update ERD from this DBML schema** to create an ERD from the schema, or **Append** when you are in the ERD view.

Always review the generated schema before applying it.
