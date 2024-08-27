import { baseApi } from "@/redux/api/baseApi";

const facilityManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: () => ({
        url: "/facility",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllFacilitiesQuery } = facilityManagementApi;
