import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/types';
import { fetchFilter } from '../thunks/fetchFilter';
import { fetchItems } from '../thunks/fetchItems';
import { fetchProductsIds } from '../thunks/fetchProductsIds';

export interface ProductState {
  isLoadingIds: boolean;
  isLoadingItems: boolean;

  allIds?: string[];
  items?: Product[];

  idsError?: string;
  itemsError?: string;
  filterError?: string;
  error?: string;
}

const initialState: ProductState = {
  isLoadingIds: false,
  isLoadingItems: false,

  allIds: undefined,
  items: undefined,

  idsError: undefined,
  itemsError: undefined,
  filterError: undefined,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // allIds
    builder
      .addCase(fetchProductsIds.pending, state => {
        state.idsError = undefined;
        state.isLoadingIds = true;
      })
      .addCase(fetchProductsIds.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.allIds = action.payload;
        state.isLoadingIds = false;
      })

      .addCase(fetchProductsIds.rejected, (state, action) => {
        state.idsError = action.payload;
        state.isLoadingIds = false;
      });
    // items
    builder
      .addCase(fetchItems.pending, state => {
        state.itemsError = undefined;
        state.isLoadingItems = true;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.items = action.payload;
        state.isLoadingItems = false;
      })

      .addCase(fetchItems.rejected, (state, action) => {
        state.itemsError = action.payload;
        state.isLoadingItems = false;
      });
    // filter
    builder
      .addCase(fetchFilter.pending, state => {
        state.filterError = undefined;
        state.isLoadingIds = true;
      })
      .addCase(fetchFilter.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.allIds = action.payload;
        state.isLoadingIds = false;
      })

      .addCase(fetchFilter.rejected, (state, action) => {
        state.filterError = action.payload;
        state.isLoadingIds = false;
      });
  },
});

export const { actions: productsActions, reducer: productsReducer } = productsSlice;
