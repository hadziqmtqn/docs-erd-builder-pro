import React, { useState, useEffect } from 'react';
import { Maximize2, X } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';
import ERDEmbed from './index';

interface Props {
  height?: string;
  nodes: any[];
  edges: any[];
}

export default function FullscreenERD({ height = '400px', nodes, edges }: Props) {
  const [open, setOpen] = useState(false);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <ERDEmbed height={height} nodes={nodes} edges={edges} />
        <button
          onClick={() => setOpen(true)}
          title="Fullscreen"
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: 6,
            color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            padding: 0,
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
          }}
        >
          <Maximize2 size={14} />
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'calc(100vw - 32px)',
              height: 'calc(100dvh - 32px)',
              borderRadius: 12,
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              title="Close"
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 20,
                background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                borderRadius: 8,
                color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                padding: 0,
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)';
              }}
            >
              <X size={18} />
            </button>
            <ERDEmbed height="100%" nodes={nodes} edges={edges} />
          </div>
        </div>
      )}
    </>
  );
}
