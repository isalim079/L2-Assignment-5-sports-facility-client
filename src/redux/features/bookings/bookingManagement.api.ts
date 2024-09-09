import { baseApi } from "@/redux/api/baseApi";

const bookingManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (token) => ({
        url: "/bookings",
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
    checkAvailability: builder.query({
      query: ({ date, facilityId }) => ({
        url: `/check-availability?date=${date}&facility=${facilityId}`,
        method: "GET",
      }),
    }),
    createBooking: builder.mutation({
      query: ({token, data}) => ({
        url: `/bookings`,
        method: "POST",
        body: data,
        headers: {
          Authorization: token
        }
      }),
    }),
    updateIsBooked: builder.mutation({
      query: ({id, data}) => ({
        url: `/bookings/${id}/status`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useCheckAvailabilityQuery,
  useCreateBookingMutation,
  useUpdateIsBookedMutation,
} = bookingManagementApi;
