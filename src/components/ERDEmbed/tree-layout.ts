export function treePositions(
  roots: string[],
  children: Record<string, string[]>,
  gapX = 350,
  gapY = 80,
): Record<string, { x: number; y: number }> {
  const depth: Record<string, number> = {};
  const ySlot: Record<string, number> = {};
  let currentY = 0;

  // BFS depth
  const q = [...roots];
  for (const r of roots) depth[r] = 0;
  for (const node of q) {
    for (const child of children[node] || []) {
      if (!(child in depth)) {
        depth[child] = depth[node] + 1;
        q.push(child);
      }
    }
  }

  // DFS y-slot (Reingold–Tilford: parent centered over children)
  function walk(id: string) {
    const kids = children[id] || [];
    if (kids.length === 0) {
      ySlot[id] = currentY++;
      return;
    }
    for (const k of kids) walk(k);
    const ys = kids.map((k) => ySlot[k]);
    ySlot[id] = (Math.min(...ys) + Math.max(...ys)) / 2;
  }

  for (const r of roots) {
    walk(r);
    currentY += 0.5;
  }

  const result: Record<string, { x: number; y: number }> = {};
  for (const id of Object.keys(depth)) {
    result[id] = { x: depth[id] * gapX, y: ySlot[id] * gapY };
  }
  return result;
}
