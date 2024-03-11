import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectPrice } from '../../services/selectors/filtersSelectors';
import { filtersActions } from '../../services/slices/filterSlice';
import { fetchFilter } from '../../services/thunks/fetchFilter';
import { fetchProductsIds } from '../../services/thunks/fetchProductsIds';
import s from './SelectPrice.module.css';
const { Search } = Input;

const SelectPrice = () => {
  const dispatch = useAppDispatch();
  const priceValue = useAppSelector(selectPrice);

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filtersActions.setPrice(e.target.value));
  };

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    if (value) {
      dispatch(fetchFilter({ price: Number(value) }));
    }

    if (info?.source === 'clear') {
      dispatch(filtersActions.clearFilters());
      dispatch(fetchProductsIds());
    }
  };

  return (
    <Search
      onChange={onPriceChange}
      placeholder="Цена"
      allowClear
      onSearch={onSearch}
      className={s.price}
      value={priceValue}
    />
  );
};

export default SelectPrice;
