export interface RequestResult<T> {
  result: T;
}

export enum RequestActions {
  GET_IDS = 'get_ids',
  GET_ITEMS = 'get_items',
  GET_FIELDS = 'get_fields',
  FILTER = 'filter',
}

export interface Product {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}

export type ProductField = Exclude<keyof Product, 'id'>;
