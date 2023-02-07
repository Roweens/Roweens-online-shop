import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: () => ({}),
  tagTypes: ['Cart', 'Brand', 'Type', 'Product', 'Rating'],
});
