import '../TableRow.style.sass';
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import { TreeResponse } from 'src/api/Api';
import { ITableRowProps } from 'src/components/Table/TableRow/TableRow';
import TableRowControl from 'src/components/Table/TableRow/components/TableRowControl';

interface ITableRowEditProps<T extends TreeResponse> extends Pick<ITableRowProps<T>, 'item' | 'schema' | 'level'> {
  handleSave: (item: T) => void;
  controlCell: JSX.Element;
}

const TableRowEdit = <T extends TreeResponse>({ item, schema, handleSave, controlCell }: ITableRowEditProps<T>) => {
  const [newItem, setNewItem] = useState(item);
  const isFirstFocus = useRef<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: keyof T) => {
    setNewItem((item) => ({ ...item, [key]: e.target.value }));
  };

  const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave(newItem);
    }
  };

  const renderCell = (col: (typeof schema)[number]) => {
    switch (col.type) {
      case 'control':
        return controlCell;
      case 'number':
      case 'string':
        const value = String(newItem[col.key]);
        const isFocus = isFirstFocus.current;
        if (isFirstFocus.current) isFirstFocus.current = false;
        return (
          <input
            value={value}
            onChange={(e) => handleChange(e, col.key)}
            onKeyDown={onKeyDownEnter}
            autoFocus={isFocus}
          />
        );
    }
  };

  return (
    <tr className={`table_row table_row_editable`}>
      {schema.map((col) => (
        <td key={`${newItem.id}_${String(col.label)}`}>{renderCell(col)}</td>
      ))}
    </tr>
  );
};

export default TableRowEdit;
