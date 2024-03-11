import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchBrands } from '../thunks/fetchBrands';

export interface FiltersState {
  isLoading: boolean;
  error?: string;
  // data
  brands?: (string | null)[];
  // filters
  currentPage: number;
  searchValue?: string;
  price?: string;
  brand?: string;
}

const initialState: FiltersState = {
  isLoading: false,
  error: undefined,
  // data
  brands: undefined,
  // filters
  currentPage: 1,
  searchValue: undefined,
  price: undefined,
  brand: undefined,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPrice: (state, action: PayloadAction<string | undefined>) => {
      state.currentPage = 1;
      state.searchValue = undefined;
      state.brand = undefined;

      state.price = action.payload;
    },

    setBrand: (state, action: PayloadAction<string | undefined>) => {
      state.currentPage = 1;
      state.searchValue = undefined;
      state.price = undefined;

      state.brand = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string | undefined>) => {
      state.currentPage = 1;
      state.price = undefined;
      state.brand = undefined;

      state.searchValue = action.payload;
    },
    clearFilters: state => {
      state.searchValue = undefined;
      state.price = undefined;
      state.brand = undefined;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBrands.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchBrands.fulfilled,
        (state, action: PayloadAction<(string | null)[]>) => {
          state.brands = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(fetchBrands.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { actions: filtersActions, reducer: filtersReducer } = filtersSlice;
