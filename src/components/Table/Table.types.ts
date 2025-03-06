type CellType = 'string' | 'number';

export interface ITableSchemaItem<U> {
  key: U;
  label: string;
  type?: CellType;
}
