import SideMenu from 'src/components/SideMenu/SideMenu';
import Table from 'src/components/Table/Table';
import Tabs from 'src/components/Tabs/Tabs';
import TopMenu from 'src/components/TopMenu/TopMenu';

// {
//   "id": 148646,
//   "rowName": "6620b3db-edc4-4903-a9d4-2c288b7a305e"
// }

interface IData {
  id: number;
  title: string;
  basic: number;
}

const data: IData[] = [
  { id: 1, title: 'Южная строительная площадка', basic: 20345 },
  { id: 1, title: 'Южная строительная площадка', basic: 20345 },
  { id: 1, title: 'Южная строительная площадка', basic: 20345 },
  { id: 1, title: 'Южная строительная площадка', basic: 20345 },
];

const schema: { key: keyof IData; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Наименование работ' },
  { key: 'basic', label: 'Основная з/п' },
];

const TablePage = () => {
  return (
    <div className="full-page container-flex-column">
      <TopMenu />
      <div className="container-flex-row">
        <SideMenu />
        <div className="container-flex-column">
          <Tabs tabs={[{ title: 'Строительно-монтажные работы' }]} />
          <Table schema={schema} data={data} />
        </div>
      </div>
    </div>
  );
};

export default TablePage;
