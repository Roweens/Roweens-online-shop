import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth/auth-slice';
import ProductReducer from './products/products-slice';
import CartReducer from './cart/cart-slice';
import { api } from '../services/index';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    products: ProductReducer,
    cart: CartReducer,
    [api.reducerPath]: api.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
