import TablePage from 'src/Pages/TablePage/TablePage';
import './styles/_global.sass';
import { Provider } from 'react-redux';
import { store } from 'src/lib/store/store';

export function App() {
  return (
    <Provider store={store}>
      <TablePage />
    </Provider>
  );
}
