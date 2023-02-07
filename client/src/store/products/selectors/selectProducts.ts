import { RootState } from '../..';

export const selectProducts = (state: RootState) => state.products.products;
