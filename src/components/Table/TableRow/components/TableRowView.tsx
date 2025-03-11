import { ITableSchemaItem } from 'src/components/Table/Table.types';
import '../TableRow.style.sass';
import { TreeResponse } from 'src/api/Api';
import { ITableRowProps } from 'src/components/Table/TableRow/TableRow';

interface ITableRowViewProps<T extends TreeResponse> extends Pick<ITableRowProps<T>, 'item' | 'schema' | 'level'> {
  doubleClick: () => void;
  controlCell: JSX.Element;
}

const TableRowView = <T extends TreeResponse>({ item, schema, doubleClick, controlCell }: ITableRowViewProps<T>) => {
  const renderCell = (col: ITableSchemaItem<T>) => {
    const value = String(item[col.key]);
    switch (col.type) {
      case 'control':
        return controlCell;
      case 'number':
      case 'string':
        return String(value);
    }
  };

  return (
    <tr className={`table_row`} onDoubleClick={doubleClick}>
      {schema.map((col) => (
        <td key={String(col.key)}>{renderCell(col)}</td>
      ))}
    </tr>
  );
};

export default TableRowView;
