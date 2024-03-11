import { Card, Typography } from 'antd';
import { FC } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import {
  filteredAllIds,
  filteredProductsFullInfo,
  selectIsLoadingItems,
} from '../../services/selectors/productsSelectors';
import { testArr } from '../../utils/constants';
import ProductCard from '../ProductCard/ProductCard';
import s from './ProductsWrapper.module.css';

const { Title } = Typography;

const ProductsWrapper: FC = () => {
  const products = useAppSelector(filteredProductsFullInfo);
  const isLoadingItems = useAppSelector(selectIsLoadingItems);
  const allIds = useAppSelector(filteredAllIds);

  if (isLoadingItems) {
    return (
      <div className={s.wrapper}>
        {testArr.map((_, index) => {
          return <Card className={s.card} loading={true} key={index} />;
        })}
      </div>
    );
  }

  if (products?.length === 0 || allIds.length === 0) {
    return (
      <div className={s.wrapperError}>
        <Title level={3}>Продукты не найдены</Title>
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      {products?.map(item => {
        return <ProductCard key={item.id} item={item} />;
      })}
    </div>
  );
};

export default ProductsWrapper;
