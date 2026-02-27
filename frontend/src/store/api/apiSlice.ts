import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // To be configured with actual backend URL
    tagTypes: ['User'],
    endpoints: () => ({}),
});
