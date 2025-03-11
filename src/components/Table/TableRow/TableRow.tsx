import { ITableSchemaItem } from 'src/components/Table/Table.types';
import './TableRow.style.sass';
import { useAppDispatch, useAppSelector } from 'src/lib/store/storeHooks';
import {
  createRowTable,
  deleteRowTable,
  isCountChangeTableSelector,
  isEditableTableSelector,
  isParentNewItemTableSelector,
  setEditableRow,
  setNewItemParentIdRow,
  updateRowTable,
} from 'src/lib/store/tableSlice/tableSlice';
import { useEffect, useRef, useState } from 'react';
import { DEF_NEW_ROW, ENTITY_ID } from 'src/lib/constants';
import { OutlayRowRequest, TreeResponse } from 'src/api/Api';
import TableRowEdit from 'src/components/Table/TableRow/components/TableRowEdit';
import TableRowView from 'src/components/Table/TableRow/components/TableRowView';
import TableRowControl from 'src/components/Table/TableRow/components/TableRowControl';
import ConnectLine from 'src/components/Table/TableRow/components/ConnectLine';

export interface ITableRowProps<T extends TreeResponse> {
  item: T;
  schema: ITableSchemaItem<T>[];
  level?: number;
  parentRef?: React.RefObject<HTMLDivElement>;
  isNewRow?: boolean;
  parentId?: number;
}

const TableRow = <T extends TreeResponse>(props: ITableRowProps<T>) => {
  const { item, schema, level = 0, parentRef, isNewRow, parentId } = props;
  const controlRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const isEditable = useAppSelector((state) => isEditableTableSelector(state, item.id));
  const isNewChild = useAppSelector((state) => isParentNewItemTableSelector(state, item.id));
  const isCountTableChange = useAppSelector(isCountChangeTableSelector);
  const [newItem, setNewItem] = useState<T | null>(null);

  useEffect(() => {
    if (item !== newItem) {
      setNewItem(item);
    }
  }, [isEditable]);

  const handleActivateEditable = () => {
    dispatch(setNewItemParentIdRow(null));
    dispatch(setEditableRow(item.id));
  };

  const handleUpdateItem = (newItem: T) => {
    dispatch(updateRowTable({ eId: ENTITY_ID, rId: item.id, outlayRowUpdateRequest: newItem }));
  };

  const handleAddChildren = () => {
    dispatch(setEditableRow(null));
    dispatch(setNewItemParentIdRow(item.id));
  };

  const handleCreateRow = (newItem: T) => {
    const itemReq: OutlayRowRequest = {
      ...newItem,
      parentId: parentId,
    };
    dispatch(createRowTable({ eId: ENTITY_ID, outlayRowRequest: itemReq }));
  };

  const handleDeleteRow = (item: T) => {
    if (isNewRow) {
      dispatch(setEditableRow(null));
      dispatch(setNewItemParentIdRow(null));
    } else {
      dispatch(deleteRowTable({ eId: ENTITY_ID, rId: item.id }));
    }
  };

  const controlCell = (
    <div className="table_row_cell_control_wrapper" style={{ marginLeft: `${20 * level}px` }}>
      <TableRowControl
        ref={controlRef}
        handleAddChild={!isNewRow ? handleAddChildren : undefined}
        handleDelete={() => handleDeleteRow(item)}
      />
      {controlRef && parentRef && (
        <ConnectLine childRef={controlRef} parentRef={parentRef} isNeedUpdate={isCountTableChange} />
      )}
    </div>
  );

  if (isNewRow) return <TableRowEdit handleSave={handleCreateRow} controlCell={controlCell} {...props} />;

  return (
    <>
      {isEditable ? (
        <TableRowEdit handleSave={handleUpdateItem} controlCell={controlCell} {...props} />
      ) : (
        <TableRowView doubleClick={handleActivateEditable} controlCell={controlCell} {...props} />
      )}
      {item.child &&
        item.child.length > 0 &&
        item.child.map((child) => (
          <TableRow key={child.id} item={child as T} schema={schema} level={level + 1} parentRef={controlRef} />
        ))}
      {isNewChild && (
        <TableRow
          item={DEF_NEW_ROW as unknown as T}
          schema={schema}
          level={level + 1}
          parentRef={controlRef}
          isNewRow
          parentId={item.id}
        />
      )}
    </>
  );
};

export default TableRow;
