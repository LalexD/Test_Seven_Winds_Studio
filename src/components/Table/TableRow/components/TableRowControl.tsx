import { forwardRef } from 'react';
import DeleteIcon from 'src/components/icons/DeleteIcon';
import RowIcon from 'src/components/icons/RowIcon';

interface ITableRowControlProps {
  handleAddChild?: () => void;
  handleDelete?: () => void;
}

const TableRowControl = forwardRef<HTMLDivElement, ITableRowControlProps>(({ handleAddChild, handleDelete }, ref) => {
  return (
    <div ref={ref} className="table_row_cell_control">
      <button className="icon-button" onClick={handleAddChild} disabled={!handleAddChild}>
        <RowIcon />
      </button>
      <button className="icon-button" onClick={handleDelete} disabled={!handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
});

export default TableRowControl;
