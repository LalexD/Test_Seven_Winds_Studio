export type CellType = 'control' | 'string' | 'number';

export interface ITableSchemaItem<T> {
  key: keyof T;
  label: string;
  type: CellType;
}

export interface ITableItemBase {
  id: number;
  child?: ITableItemBase[];
}
