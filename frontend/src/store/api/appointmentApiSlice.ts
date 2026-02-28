import { apiSlice } from './apiSlice';

export const appointmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query({
            query: (params) => ({
                url: '/appointments',
                params: params,
            }),
            providesTags: ['Appointment'],
        }),
        createAppointment: builder.mutation({
            query: (data) => ({
                url: '/appointments',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Appointment'],
        }),
        updateAppointmentStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/appointments/${id}/status`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Appointment'],
        }),
    }),
});

export const {
    useGetAppointmentsQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentStatusMutation
} = appointmentApiSlice;
