import { apiSlice } from './apiSlice';

export const analyticsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getClinicOverview: builder.query({
            query: () => '/analytics/overview',
            providesTags: ['Analytics'],
        }),
    }),
});

export const {
    useGetClinicOverviewQuery
} = analyticsApiSlice;
