import { RootState } from '../..';
import { Product } from '../../products/types/product';

export const selectCartProducts = (state) => {
  let list = [];

  state.cart.cart.forEach((item) => {
    const candidate = state.products.products?.find(
      (product) => product.id === item.deviceId
    );
    if (candidate) {
      list.push({ quantity: item.quantity, ...candidate });
    }
  });

  return list;
};
