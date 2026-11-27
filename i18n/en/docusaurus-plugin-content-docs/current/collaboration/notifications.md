---
sidebar_position: 2
slug: /collaboration/notifications
---
# Notifications

The notification center collects the Team activity you need to know about in one place.

:::info Availability
Notifications are available on Cloud and Self-host (PostgreSQL). Desktop, CLI, Guest, and public link pages do not show them.
:::

## Opening Notifications

Click **Notifications** in the sidebar, below Dashboard. On narrow screens, the bell icon is in the header.

The panel shows:
- the **N unread** count, or *You're all caught up* when everything has been read;
- the **Mark all as read** button;
- the **All** and **This workspace** tabs.

Notifications are grouped by workspace, then by Project. Several replies in the same thread are combined into one item with their count, for example *(3)*.

## Notification Types

| Activity | Who receives it |
| :--- | :--- |
| Discussion replies and new comments | The file creator and thread participants |
| A file is moved to Trash, restored, or moved to another Project | Project maintainers: the Project creator, Team Managers, and Editors |
| Project access is granted or a role is changed | The member whose access changed |
| Added to or removed from a Team | That member |

Notifications are not sent to the whole Team, only to the users involved.

## Opening a Notification

Click an item to mark it as read and open its target: the file with its thread or comment, the Project page, or the Team page. If the item comes from another workspace, the app switches workspaces first. Access is always checked again; items from a Team you can no longer open are marked *&lt;Team&gt; · no longer available*.

Items without a target that can be opened have a **Mark as read** button.

## Updates and Retention

- New notifications arrive in real time while the app is open, and the list reloads when the window becomes active again. The panel loads the 30 most recent notifications.
- Read notifications are deleted after 90 days, and all notifications after 180 days. Self-host administrators can change this with `NOTIFICATION_READ_RETENTION_DAYS` and `NOTIFICATION_RETENTION_DAYS`.
- Self-host stores its own notifications and does not send notifications, file names, or message content to ERDBPro SaaS.

## Badge on the Discussions Button

The badge on the **Discussions** button counts only unread discussions and comments in the file that is currently open. Activity in other files appears in the notification center.
