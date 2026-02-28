import { apiSlice } from './apiSlice';

export const prescriptionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPrescriptions: builder.query({
            query: () => '/prescriptions',
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
