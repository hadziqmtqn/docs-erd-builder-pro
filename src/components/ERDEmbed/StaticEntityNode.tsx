import React, { memo, useMemo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Database } from 'lucide-react';
import { Entity, Column } from './types';

type EntityNodeProps = NodeProps<Node<Entity>>;

const StaticEntityNode = ({ data }: EntityNodeProps) => {
  const { borderColor, headerBg, typeColor } = useMemo(() => ({
    borderColor: data.color || '#3b82f6',
    headerBg: `${data.color || '#3b82f6'}15`,
    typeColor: data.color || '#3b82f6',
  }), [data.color]);

  return (
    <div 
      style={{ 
        backgroundColor: '#0f0f14',
        color: 'white',
        borderRadius: '8px',
        border: `2px solid ${borderColor}`,
        minWidth: '200px',
        fontSize: '13px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Header */}
      <div 
        style={{ 
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: `2px solid ${borderColor}`,
          backgroundColor: headerBg,
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px'
        }}
      >
        <Database size={14} style={{ color: borderColor }} />
        <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {data.name}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {data.columns.map((col: Column) => (
          <div 
            key={col.id} 
            style={{ 
              position: 'relative',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            {/* Handles for connections */}
            <Handle
              type="target"
              position={Position.Left}
              id={`col-${col.id}-target`}
              style={{ visibility: 'hidden', left: '-4px' }}
            />
            <Handle
              type="source"
              position={Position.Right}
              id={`col-${col.id}-source`}
              style={{ visibility: 'hidden', right: '-4px' }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: col.is_pk ? 'white' : 'rgba(255,255,255,0.8)' }}>
                {col.name}
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontFamily: 'monospace', color: typeColor, fontWeight: '600' }}>
                {col.type.toLowerCase()}
              </span>
              {col.is_pk && (
                <span style={{ fontSize: '9px', fontWeight: 'bold', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                  pk
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(StaticEntityNode);
