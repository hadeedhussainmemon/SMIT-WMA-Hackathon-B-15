import { apiSlice } from './apiSlice';

export const patientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPatients: builder.query({
            query: () => '/patients',
            providesTags: ['Patient'],
        }),
        getPatientById: builder.query({
            query: (id) => `/patients/${id}`,
            providesTags: ['Patient'],
        }),
        createPatientProfile: builder.mutation({
            query: (data) => ({
                url: '/patients',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Patient'],
        }),
        registerPatient: builder.mutation({
            query: (data) => ({
                url: '/patients/register',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Patient'],
        }),
        updatePatientProfile: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/patients/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Patient'],
        }),
    }),
});

export const {
    useGetPatientsQuery,
    useGetPatientByIdQuery,
    useCreatePatientProfileMutation,
    useRegisterPatientMutation,
    useUpdatePatientProfileMutation
} = patientApiSlice;
