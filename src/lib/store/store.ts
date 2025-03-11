import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { Api } from 'src/api/Api';
import tableSlice from 'src/lib/store/tableSlice/tableSlice';

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    tableSlice: tableSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Api.middleware),
});
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppSelector<Return> = (state: RootState) => Return;
