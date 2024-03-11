import { Typography } from 'antd';
import SelectBrand from '../SelectBrand/SelectBrand';
import SelectPrice from '../SelectPrice/SelectPrice';
import s from './FiltersWrapper.module.css';
import { memo } from 'react';

const { Text } = Typography;

const FiltersWrapper = () => {
  return (
    <div className={s.wrapper}>
      <Text strong>Уточните параметры поиска: </Text>
      <SelectBrand />
      <SelectPrice />
    </div>
  );
};

export default memo(FiltersWrapper);
