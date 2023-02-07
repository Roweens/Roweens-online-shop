import { createSlice } from '@reduxjs/toolkit';
import { productAPI } from '../../services/productService';
import { ProductsSliceState } from './types/productsSliceState';

const initialState: ProductsSliceState = {
  products: [],
  types: [],
  brands: [],
  selectedType: null,
  selectedBrand: null,
  page: 1,
  totalCount: 0,
};

const productsSlice = createSlice({
  name: '@@products',
  initialState,
  reducers: {
    setSelectedType: (state, action) => {
      state.page = 1;
      state.selectedType = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.page = 1;
      state.selectedBrand = action.payload;
    },
    setTypes: (state, action) => {
      state.types = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productAPI.endpoints.fetchTypes.matchFulfilled,
      (state, action) => {
        state.types = action.payload;
      }
    );
    builder.addMatcher(
      productAPI.endpoints.fetchBrands.matchFulfilled,
      (state, action) => {
        state.brands = action.payload;
      }
    );
    builder.addMatcher(
      productAPI.endpoints.fetchProducts.matchFulfilled,
      (state, action) => {
        state.products = action.payload.rows;
        state.totalCount = action.payload.count;
      }
    );
  },
});

export const { setSelectedType, setSelectedBrand, setTypes, setPage } =
  productsSlice.actions;

export default productsSlice.reducer;
