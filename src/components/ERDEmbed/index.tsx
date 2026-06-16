import React from 'react';
import { 
  ReactFlow, 
  Background, 
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useColorMode } from '@docusaurus/theme-common';
import StaticEntityNode from './StaticEntityNode';

const nodeTypes = {
  entity: StaticEntityNode,
};

export default function ERDEmbed({ height = '400px', nodes = [], edges = [] }) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div style={{
      width: '100%',
      height,
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
      borderRadius: '12px',
      overflow: 'hidden',
      margin: '2rem 0',
      backgroundColor: isDark ? '#111' : '#f4f5f7',
    }}>
      <ReactFlow
        defaultNodes={nodes}
        defaultEdges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.15}
        maxZoom={1.5}
        colorMode={colorMode}
        nodesConnectable={false}
        nodesDraggable={true}
        nodesFocusable={false}
        elementsSelectable={false}
      >
        <Background
          variant={BackgroundVariant.Lines}
          gap={40}
          size={1}
          color={isDark ? '#222' : '#d4d4d8'}
        />
      </ReactFlow>
    </div>
  );
}
