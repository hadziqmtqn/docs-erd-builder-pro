import React, { memo, useMemo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Database } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';
import { Entity, Column } from './types';

type EntityNodeProps = NodeProps<Node<Entity>>;

const StaticEntityNode = ({ data }: EntityNodeProps) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const { borderColor, headerBg, typeColor } = useMemo(() => ({
    borderColor: data.color || '#3b82f6',
    headerBg: isDark ? `${data.color || '#3b82f6'}15` : `${data.color || '#3b82f6'}0d`,
    typeColor: data.color || '#3b82f6',
  }), [data.color, isDark]);

  const sortedColumns = useMemo(() => {
    const cols = data.columns || [];
    const pk: Column[] = [];
    const fk: Column[] = [];
    const other: Column[] = [];
    for (const col of cols) {
      if (col.is_pk) {
        pk.push(col);
      } else if (col.name.endsWith('_id')) {
        fk.push(col);
      } else {
        other.push(col);
      }
    }
    const result: (Column | string)[] = [...pk];
    if (fk.length) {
      result.push('fk-header');
      result.push(...fk);
    }
    if (other.length) {
      result.push('other-header');
      result.push(...other);
    }
    return result;
  }, [data.columns]);

  const cardBg = isDark ? '#0f0f14' : '#ffffff';
  const textColor = isDark ? 'white' : '#1a1a2e';
  const pkText = isDark ? 'white' : '#0f0f14';
  const normalText = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)';
  const sectionColor = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)';
  const borderLine = isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.06)';
  const pkBadge = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';

  return (
    <div
      style={{
        backgroundColor: cardBg,
        color: textColor,
        borderRadius: '8px',
        border: `2px solid ${borderColor}`,
        minWidth: '200px',
        fontSize: '13px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        cursor: 'grab',
        boxShadow: isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
      }}
    >
      <div
        style={{
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: `2px solid ${borderColor}`,
          backgroundColor: headerBg,
          borderTopLeftRadius: '6px',
          borderTopRightRadius: '6px',
        }}
      >
        <Database size={14} style={{ color: borderColor }} />
        <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {data.name}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sortedColumns.map((item: Column | string) => {
          if (typeof item === 'string') {
            const label = item === 'fk-header' ? 'Foreign Keys' : 'Other';
            return (
              <div key={item} style={{ padding: '4px 12px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: sectionColor, borderBottom: borderLine }}>
                {label}
              </div>
            );
          }
          const col = item;
          return (
            <div
              key={col.id}
              style={{
                position: 'relative',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: borderLine,
              }}
            >
              <Handle
                type="target"
                position={Position.Left}
                id={`col-${col.id}-target`}
                style={{ visibility: 'hidden', left: '-4px', pointerEvents: 'none' }}
              />
              <Handle
                type="source"
                position={Position.Right}
                id={`col-${col.id}-source`}
                style={{ visibility: 'hidden', right: '-4px', pointerEvents: 'none' }}
              />

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: col.is_pk ? pkText : normalText }}>
                  {col.name}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'monospace', color: typeColor, fontWeight: '600' }}>
                  {col.type.toLowerCase()}
                </span>
                {col.is_pk && (
                  <span style={{ fontSize: '9px', fontWeight: 'bold', color: pkBadge, textTransform: 'uppercase' }}>
                    pk
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(StaticEntityNode);
