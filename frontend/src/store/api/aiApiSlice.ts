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
                url: '/ai/suggest-prescription',
                method: 'POST',
                body: data,
            }),
        }),
        explainPrescription: builder.mutation({
            query: (data) => ({
                url: '/ai/explain-prescription',
                method: 'POST',
                body: data,
            }),
        }),
        analyzeReport: builder.mutation({
            query: (data) => ({
                url: '/ai/analyze-report',
                method: 'POST',
                body: data,
            }),
        }),
        neuralChat: builder.mutation({
            query: (data) => ({
                url: '/ai/neural-chat',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useAnalyzeSymptomsMutation,
    useSuggestPrescriptionMutation,
    useExplainPrescriptionMutation,
    useAnalyzeReportMutation,
    useNeuralChatMutation
} = aiApiSlice;
