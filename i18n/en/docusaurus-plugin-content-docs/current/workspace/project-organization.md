---
sidebar_position: 2
slug: /workspace/project-organization
---
# Project Organization

Documentation in ERD Builder Pro is grouped into **Projects** so it stays structured and easy to find.

## Hierarchy

1. **Workspace**: the active Personal Workspace or Team Workspace. See [Personal & Team Workspace](./personal-team-workspace.md).
2. **Project**: a container for one application, module, or client.
3. **File**: a document inside a Project.

## File Types

A Project can contain several file types:

- **ERD**: database schema design.
- **Notes**: text documentation, business rules, or API notes.
- **Flowcharts**: logic flows and business processes.
- **Drawings**: a freeform canvas based on Excalidraw.
- **DB Client** (Desktop/CLI): a connection to a database that is already running.

A Project can have many files of each type, for example 3 ERDs for different modules and 5 Notes.

## Creating a Project

- In the **Projects** sidebar, click **+** (**New Project**), fill in **Project name**, then click **Create**.
- Or, when creating a new file: click **+** next to the Project selector, enter a name, then **Add project**.

Projects are created in the active workspace. In a Team Workspace, every member can create Projects. The name **Uncategorized** is reserved by the system.

Every new file must belong to a Project. Older files without a Project are shown in the **Unassigned** section.

## Moving Files

1. Open the file, then select **Actions → Edit** (or **Edit** on the file's row on the Project page).
2. Select the destination **Project**, then click **Save Changes**.

Only the file creator can move it, and the destination must be in the same workspace.

## Deleting a Project

1. In the sidebar, click **⋯** on the Project row, then **Delete**.
2. Confirm in the dialog. The Project and all files in it are moved to **Trash**.

- Only the Project creator can rename or delete it. Other members see *Only the creator can rename or delete*.
- The Project creator cannot delete a Project that contains files created by other members.
- Restoring a Project from Trash also restores its files. See [Trash & Data Recovery](./trash-system.md).

:::caution
Deleting a Project moves **all** files in it to Trash. On Cloud, Trash contents are permanently deleted after 30 days.
:::

## Tips
- Use descriptive Project names, for example `Backend-CRM-V2`.
- Use [Search](./search-and-filter.md) (`⌘K` / `Ctrl+K`) to find files quickly.
