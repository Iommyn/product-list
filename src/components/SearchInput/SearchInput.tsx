import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { ChangeEvent, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSearchValue } from '../../services/selectors/filtersSelectors';
import { filtersActions } from '../../services/slices/filterSlice';
import { fetchFilter } from '../../services/thunks/fetchFilter';
import { fetchProductsIds } from '../../services/thunks/fetchProductsIds';
import s from './SearchInput.module.css';

const { Search } = Input;

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectSearchValue);

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filtersActions.setSearchValue(e.target.value));
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    if (value) {
      dispatch(fetchFilter({ product: value }));
    }

    if (info?.source === 'clear') {
      dispatch(filtersActions.clearFilters());
      dispatch(fetchProductsIds());
    }
  };

  return (
    <Search
      placeholder="Введите название продукта"
      allowClear
      value={searchValue}
      className={s.input}
      width={300}
      onSearch={onSearch}
      enterButton
      onChange={onChangeSearchValue}
    />
  );
};

export default memo(SearchInput);
