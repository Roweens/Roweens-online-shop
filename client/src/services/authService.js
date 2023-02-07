import { api } from './index';

export const authAPI = api.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: ({ email, password, role = 'ADMIN' }) => ({
        url: `user/signup`,
        method: 'POST',
        body: { email, password, role },
      }),
    }),
    signIn: build.mutation({
      query: ({ email, password }) => ({
        url: `user/signin`,
        method: 'POST',
        body: { email, password },
      }),
    }),
    verify: build.query({
      query: () => ({
        url: `user/verify`,
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
    }),
  }),
});
