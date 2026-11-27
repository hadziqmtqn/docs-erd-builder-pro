---
sidebar_position: 1
slug: /workspace/personal-team-workspace
---
# Personal & Team Workspace

Every account has one private **Personal Workspace**. Where available, an account can also be a member of one or more **Team Workspaces** for working together.

| Workspace | Contents | Who can see it |
| :--- | :--- | :--- |
| **Personal** | Your own Projects and files | Only you |
| **Team** | Projects and files owned by the Team | All active Team members, according to their [Project roles](./project-access.md) |

## Availability

| Option | Team Workspace |
| :--- | :--- |
| **Cloud** | Yes. Teams are created and managed in ERDBPro SaaS, with a Trial or Cloud subscription per Team. |
| **Self-host (PostgreSQL)** | Yes, after the SuperAdmin activates a Self-host Commercial license. |
| **Self-host Supabase (legacy)** | No. |
| **Desktop and CLI** | No. Personal only. |

## Switching Workspaces

The workspace switcher is at the top of the sidebar, below the **ERD Builder Pro** label.

1. Click the active workspace name.
2. Select **Personal** in the **Workspace** group, or a Team in the **Teams** group.

Unsaved changes are saved first, then **Loading workspace…** appears. The last selected workspace is remembered in the browser. If there is no Team yet, the switcher shows only the workspace name.

A gear icon (**Manage team**) appears next to Teams you manage.

## Team Roles

| Role | Rights |
| :--- | :--- |
| **Manager** | Manages the Team and its members, and has full access to all Team Projects. |
| **Staff** | Works in Team Projects according to the assigned Project role. |

Per-Project roles (Creator, Manager, Editor, Commenter, Viewer) are described in [Project Access](./project-access.md).

## Teams on Self-host

### Enabling Teams
Teams require a Self-host Commercial license that is active in **Settings → Application License**. Without a license, a SuperAdmin who clicks **Add Team** sees the **Unlock Teams** dialog with the options **Buy license** and **Activate key**.

### Creating a Team
Only the SuperAdmin can create Teams.

1. Open the workspace switcher, then click **Add Team**.
2. Fill in **Team name**, then click **Add Team**.

If the number of Teams has reached the license limit, the message **Team limit reached** appears.

### Managing Members
Team Managers and the SuperAdmin manage members from the Team page (the **Manage team** icon, or the **Instance Administration → Team** sidebar menu for the SuperAdmin).

1. Click **Add member**.
2. Fill in **Email**, then choose the **Manager** or **Staff** role (default: Staff).
3. If the user does not have an account yet, check **Create a new account** and fill in **Temporary password**.

Each member's menu contains **Deactivate member**, **Reactivate member**, and **Ban member** (SuperAdmin only).

Rules:
- The SuperAdmin cannot be a Team member.
- Every Team must have at least one Manager.
- A Manager cannot deactivate their own membership.
- An active member of several Teams counts once toward the license member quota.

Users whose Teams are all unusable, for example because the license is not active, are refused at login with a message such as *Your Team license is not active. Contact the SuperAdmin.*

## Teams on Cloud

- A Team is an Organization of type Team in ERDBPro SaaS. Creating Teams, inviting and removing members, changing roles, and managing subscriptions are done in SaaS.
- On Cloud, the **Manage team** icon and the Team page lead to ERDBPro SaaS (**Open ERDBPro SaaS**). The **Manage account & billing** sidebar menu opens your account in SaaS.
- Owners and Managers in SaaS become **Manager** on Cloud; Staff become **Staff**.
- When a Team's Trial or subscription ends, access to that Team is closed but its data is kept. Personal Workspace and other Teams are not affected.
