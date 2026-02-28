import { apiSlice } from './apiSlice';

export const aiApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        analyzeSymptoms: builder.mutation({
            query: (data) => ({
                url: '/ai/symptom-checker',
                method: 'POST',
                body: data,
            }),
        }),
        suggestPrescription: builder.mutation({
            query: (data) => ({
                url: '/ai/prescription-suggestion',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useAnalyzeSymptomsMutation,
    useSuggestPrescriptionMutation
} = aiApiSlice;
