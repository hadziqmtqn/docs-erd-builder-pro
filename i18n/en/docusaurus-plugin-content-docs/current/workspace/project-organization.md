---
sidebar_position: 1
slug: /workspace/project-organization
---
# Project Organization

ERD Builder Pro uses a project-based organization system to ensure your documentation stays structured and easy to find.

## Workspace Hierarchy
Your documentation is organized into three main levels:
1.  **Workspace**: Your global workspace (connected to a single Supabase database).
2.  **Project**: A logical container for a specific application or client.
3.  **Files**: Technical documents within that project.

## Document Types in a Project
Each project is highly flexible. You can combine the following document types within the same project:

- **ERD Diagrams**: Focus on designing PostgreSQL/MySQL database schemas.
- **Flowcharts**: Used to map out application logic or business processes.
- **Notes & Documentation**: A place to record business rules, API documentation, or technical guides.
- **Drawings (Excalidraw)**: A freeform canvas for UI mockups, brainstorming, or architecture sketches.

> [!TIP]
> A project is not limited to a single file. You can have, for example, 3 ERD Diagrams (for different modules), 5 Note files, and several Drawing sketches within one project named "E-Commerce Application".

## File & Project Management
- **Grouping**: Use descriptive project names (e.g., `Backend-CRM-V2`) to separate work focuses.
- **Moving Files**: If a file seems more suitable for another project, you can move it via the settings menu in each file without losing data.
- **Search**: Use the filter/search feature in the sidebar to quickly find files by name or file type.

> [!CAUTION]
> **Caution When Deleting a Project**: Deleting a project will mass delete **all** documents within it. Although these files go to the Trash, restoring a large number of files can be time-consuming. Always double-check the project contents before deleting.