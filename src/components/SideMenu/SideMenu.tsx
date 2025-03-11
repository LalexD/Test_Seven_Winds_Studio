import TableIcon from 'src/components/icons/TableIcon';
import './SideMenu.style.sass';
import ArrowDownIcon from 'src/components/icons/ArrowDownIcon';

const DEF_PROJECT_ITEMS = [
  'По проекту',
  'Объекты',
  'РД',
  'MTO',
  'СМР',
  'График',
  'МиМ',
  'Рабочие',
  'Капвложения',
  'Бюджет',
  'Финансирование',
  'Панорамы',
  'Камеры',
  'Поручения',
  'Контрагенты',
];
const DEF_PROJECT = { name: 'Название проекта', shortName: 'Аббревиатура' };

interface ISideMenuProps {
  project?: { name: string; shortName: string };
  items?: string[];
}
const SideMenu = ({ project = DEF_PROJECT, items = DEF_PROJECT_ITEMS }: ISideMenuProps) => {
  const activeItem = 'СМР';
  return (
    <div className="side-menu">
      <div className="side-menu_header">
        <div className="side-menu_header_title_container">
          <span className="side-menu_header_title">{project.name}</span>
          <span className="side-menu_header_subtitle">{project.shortName}</span>
        </div>
        <div className="side-menu_header_icon">
          <ArrowDownIcon />
        </div>
      </div>
      <ul className="side-menu_list">
        {items.map((item) => (
          <li key={item} className={`side-menu_list_item ${activeItem === item && 'active'}`}>
            <div className="side-menu_list_item_icon">
              <TableIcon />
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
