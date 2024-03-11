import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestActions, RequestResult } from '../../types/types';
import { ThunkConfig } from '../store';

type Brands = RequestResult<(string | null)[]>;

export const fetchBrands = createAsyncThunk<(string | null)[], void, ThunkConfig<string>>(
  'filters/fetchBrands',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const res = await extra.api.post<Brands>('/', {
        action: RequestActions.GET_FIELDS,
        params: { field: 'brand' },
      });

      if (!res.data.result) {
        throw new Error();
      }

      return res.data.result;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Ошибка при загрузке брендов');
    }
  },
);
