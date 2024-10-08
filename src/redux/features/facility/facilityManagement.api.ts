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
      query: ({ id, token }) => ({
        url: `/facility/${id}`,
        method: "GET",
        headers: {
          Authorization: token,
        },
      }),
    }),
    updateSingleFacility: builder.mutation({
      query: ({ id, token, data }) => ({
        url: `/facility/${id}`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
    }),
    AddFacility: builder.mutation({
      query: ({token, data }) => ({
        url: `/facility`,
        method: "POST",
        body: data,
        headers: {
          Authorization: token,
        },
      }),
    }),
    deleteFacility: builder.mutation({
      query: ({token, id }) => ({
        url: `/facility/${id}`,
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }),
    }),
  }),
});

export const {
  useGetAllFacilitiesQuery,
  useGetSingleFacilityQuery,
  useUpdateSingleFacilityMutation,
  useAddFacilityMutation,
  useDeleteFacilityMutation,
} = facilityManagementApi;
