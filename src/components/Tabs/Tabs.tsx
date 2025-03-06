import './Tabs.style.sass';

interface ITabsProps {
  tabs: {
    title: string;
  }[];
}
const Tabs = ({ tabs }: ITabsProps) => {
  return (
    <menu className="tabs">
      {tabs.map((tab) => (
        <li className="tabs_item">{tab.title}</li>
      ))}
    </menu>
  );
};

export default Tabs;
