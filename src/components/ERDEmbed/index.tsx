import React from 'react';
import { 
  ReactFlow, 
  Background, 
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import StaticEntityNode from './StaticEntityNode';

const nodeTypes = {
  entity: StaticEntityNode,
};

export default function ERDEmbed({ height = '400px', nodes = [], edges = [] }) {
  return (
    <div style={{ width: '100%', height, border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden', margin: '2rem 0', backgroundColor: '#111' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        colorMode="dark"
        nodesConnectable={false}
        nodesDraggable={true}
        elementsSelectable={false}
      >
        <Background variant={BackgroundVariant.Lines} gap={40} size={1} color="#222" />
      </ReactFlow>
    </div>
  );
}
