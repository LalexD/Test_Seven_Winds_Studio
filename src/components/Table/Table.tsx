import { ITableSchemaItem } from 'src/components/Table/Table.types';
import './Table.style.sass';
import TableRow from 'src/components/Table/TableRow/TableRow';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/store/storeHooks';
import { dataTableSelector, fetchRowsTable } from 'src/lib/store/tableSlice/tableSlice';
import { DEF_NEW_ROW, ENTITY_ID } from 'src/lib/constants';
import { TreeResponse } from 'src/api/Api';

const schema: ITableSchemaItem<TreeResponse>[] = [
  { key: 'child', label: 'Уровень', type: 'control' },
  { key: 'rowName', label: 'Наименование работ', type: 'string' },
  { key: 'mainCosts', label: 'Основная з/п', type: 'number' },
  { key: 'equipmentCosts', label: 'Оборудование', type: 'number' },
  { key: 'overheads', label: 'Накладные расходы', type: 'number' },
  { key: 'estimatedProfit', label: 'Сметная прибыль', type: 'number' },
];

const Table = () => {
  const data = useAppSelector(dataTableSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRowsTable(ENTITY_ID));
  }, []);

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {schema.map((head) => (
              <th key={head.label}>{head.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item) => <TableRow key={item.id} item={item} schema={schema} />)
          ) : (
            <TableRow item={DEF_NEW_ROW} schema={schema} isNewRow />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
