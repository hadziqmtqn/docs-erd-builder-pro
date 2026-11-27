---
sidebar_position: 6
slug: /workspace/integration
---

# Cross-Feature Integration

Notes, ERD, Flowchart, and Drawing work in one ecosystem. What connects them is the **Project**: every file stores the Project it belongs to, so other features can find related files.

## Project-Based Concept

```
Workspace (Personal or Team)
└── Project
    ├── ERD
    ├── Notes
    ├── Flowcharts
    ├── Drawings
    └── DB Client (Desktop/CLI)
```

Access rights, search, Version History, AI conversations, and MCP follow the Project and workspace the file is in.

## AI Context (@mention)

AI Assistant can read the content of other files in the same Project:

1. While typing in AI Assistant, type `@` or click **Reference a file**.
2. Select a Notes, ERD, or Flowchart file from the same Project.
3. That file's content (up to 2,000 characters per file) is sent along as context.

Example: when creating a Flowchart for the login flow, type:
```
@Database Schema create a flowchart for the user authentication flow
```
The AI reads the table list and DBML from that ERD, then builds a matching flowchart. Drawings cannot be referenced.

## Cross-File Preview in Notes

From the Notes Slash Menu, **Open preview** opens an ERD, Flowchart, or Drawing in a side panel, so you can write documentation while looking at the diagram. See [Notes](../core-features/notes.md#open-preview).

## AI Conversations per Project

AI conversation history is stored per Project, so Team members can read the same conversations. Only the creator of a conversation can send messages in it.

## Benefits

1. **Consistent**: all features read data from the same Project.
2. **Cross-module**: AI and preview work across file types without manual copy and paste.
3. **Controlled**: Project access rights apply to every file type in it.

---
*Note for contributors: workspace state is managed in `src/providers/WorkspaceContext.tsx`, AI actions in `src/contexts/AIActionContext.tsx`, and the @mention context is built in `src/hooks/aiEntityContext/siblings.ts`.*
