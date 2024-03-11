import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { filteredBrands, selectBrand } from '../../services/selectors/filtersSelectors';

import { Select, Spin } from 'antd';
import { filtersActions } from '../../services/slices/filterSlice';
import { fetchFilter } from '../../services/thunks/fetchFilter';
import { fetchProductsIds } from '../../services/thunks/fetchProductsIds';

export interface Option {
  label: string;
  value: string;
}

const SelectBrand = () => {
  const brands = useAppSelector(filteredBrands);
  const dispatch = useAppDispatch();
  const brandValue = useAppSelector(selectBrand);

  const options = useMemo(() => {
    return brands?.map(item => {
      return { value: item, label: item };
    });
  }, [brands]);

  const onChange = (value: string) => {
    if (value) {
      dispatch(filtersActions.setBrand(value));
      dispatch(fetchFilter({ brand: value }));
    }
  };

  const onClear = () => {
    dispatch(filtersActions.clearFilters());
    dispatch(fetchProductsIds());
  };

  const filterOption = (input: string, option?: Option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return options?.length !== 0 ? (
    <Select
      onClear={onClear}
      value={brandValue}
      showSearch
      allowClear
      style={{ width: 150 }}
      placeholder="Бренд"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={filterOption}
      options={options as Option[]}
    />
  ) : (
    <Spin />
  );
};

export default SelectBrand;
