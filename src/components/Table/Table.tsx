import { ITableSchemaItem } from 'src/components/Table/Table.types';
import './Table.style.sass';

interface ITableProps<T, U extends keyof T = keyof T> {
  schema: ITableSchemaItem<U>[];
  data: T[];
}

const Table = <T,>({ schema, data }: ITableProps<T>) => {
  return (
    <div>
      {data.map((row) => (
        <div className="table_cell"> {JSON.stringify(row)}</div>
      ))}
    </div>
  );
};

export default Table;
