---
sidebar_position: 1
slug: /workspace/integration
---

# Workspace Integration

ERD Builder Pro is designed with a **modular** approach where features like Notes, ERD Builder, and Flowchart operate within a single interconnected ecosystem. This article explains how this integration works technically.

## Project-Based Concept

All content in ERD Builder Pro is grouped into **Projects**. Each entity (Notes, ERD, Flowchart, Drawing) has a `project_id` field that serves as the link between features.

### Data Structure
```
Project
├── Notes (project_id: X)
├── ERD Diagrams (project_id: X)
├── Flowcharts (project_id: X)
└── Drawings (project_id: X)
```

When you switch from one feature to another within the same project, the data remains synchronized because everything references the same `project_id`.

## AI Context Sharing (@Mentions)

One of the flagship features is the AI's ability to "see" content from other features while you are chatting in one of the modules. This is achieved through the **@Mention** system.

### How It Works
1. When typing in the AI Chat, type the `@` character.
2. A dropdown will appear showing a list of files from the same project.
3. Select the file you want to reference.
4. The content of that file will be automatically inserted into the prompt.

### Usage Example
For example, you are creating a **Flowchart** for a login flow. You could type:
```
@DatabaseSchema buatkan flowchart untuk alur authentication user
```
With that mention, the AI will take the context from your database schema (ERD) and generate an appropriate flowchart.

## State Management

Behind the scenes, the application uses two main contexts to manage state:

### 1. WorkspaceContext
Located at `src/providers/WorkspaceContext.tsx`, this manages:
- User authentication data.
- List of all documents (Notes, ERD, Flowchart, etc.).
- The currently selected active ID.
- Workspace configuration (such as theme and undo/redo).

### 2. AIActionContext
Located at `src/contexts/AIActionContext.tsx`, this manages:
- Actions that can be performed by AI (replace, append).
- The currently selected text (`selectionText`) for additional context.
- Handler to receive content from AI and apply it to the document.

### Interaction Between Both
When you use @Mention:
1. `WorkspaceContext` provides the list of files available in that project.
2. `AIActionContext` handles the selection and insertion of content into the prompt.
3. Server-side (`buildSiblingContext`) compiles the context from all referenced files before sending it to the AI provider.

## Integration Benefits

1. **Consistent:** All features share a single data source (Supabase).
2. **Smart:** AI can work cross-module without manual copy-pasting.
3. **Modular:** New features can be easily added because there is already a foundation of shared state.

---
*Technical note: If you are a contributor, see the file `useAIChat.ts` to see how `project_id` is used in dynamic queries.*