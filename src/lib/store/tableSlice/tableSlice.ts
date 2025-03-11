import { createAppAsyncThunk } from './../storeHooks';
import {
  Api,
  CreateRowInEntityUsingPostApiArg,
  CreateRowInEntityUsingPostApiResponse,
  DeleteRowUsingDeleteApiArg,
  DeleteRowUsingDeleteApiResponse,
  GetTreeRowsUsingGetApiResponse,
  TreeResponse,
  UpdateRowUsingPostApiArg,
  UpdateRowUsingPostApiResponse,
} from 'src/api/Api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addItemInParentById, deleteItemInChildById, updateItemById } from 'src/utils/tableRowHelper';

interface ITableSliceState {
  editableItemId: number | null;
  newItemParentId: number | null;
  data: TreeResponse[] | null;
  loading: boolean;
  isCountChange: boolean;
}

const initialState: ITableSliceState = {
  editableItemId: null,
  newItemParentId: null,
  data: null,
  loading: false,
  isCountChange: true,
};

export const fetchRowsTable = createAppAsyncThunk(
  'tableSlice/getRowsTable',
  async (eId: number, { dispatch, rejectWithValue }) => {
    try {
      const res = await dispatch(Api.endpoints.getTreeRowsUsingGet.initiate({ eId: eId }));
      if ('data' in res) {
        return res.data;
      } else {
        return rejectWithValue('Ошибка загрузки данных');
      }
    } catch (error) {
      return rejectWithValue('Ошибка сети');
    }
  },
);

export const updateRowTable = createAppAsyncThunk(
  'tableSlice/updateRowTable',
  async (arg: UpdateRowUsingPostApiArg, { dispatch, rejectWithValue }) => {
    const res = await dispatch(Api.endpoints.updateRowUsingPost.initiate(arg));
    return res.data;
  },
);

export const createRowTable = createAppAsyncThunk(
  'tableSlice/createRowTable',
  async (arg: CreateRowInEntityUsingPostApiArg, { dispatch, rejectWithValue }) => {
    const res = await dispatch(Api.endpoints.createRowInEntityUsingPost.initiate(arg));
    return res.data;
  },
);

export const deleteRowTable = createAppAsyncThunk(
  'tableSlice/deleteRowTable',
  async (arg: DeleteRowUsingDeleteApiArg, { dispatch, rejectWithValue }) => {
    const res = await dispatch(Api.endpoints.deleteRowUsingDelete.initiate(arg));
    return res.data;
  },
);

const tableSlice = createSlice({
  name: 'tableSlice',
  initialState,
  reducers: {
    setEditableRow: (state, action: PayloadAction<number | null>) => {
      state.editableItemId = action.payload;
    },
    setNewItemParentIdRow: (state, action: PayloadAction<number | null>) => {
      state.newItemParentId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRowsTable.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRowsTable.fulfilled, (state, action: PayloadAction<GetTreeRowsUsingGetApiResponse | undefined>) => {
        state.loading = false;
        if (action.payload) {
          state.data = action.payload as TreeResponse[];
        }
      })
      .addCase(fetchRowsTable.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateRowTable.fulfilled, (state, action: PayloadAction<UpdateRowUsingPostApiResponse | undefined>) => {
        if (action?.payload?.current && !!state.data) {
          const newItem = action.payload.current as TreeResponse;
          const newData = updateItemById(state.data, newItem.id, newItem);
          state.data = newData;
          state.editableItemId = null;
        }
      })
      .addCase(
        createRowTable.fulfilled,
        (
          state,
          action: PayloadAction<
            CreateRowInEntityUsingPostApiResponse | undefined,
            string,
            { arg: CreateRowInEntityUsingPostApiArg }
          >,
        ) => {
          const parentId = action.meta.arg.outlayRowRequest.parentId;
          if (action?.payload?.current) {
            const newItem = action.payload.current as TreeResponse;
            if (parentId && !!state.data) {
              addItemInParentById(state.data, parentId, newItem);
            } else {
              state.data = state.data && state.data?.length > 0 ? [...state.data, newItem] : [newItem];
            }
            state.editableItemId = null;
            state.newItemParentId = null;
            state.isCountChange = !state.isCountChange;
          }
        },
      )
      .addCase(
        deleteRowTable.fulfilled,
        (
          state,
          action: PayloadAction<
            DeleteRowUsingDeleteApiResponse | undefined,
            string,
            { arg: DeleteRowUsingDeleteApiArg }
          >,
        ) => {
          const deleteId = action.meta.arg.rId;
          if (action?.payload?.changed && !!state.data && deleteId) {
            if (state.data.find((item) => item.id === deleteId)) {
              state.data = state.data.length > 1 ? state.data.filter((item) => item.id !== deleteId) : null;
            } else {
              deleteItemInChildById(state.data, deleteId);
            }
            state.isCountChange = !state.isCountChange;
          }
        },
      );
  },
  selectors: {
    editableItemIdTableSelector: (state) => state.editableItemId,
    isEditableTableSelector: (state, id: number) => id === state.editableItemId,
    isParentNewItemTableSelector: (state, id: number) => id === state.newItemParentId,
    dataTableSelector: (state) => state.data,
    isCountChangeTableSelector: (state) => state.isCountChange,
  },
});

export default tableSlice;
export const { setEditableRow, setNewItemParentIdRow } = tableSlice.actions;
export const {
  editableItemIdTableSelector,
  isEditableTableSelector,
  dataTableSelector,
  isCountChangeTableSelector,
  isParentNewItemTableSelector,
} = tableSlice.selectors;
