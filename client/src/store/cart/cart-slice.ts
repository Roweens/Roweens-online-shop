import { createSlice } from '@reduxjs/toolkit';
import { cartAPI } from '../../services/cartService';
import { CartItem } from './types/cartItem';

interface CartInitialState {
  cart: CartItem[];
}

const initialState: CartInitialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: '@@cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      cartAPI.endpoints.getCard.matchFulfilled,
      (state, action) => {
        state.cart = action.payload.basket_items;
      }
    );
  },
});

export default cartSlice.reducer;
