import { api } from './index';
import { Rating } from '../store/products/types/rating';

export const ratingAPI = api.injectEndpoints({
  endpoints: (build) => ({
    createRating: build.mutation<
      Rating,
      { deviceId: number; userId: number; rate: number }
    >({
      query: ({ deviceId, userId, rate }) => ({
        url: 'rating/',
        method: 'POST',
        body: { deviceId, userId, rate },
      }),
      invalidatesTags: ['Rating'],
    }),
  }),
});
