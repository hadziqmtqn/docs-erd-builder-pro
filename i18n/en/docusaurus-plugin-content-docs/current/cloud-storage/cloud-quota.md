---
sidebar_position: 4
slug: /cloud-storage/cloud-quota
---
# Cloud Quotas

Cloud limits the number of files and the amount of storage according to the plan. The limits are set by ERDBPro SaaS and sent to Cloud as an entitlement. Self-host, Desktop, and CLI have no file quota.

## Personal Workspace File Limits

- Each Personal Workspace has a limit on the number of files **per feature**, counted separately for Notes, ERD, Drawings, and Flowcharts.
- The initial limit in Trial or free mode is **3 files per feature**. Paid Cloud plans can set different limits.
- Files in Trash are also counted until they are permanently deleted.

When the limit is reached, creating a new file is rejected with the message *Personal Workspace has reached the limit of &lt;n&gt; &lt;Feature&gt; files.*

## Team Workspace File Limits

The Team quota is separate from Personal and follows the plan of the Team Organization. A Trial plan can limit the number of files per feature. The message is: *This Team has reached the limit of &lt;n&gt; &lt;Feature&gt; files for its plan.*

## Storage

| Workspace | Storage limit |
| :--- | :--- |
| **Personal** | Based on the plan; 25 MB by default |
| **Team** | Based on the Team plan |

- Used storage = document size (including documents in Trash) + images.
- When storage is full, new files and uploads are rejected (*This workspace has used its storage limit. Delete unused images or upgrade the plan.*). Existing files can still be edited.
- Delete unused images in [Library](./library.md) to free up space.

## Viewing Usage

Open **Settings → Usage**. This page shows:
- storage usage, for example *&lt;used&gt; of &lt;limit&gt; used · &lt;left&gt; left*;
- a breakdown of documents and images;
- the warning *Storage is almost full.* or *Storage is full: new files and uploads are refused. Existing files stay editable.*;
- the **Open Library** button;
- the **Upgrade plan** button, for Team Managers only, when usage reaches 80% or more.

## Paid Features

All Cloud feature menus stay visible. Features that are not included in the plan get a **Pro** badge; opening one shows the message *&lt;Feature&gt; needs a paid Cloud plan* with an **Unlock &lt;Feature&gt;** button. Quota rejection messages also include a **View Cloud plans** link.
