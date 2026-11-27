---
sidebar_position: 6
slug: /core-features/flowcharts
---
# Flowcharts

![Flowchart Toolbar](/img/docs/flowchart-toolbar.png)

**Flowchart** is used to visualize logic flows, business processes, or algorithm sequences in your application.

## Toolbar

| Button | Function |
| :--- | :--- |
| **Auto Layout** | Rearranges symbol positions based on their connection flow. |
| **Add Symbol** | Adds a new symbol. |
| **Undo** / **Redo** | Undoes or redoes a change. |
| **Clear Canvas** | Clears the canvas. |

## Symbol Types

| Shape | Use |
| :--- | :--- |
| **Oval (Start/End)** | Start or end of a flow |
| **Rectangle (Process)** | Step or operation |
| **Diamond (Decision)** | Yes/No branch |
| **Parallelogram (Input/Output)** | Data input or output |
| **Cylinder (Database)** | Data storage |
| **Document** | Document or report |
| **Cloud (External System)** | External system |
| **Circle (Connector)** | Link between parts of a flow |

## Creating a Flow

1. Click **Add Symbol**. In the **Create New Symbol** dialog, fill in the label, **Group Title** (optional, for grouping symbols), **Shape Type**, and **Color**.
2. Connect two symbols by dragging a line from a connection point on one symbol to the other symbol.
3. Click a line to open **Connector Properties**: **Text Label**, **Line Style** (*Solid Line* or *Dashed Line*), and **Arrow Style** (arrow at the end, at the start, at both ends, or no arrow).
4. Click a symbol to edit it in **Symbol Properties**.

## Auto Layout

Click **Auto Layout** when symbols get cluttered or overlap. The system rearranges the symbols to follow the direction of their connections.

## AI Assistant

AI Assistant can create or continue a flowchart from a text description. Changes from AI are reviewed first in **Preview Flowchart Changes** before they are applied. See [AI Integration](./ai-integration.md).

## Collaboration and History

- In a Team Workspace, right-click a symbol and choose **Comment**. See [Comments & Discussions](../collaboration/comments-discussions.md).
- Saved changes can be restored from [Version History](../collaboration/version-history.md).

## Export

Exporting a Flowchart to an image or PDF is currently not available. A Flowchart can still be shared with a [public link](../collaboration/public-share.md).
