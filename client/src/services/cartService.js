import { api } from './index';

export const cartAPI = api.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation({
      query: ({ deviceId, userId }) => ({
        url: 'cart/',
        method: 'POST',
        body: { deviceId, userId },
      }),
      invalidatesTags: ['Cart'],
    }),
    deleteFromCart: build.mutation({
      query: ({ deviceId, userId, completeDelete }) => ({
        url: 'cart/delete',
        method: 'POST',
        body: { deviceId, userId },
        params: {
          completeDelete,
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    getCard: build.query({
      query: ({ userId }) => ({
        url: `cart/`,
        params: {
          userId,
        },
      }),
      providesTags: (result) => ['Cart'],
    }),
  }),
});
