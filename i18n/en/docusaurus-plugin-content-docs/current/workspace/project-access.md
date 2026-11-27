---
sidebar_position: 3
slug: /workspace/project-access
---
# Project Access (Roles)

In a Team Workspace, each member has a role per Project that determines what they can do. Personal Workspace does not use roles because everything in it belongs to you.

## Roles

| Role | Who | Default |
| :--- | :--- | :--- |
| **Creator** | Project creator | Full access |
| **Manager** | Team Manager | Always full access, cannot be restricted |
| **Editor** | Staff given edit access | — |
| **Commenter** | Staff | Default role for Staff |
| **Viewer** | Staff who may only read | — |

## Access Rights

| Action | Creator | Manager | Editor | Commenter | Viewer |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Read files | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit file content | ✅ | ✅ | ✅ | — | — |
| Comment, discuss, resolve threads | ✅ | ✅ | ✅ | ✅ | — |
| Create new files in the Project | ✅ | ✅ | ✅ | ✅ | — |
| Manage Project access | ✅ | ✅ | — | — | — |
| Rename or delete the Project | ✅ | — | — | — | — |

### File Owner

The creator of a file always has full access to that file, whatever their role. Only the file creator can:
- move the file to Trash and restore it;
- share the file with a [public link](../collaboration/public-share.md);
- restore a version from [Version History](../collaboration/version-history.md);
- move the file to another Project.

Managers cannot perform these actions on files owned by others.

Exception: if a Manager restricts the Project creator to Commenter or Viewer, that restriction also applies to the files they created in that Project. Changing their role back to Editor restores their rights to their own files.

## Managing Roles

1. In the **Projects** sidebar, click **⋯** on the Project, then select **Manage access**. This menu appears only in a Team Workspace, for the Project creator and Managers.
2. In the **Project access** dialog, choose a role for each member: **Editor** (*Can change the files.*), **Commenter** (*Can read and comment. Default.*), or **Viewer** (*Can read only.*).
3. Changes are saved immediately and the message *&lt;name&gt; is now &lt;role&gt;.* appears.

Only a Manager can change the Project creator's role. A Team Manager's role cannot be changed.

## Read-Only View

Members without edit rights see a **View only** or **Comment only** notice above the file. Notes and Drawings have a **Duplicate to edit** button that creates a copy you can edit.

If your role changes while the file is open, the message *Your access to this Project changed.* appears.
