import { api } from './index';
import { Brand } from '../store/products/types/brand';
import { Product } from '../store/products/types/product';
import { Type } from '../store/products/types/type';

export const productAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createType: build.mutation({
      query: ({ name }) => ({
        url: `type/`,
        method: 'POST',
        body: { name },
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
      invalidatesTags: ['Type'],
    }),
    fetchTypes: build.query<Type[], void>({
      query: () => ({
        url: `type/`,
      }),
      providesTags: (result) => ['Type'],
    }),
    createBrand: build.mutation({
      query: (name) => ({
        url: `brand/`,
        method: 'POST',
        body: name,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
      invalidatesTags: ['Brand'],
    }),
    fetchBrands: build.query<Brand[], void>({
      query: () => ({
        url: `brand/`,
      }),
      providesTags: (result) => ['Brand'],
    }),
    createProduct: build.mutation({
      query: (device) => ({
        url: `device/`,
        method: 'POST',
        body: device,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
      invalidatesTags: ['Product'],
    }),
    fetchProducts: build.query<
      { count: number; rows: Product[] },
      { typeId?: number; brandId?: number; limit?: number; page?: number }
    >({
      query: ({ typeId, brandId, limit, page }) => ({
        url: `device/`,
        params: {
          typeId,
          brandId,
          limit,
          page,
        },
      }),
      providesTags: (result) => ['Product'],
    }),
    fetchProduct: build.query<
      { response: Product; isRated: number },
      { deviceId: number; userId?: number }
    >({
      query: ({ deviceId, userId }) => ({
        url: `device/` + deviceId,
        params: {
          user: userId,
        },
      }),
      transformResponse(response: Product, meta) {
        console.log(meta);
        return {
          response,
          isRated: Number(meta!.response!.headers.get('is_rated')),
        };
      },
      providesTags: (result) => ['Product'],
    }),
  }),
});
