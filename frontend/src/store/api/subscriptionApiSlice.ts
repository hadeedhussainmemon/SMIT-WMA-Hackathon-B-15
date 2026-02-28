import { apiSlice } from './apiSlice';

const SUBSCRIPTIONS_URL = '/subscriptions';

export const subscriptionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMySubscription: builder.query({
            query: () => ({
                url: `${SUBSCRIPTIONS_URL}/mine`,
            }),
            providesTags: ['Subscription'],
        }),
        toggleSubscription: builder.mutation({
            query: () => ({
                url: `${SUBSCRIPTIONS_URL}/toggle`,
                method: 'PUT',
            }),
            invalidatesTags: ['Subscription'],
        }),
    }),
});

export const {
    useGetMySubscriptionQuery,
    useToggleSubscriptionMutation,
} = subscriptionApiSlice;
