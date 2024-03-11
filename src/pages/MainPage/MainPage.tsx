import { Pagination, PaginationProps, Spin } from 'antd';
import { useEffect } from 'react';
import FiltersWrapper from '../../components/FiltersWrapper/FiltersWrapper';
import ProductsWrapper from '../../components/ProductsWrapper/ProductsWrapper';
import SearchInput from '../../components/SearchInput/SearchInput';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectCurrentPage } from '../../services/selectors/filtersSelectors';
import {
  filteredAllIds,
  selectIsLoadingIds,
} from '../../services/selectors/productsSelectors';
import { filtersActions } from '../../services/slices/filterSlice';
import { fetchBrands } from '../../services/thunks/fetchBrands';
import { fetchItems } from '../../services/thunks/fetchItems';
import { fetchProductsIds } from '../../services/thunks/fetchProductsIds';
import s from './MainPage.module.css';

const MainPage = () => {
  const dispatch = useAppDispatch();

  const allIds = useAppSelector(filteredAllIds);
  const currentPage = useAppSelector(selectCurrentPage);
  const isLoadingPageIds = useAppSelector(selectIsLoadingIds);

  useEffect(() => {
    dispatch(fetchProductsIds());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    const getIdsforCurrentPage = (currentPage: number) => {
      const startIndex = (currentPage - 1) * 50;
      const endIndex = currentPage * 50;
      return allIds.slice(startIndex, endIndex);
    };
    const ids = getIdsforCurrentPage(currentPage);
    if (ids.length !== 0) {
      dispatch(fetchItems(ids));
    }
  }, [dispatch, currentPage, allIds]);

  if (isLoadingPageIds) {
    return (
      <main className={s.spinContainer}>
        <Spin size="large" />
      </main>
    );
  }

  const onChangePage: PaginationProps['onChange'] = pageNumber => {
    dispatch(filtersActions.setCurrentPage(pageNumber));
  };

  return (
    <main className={s.main}>
      <SearchInput />
      <div className={s.container}>
        <FiltersWrapper />
        <ProductsWrapper />
      </div>
      <Pagination
        defaultCurrent={1}
        showSizeChanger={false}
        pageSize={50}
        total={allIds.length}
        onChange={onChangePage}
      />
    </main>
  );
};

export default MainPage;
