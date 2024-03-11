import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, RequestActions, RequestResult } from '../../types/types';
import { ThunkConfig } from '../store';

type Items = RequestResult<Product[]>;

export const fetchItems = createAsyncThunk<Product[], string[], ThunkConfig<string>>(
  'products/fetchItems',
  async (arrIds, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;
    try {
      const res = await extra.api.post<Items>('/', {
        action: RequestActions.GET_ITEMS,
        params: { ids: arrIds },
      });

      if (!res.data.result) {
        throw new Error();
      }

      return res.data.result;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Ошибка при загрузке карточек');
    }
  },
);
