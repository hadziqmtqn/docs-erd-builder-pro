import { MarkerType } from '@xyflow/react';

export const dbNodes = [
  {
    id: 'projects',
    type: 'entity',
    position: { x: 0, y: 150 },
    data: {
      id: 'projects',
      name: 'projects',
      color: '#8b5cf6',
      columns: [
        { id: 'p1', name: 'id', type: 'bigserial', is_pk: true },
        { id: 'p2', name: 'uid', type: 'uuid', is_pk: false },
        { id: 'p3', name: 'name', type: 'text', is_pk: false },
        { id: 'p4', name: 'user_id', type: 'uuid', is_pk: false },
      ]
    }
  },
  {
    id: 'diagrams',
    type: 'entity',
    position: { x: 300, y: 0 },
    data: {
      id: 'diagrams',
      name: 'diagrams',
      color: '#ec4899',
      columns: [
        { id: 'd1', name: 'id', type: 'bigserial', is_pk: true },
        { id: 'd2', name: 'project_id', type: 'bigint', is_pk: false },
        { id: 'd3', name: 'name', type: 'text', is_pk: false },
        { id: 'd4', name: '_version', type: 'integer', is_pk: false },
      ]
    }
  },
  {
    id: 'notes',
    type: 'entity',
    position: { x: 300, y: 300 },
    data: {
      id: 'notes',
      name: 'notes',
      color: '#f59e0b',
      columns: [
        { id: 'n1', name: 'id', type: 'bigserial', is_pk: true },
        { id: 'n2', name: 'project_id', type: 'bigint', is_pk: false },
        { id: 'n3', name: 'title', type: 'text', is_pk: false },
        { id: 'n4', name: '_version', type: 'integer', is_pk: false },
      ]
    }
  },
  {
    id: 'entities',
    type: 'entity',
    position: { x: 650, y: -150 },
    data: {
      id: 'entities',
      name: 'entities',
      color: '#3b82f6',
      columns: [
        { id: 'en1', name: 'id', type: 'text', is_pk: true },
        { id: 'en2', name: 'diagram_id', type: 'bigint', is_pk: false },
        { id: 'en3', name: 'name', type: 'text', is_pk: false },
      ]
    }
  },
  {
    id: 'columns',
    type: 'entity',
    position: { x: 1000, y: -150 },
    data: {
      id: 'columns',
      name: 'columns',
      color: '#10b981',
      columns: [
        { id: 'c1', name: 'id', type: 'text', is_pk: true },
        { id: 'c2', name: 'entity_id', type: 'text', is_pk: false },
        { id: 'c3', name: 'name', type: 'text', is_pk: false },
        { id: 'c4', name: 'type', type: 'text', is_pk: false },
      ]
    }
  },
  {
    id: 'relationships',
    type: 'entity',
    position: { x: 650, y: 150 },
    data: {
      id: 'relationships',
      name: 'relationships',
      color: '#ef4444',
      columns: [
        { id: 'r1', name: 'id', type: 'text', is_pk: true },
        { id: 'r2', name: 'diagram_id', type: 'bigint', is_pk: false },
        { id: 'r3', name: 'source_entity_id', type: 'text', is_pk: false },
        { id: 'r4', name: 'target_entity_id', type: 'text', is_pk: false },
      ]
    }
  },
  {
    id: 'entity_changes',
    type: 'entity',
    position: { x: 1000, y: 250 },
    data: {
      id: 'entity_changes',
      name: 'entity_changes',
      color: '#6366f1',
      columns: [
        { id: 'ec1', name: 'id', type: 'bigserial', is_pk: true },
        { id: 'ec2', name: 'entity_id', type: 'text', is_pk: false },
        { id: 'ec3', name: 'changes', type: 'jsonb', is_pk: false },
        { id: 'ec4', name: 'version', type: 'integer', is_pk: false },
      ]
    }
  }
];

export const dbEdges = [
  // Projects to Children
  { id: 'e-p-d', source: 'projects', target: 'diagrams', sourceHandle: 'col-p1-source', targetHandle: 'col-d2-target', style: { stroke: '#8b5cf6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  { id: 'e-p-n', source: 'projects', target: 'notes', sourceHandle: 'col-p1-source', targetHandle: 'col-n2-target', style: { stroke: '#8b5cf6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#8b5cf6' } },
  
  // Diagrams to Components
  { id: 'e-d-en', source: 'diagrams', target: 'entities', sourceHandle: 'col-d1-source', targetHandle: 'col-en2-target', style: { stroke: '#ec4899', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ec4899' } },
  { id: 'e-d-r', source: 'diagrams', target: 'relationships', sourceHandle: 'col-d1-source', targetHandle: 'col-r2-target', style: { stroke: '#ec4899', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ec4899' } },
  
  // Entities to Columns
  { id: 'e-en-c', source: 'entities', target: 'columns', sourceHandle: 'col-en1-source', targetHandle: 'col-c2-target', style: { stroke: '#3b82f6', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } }
];
