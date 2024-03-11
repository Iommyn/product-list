import { Card } from 'antd';
import { FC } from 'react';
import { Product } from '../../types/types';
import s from './ProductCard.module.css';

export interface ProductCardProps {
  item: Product;
}

const ProductCard: FC<ProductCardProps> = ({ item }) => {
  return (
    <Card hoverable title={item.product} className={s.card}>
      <div className={s.content}>
        <p className={s.brand}>Id: {item.id}</p>
        <p className={s.brand}>Бренд: {item.brand || 'не указан'}</p>
        <p className={s.price}>Цена: {item.price} ₽</p>
      </div>
    </Card>
  );
};

export default ProductCard;
