import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestActions, RequestResult } from '../../types/types';
import { ThunkConfig } from '../store';

type ids = RequestResult<string[]>;

interface Price {
  price: number;
}

interface Product {
  product: string;
}

interface Brand {
  brand: string;
}

type Ards = Price | Product | Brand;

export const fetchFilter = createAsyncThunk<string[], Ards, ThunkConfig<string>>(
  'filters/fetchFilter',
  async (obj, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const res = await extra.api.post<ids>('/', {
        action: RequestActions.FILTER,
        params: obj,
      });

      if (!res.data) {
        throw new Error();
      }
      return res.data.result;
    } catch (e) {
      console.log(e);
      return rejectWithValue('Ошибка фильтрации');
    }
  },
);
