import { MarkerType } from '@xyflow/react';

export const supabaseNodes = [
  {
    id: 'projects',
    type: 'entity',
    position: { x: 0, y: 200 },
    data: {
      id: 'projects',
      name: 'projects',
      color: '#8b5cf6',
      columns: [
        { id: 'p1', name: 'id', type: 'bigserial', is_pk: true, is_nullable: false },
        { id: 'p2', name: 'uid', type: 'uuid', is_pk: false, is_nullable: true },
        { id: 'p3', name: 'name', type: 'text', is_pk: false, is_nullable: false },
        { id: 'p4', name: 'user_id', type: 'uuid', is_pk: false, is_nullable: true },
        { id: 'p5', name: 'is_deleted', type: 'boolean', is_pk: false, is_nullable: true },
        { id: 'p6', name: 'created_at', type: 'timestamptz', is_pk: false, is_nullable: true },
        { id: 'p7', name: 'is_public', type: 'boolean', is_pk: false, is_nullable: true },
      ]
    }
  },
  {
    id: 'diagrams',
    type: 'entity',
    position: { x: 350, y: 0 },
    data: {
      id: 'diagrams',
      name: 'diagrams',
      color: '#ec4899',
      columns: [
        { id: 'd1', name: 'id', type: 'bigserial', is_pk: true, is_nullable: false },
        { id: 'd2', name: 'project_id', type: 'bigint', is_pk: false, is_nullable: true },
        { id: 'd3', name: 'name', type: 'text', is_pk: false, is_nullable: false },
        { id: 'd4', name: '_version', type: 'integer', is_pk: false, is_nullable: true },
        { id: 'd5', name: 'source_type', type: 'text', is_pk: false, is_nullable: true },
        { id: 'd6', name: 'data', type: 'text', is_pk: false, is_nullable: true },
      ]
    }
  },
  {
    id: 'notes',
    type: 'entity',
    position: { x: 350, y: 350 },
    data: {
      id: 'notes',
      name: 'notes',
      color: '#f59e0b',
      columns: [
        { id: 'n1', name: 'id', type: 'bigserial', is_pk: true, is_nullable: false },
        { id: 'n2', name: 'project_id', type: 'bigint', is_pk: false, is_nullable: true },
        { id: 'n3', name: 'title', type: 'text', is_pk: false, is_nullable: false },
        { id: 'n4', name: 'content', type: 'text', is_pk: false, is_nullable: true },
        { id: 'n5', name: '_version', type: 'integer', is_pk: false, is_nullable: true },
      ]
    }
  },
  {
    id: 'drawings',
    type: 'entity',
    position: { x: 0, y: 500 },
    data: {
      id: 'drawings',
      name: 'drawings',
      color: '#22d3ee',
      columns: [
        { id: 'dr1', name: 'id', type: 'bigserial', is_pk: true, is_nullable: false },
        { id: 'dr2', name: 'project_id', type: 'bigint', is_pk: false, is_nullable: true },
        { id: 'dr3', name: 'title', type: 'text', is_pk: false, is_nullable: false },
        { id: 'dr4', name: 'data', type: 'text', is_pk: false, is_nullable: true },
        { id: 'dr5', name: '_version', type: 'integer', is_pk: false, is_nullable: true },
      ]
    }
  },
  {
    id: 'flowcharts',
    type: 'entity',
    position: { x: 700, y: 300 },
    data: {
      id: 'flowcharts',
      name: 'flowcharts',
      color: '#2dd4bf',
      columns: [
        { id: 'f1', name: 'id', type: 'bigserial', is_pk: true, is_nullable: false },
        { id: 'f2', name: 'project_id', type: 'bigint', is_pk: false, is_nullable: true },
        { id: 'f3', name: 'title', type: 'text', is_pk: false, is_nullable: false },
        { id: 'f4', name: 'data', type: 'text', is_pk: false, is_nullable: true },
        { id: 'f5', name: '_version', type: 'integer', is_pk: false, is_nullable: true },
      ]
    }
  },
  {
    id: 'entities',
    type: 'entity',
    position: { x: 1050, y: -100 },
    data: {
      id: 'entities',
      name: 'entities',
      color: '#3b82f6',
      columns: [
        { id: 'en1', name: 'id', type: 'text', is_pk: true, is_nullable: false },
        { id: 'en2', name: 'diagram_id', type: 'bigint', is_pk: false, is_nullable: true },
        { id: 'en3', name: 'name', type: 'text', is_pk: false, is_nullable: false },
        { id: 'en4', name: 'x', type: 'float', is_pk: false, is_nullable: false },
        { id: 'en5', name: 'y', type: 'float', is_pk: false, is_nullable: false },
        { id: 'en6', name: 'color', type: 'text', is_pk: false, is_nullable: true },
      ]
    }
  },
  {
    id: 'columns',
    type: 'entity',
    position: { x: 1400, y: -100 },
    data: {
      id: 'columns',
      name: 'columns',
      color: '#10b981',
      columns: [
        { id: 'c1', name: 'id', type: 'text', is_pk: true, is_nullable: false },
        { id: 'c2', name: 'entity_id', type: 'text', is_pk: false, is_nullable: true },
        { id: 'c3', name: 'name', type: 'text', is_pk: false, is_nullable: false },
        { id: 'c4', name: 'type', type: 'text', is_pk: false, is_nullable: false },
        { id: 'c5', name: 'is_pk', type: 'boolean', is_pk: false, is_nullable: true },
        { id: 'c6', name: 'is_nullable', type: 'boolean', is_pk: false, is_nullable: true },
      ]
    }
  },
  {
    id: 'relationships',
    type: 'entity',
    position: { x: 1050, y: 200 },
    data: {
      id: 'relationships',
      name: 'relationships',
      color: '#ef4444',
      columns: [
        { id: 'r1', name: 'id', type: 'text', is_pk: true, is_nullable: false },
        { id: 'r2', name: 'diagram_id', type: 'bigint', is_pk: false, is_nullable: true },
        { id: 'r3', name: 'source_entity_id', type: 'text', is_pk: false, is_nullable: true },
        { id: 'r4', name: 'target_entity_id', type: 'text', is_pk: false, is_nullable: true },
        { id: 'r5', name: 'type', type: 'text', is_pk: false, is_nullable: true },
      ]
    }
  },
  {
    id: 'entity_changes',
    type: 'entity',
    position: { x: 1400, y: 250 },
    data: {
      id: 'entity_changes',
      name: 'entity_changes',
      color: '#6366f1',
      columns: [
        { id: 'ec1', name: 'id', type: 'bigserial', is_pk: true, is_nullable: false },
        { id: 'ec2', name: 'entity_type', type: 'text', is_pk: false, is_nullable: false },
        { id: 'ec3', name: 'entity_id', type: 'text', is_pk: false, is_nullable: false },
        { id: 'ec4', name: 'version', type: 'integer', is_pk: false, is_nullable: false },
        { id: 'ec5', name: 'changes', type: 'jsonb', is_pk: false, is_nullable: false },
      ]
    }
  }
];

export const supabaseEdges = [
  { id: 'e-p-d', source: 'projects', target: 'diagrams', sourceHandle: 'col-p1-source', targetHandle: 'col-d2-target', style: { stroke: '#8b5cf6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  { id: 'e-p-n', source: 'projects', target: 'notes', sourceHandle: 'col-p1-source', targetHandle: 'col-n2-target', style: { stroke: '#8b5cf6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  { id: 'e-p-dr', source: 'projects', target: 'drawings', sourceHandle: 'col-p1-source', targetHandle: 'col-dr2-target', style: { stroke: '#8b5cf6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  { id: 'e-p-f', source: 'projects', target: 'flowcharts', sourceHandle: 'col-p1-source', targetHandle: 'col-f2-target', style: { stroke: '#8b5cf6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  { id: 'e-d-en', source: 'diagrams', target: 'entities', sourceHandle: 'col-d1-source', targetHandle: 'col-en2-target', style: { stroke: '#ec4899', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ec4899' } },
  { id: 'e-d-r', source: 'diagrams', target: 'relationships', sourceHandle: 'col-d1-source', targetHandle: 'col-r2-target', style: { stroke: '#ec4899', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ec4899' } },
  { id: 'e-en-c', source: 'entities', target: 'columns', sourceHandle: 'col-en1-source', targetHandle: 'col-c2-target', style: { stroke: '#3b82f6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
];
