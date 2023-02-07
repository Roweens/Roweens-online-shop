import { RootState } from '../..';

export const selectCart = (state: RootState) => state.cart.cart;
