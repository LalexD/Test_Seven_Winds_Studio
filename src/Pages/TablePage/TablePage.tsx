import SideMenu from 'src/components/SideMenu/SideMenu';
import Table from 'src/components/Table/Table';
import Tabs from 'src/components/Tabs/Tabs';
import TopMenu from 'src/components/TopMenu/TopMenu';

const TablePage = () => {
  return (
    <div className="full-page container-flex-column">
      <TopMenu />
      <div className="container-with-sidebar">
        <SideMenu />
        <div className="container-with-sidebar_main">
          <Tabs tabs={[{ title: 'Строительно-монтажные работы' }]} />
          <Table />
        </div>
      </div>
    </div>
  );
};

export default TablePage;
