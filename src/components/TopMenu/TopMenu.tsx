import './TopMenu.sass';
import MenuIcon from 'src/components/icons/MenuIcon';
import BackIcon from 'src/components/icons/BackIcon';

const TopMenu = () => {
  return (
    <menu className="top-menu">
      <li>
        <button className="top-menu_button-icon">
          <MenuIcon />
        </button>
      </li>
      <li>
        <button className="top-menu_button-icon">
          <BackIcon />
        </button>
      </li>
      <li>
        <button className="top-menu_button active">Просмотр</button>
      </li>
      <li>
        <button className="top-menu_button">Управление</button>
      </li>
    </menu>
  );
};

export default TopMenu;
