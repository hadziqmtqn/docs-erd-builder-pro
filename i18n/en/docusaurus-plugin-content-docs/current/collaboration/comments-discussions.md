---
sidebar_position: 1
slug: /collaboration/comments-discussions
---
# Comments & Discussions

Team members can discuss files directly in ERD Builder Pro. There are two kinds of conversation:

| Type | For | Attached to |
| :--- | :--- | :--- |
| **Comments** | Feedback on a specific part | An ERD table or relationship, a Flowchart symbol, or a Notes block |
| **Discussions** | Broader questions and design decisions | A file, or the whole Project |

:::info Team Workspace only
Comments and discussions are available only for files in Team Projects. Personal Workspace, Desktop, and CLI do not have them. On Cloud, this feature also depends on the Team's plan.
:::

## Discussions Panel

The **Discussions** button is in the file header, to the left of **Actions**. The badge on the button counts unread discussions and comments in that file.

The panel has two tabs:
- **Discussions**, with the scope **This File** or **All Project**.
- **Comments**, which lists all comments on the file.

## Starting a Discussion

1. Open the **Discussions** panel.
2. Click **+** (**Start a discussion**).
3. Write a question or design decision, then click **Start discussion**.

## Adding a Comment

| File | How |
| :--- | :--- |
| **ERD** | Right-click a table or relationship, then select **Comment**. The table menu also contains **Comment**. |
| **Flowchart** | Right-click a symbol, then select **Comment**. |
| **Notes** | Hover over a block, then click the **Comment** button that appears next to it. |
| **Drawings** | Comments are not available; use the Discussions tab. |

Write your comment in the *Add a comment…* box, then click **Send comment**. A comment marker appears on the object you commented on.

## Replying and Resolving

- Reply in the *Reply…* box, then click **Send reply**.
- Click **Resolve** (or **Resolve Thread** in the comment popover) when the discussion is finished. A resolved thread must be reopened with **Reopen** before anyone can reply to it.
- You can edit your own messages. Individual messages can only be deleted in the Discussions tab.
- **Delete Thread** is only for the thread creator.

Messages are plain text, up to 4,000 characters. `@name` mentions are not available yet.

## Who Can Take Part

| Role | Read | Write, reply, resolve |
| :--- | :---: | :---: |
| Creator, Manager, Editor, Commenter | ✅ | ✅ |
| Viewer | ✅ | — |

Viewers see the notice *You can read this thread but not reply to it.* See [Project Access](../workspace/project-access.md).

## Notifications

Discussion replies and new comments are sent as notifications to the users involved: the file creator and the thread participants. Click a notification to open the file directly at that thread or comment. See [Notifications](./notifications.md).
