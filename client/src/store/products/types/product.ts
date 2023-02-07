import { Description } from './description';

export type Product = {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  createdAt?: Date;
  updatedAt?: Date;
  typeId: number;
  brandId: number;
  info: Description[];
};
