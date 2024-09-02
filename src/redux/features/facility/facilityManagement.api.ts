import { baseApi } from "@/redux/api/baseApi";

const facilityManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: () => ({
        url: "/facility",
        method: "GET",
      }),
    }),
    getSingleFacility: builder.query({
      query: ({id, token}) => ({
        url: `/facility/${id}`,
        method: "GET",
        headers: {
          Authorization: token
      }
      }),
    }),
    updateSingleFacility: builder.mutation({
      query: ({id, token, data}) => ({
        url: `/facility/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: token
      }
      }),
    }),
  }),
});

export const { useGetAllFacilitiesQuery, useGetSingleFacilityQuery, useUpdateSingleFacilityMutation } = facilityManagementApi;
