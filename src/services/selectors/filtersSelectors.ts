import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '../store';

export const getBrands = (state: StateSchema) => state?.filters?.brands;
export const selectCurrentPage = (state: StateSchema) => state?.filters?.currentPage;
export const selectPrice = (state: StateSchema) => state?.filters?.price;
export const selectSearchValue = (state: StateSchema) => state?.filters?.searchValue;
export const selectBrand = (state: StateSchema) => state?.filters?.brand;

export const filteredBrands = createSelector(getBrands, arr => {
  if (arr && arr.length !== 0) {
    const filteredArr = arr?.filter((item: string | null) => item !== null);
    const newSet = new Set(filteredArr);
    return Array.from(newSet);
  }
});

export const selectBrandsError = (state: StateSchema) => state?.filters?.error;
