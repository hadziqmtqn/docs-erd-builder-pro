---
sidebar_position: 3
slug: /collaboration/live-sync
---
# Live Sync & Load Latest

When several Team members open the same file, ERD Builder Pro lets you know when someone else saves changes. Simultaneous real-time editing (*co-editing*) is not available yet; the app prevents changes from overwriting each other.

## When Someone Else Saves

While a file is open in the editor, the app watches for saves by other users:

- **Read-only users** (Commenter, Viewer): the view updates automatically.
- **Users who can edit**: the notice *Someone else saved this file* appears with a **Load latest** button. The notice stays visible until it is closed.

Click **Load latest** to load the latest version. Your unsaved changes are saved as a recovery copy in the browser before the file reloads.

## When a Conflict Occurs

Every save carries the file version it is based on. If someone else has changed the file since you opened it, your save is rejected and nothing is overwritten. The notice *This file was changed by someone else* appears with the explanation *Your unsaved changes were not sent so nothing is overwritten.* Click **Load latest** to continue from the latest version.

For Notes only: if the only difference is comment markers added by someone else, the changes are merged automatically.

## Access Changes

If your role in the Project changes while the file is open, the message *Your access to this Project changed.* appears and the view adjusts to your new access rights.

## Availability

Live sync runs on Cloud and Self-host while a file is open in the editor. On Cloud, the workspace file list also updates automatically when other members create or change files. Public links are not part of live sync.

To view or restore an earlier version, use [Version History](./version-history.md).
