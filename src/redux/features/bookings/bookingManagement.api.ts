import { baseApi } from "@/redux/api/baseApi";


const bookingManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBookings: builder.query({
      query: (token) => ({
        url: "/bookings",
        method: "GET",
        headers: {
            Authorization: token
        }
      }),
    }),
  }),
});

export const { useGetAllBookingsQuery } = bookingManagementApi;
