import { Brand } from './brand';
import { Product } from './product';
import { Type } from './type';

export type ProductsSliceState = {
  products: Product[] | null;
  types: Type[];
  brands: Brand[];
  selectedType: Type | null;
  selectedBrand: Brand | null;
  page: number;
  totalCount: number;
};
