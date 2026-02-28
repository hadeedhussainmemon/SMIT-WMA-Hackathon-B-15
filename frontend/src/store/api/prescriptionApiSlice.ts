import { apiSlice } from './apiSlice';

export const prescriptionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPrescriptions: builder.query({
            query: (params) => ({
                url: '/prescriptions',
                params: params,
            }),
            providesTags: ['Prescription'],
        }),
        createPrescription: builder.mutation({
            query: (data) => ({
                url: '/prescriptions',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Prescription'],
        }),
    }),
});

export const {
    useGetPrescriptionsQuery,
    useCreatePrescriptionMutation
} = prescriptionApiSlice;
