export interface Column {
  id: string;
  name: string;
  type: string;
  is_pk: boolean;
  is_nullable: boolean;
  enum_values?: string;
  sort_order?: number;
}

export interface Entity {
  [key: string]: unknown;
  id: string;
  name: string;
  color: string;
  columns: Column[];
}

export interface Relationship {
  id: string;
  source_entity_id: string;
  target_entity_id: string;
  source_column_id?: string;
  target_column_id?: string;
  type: string;
  label?: string;
}
