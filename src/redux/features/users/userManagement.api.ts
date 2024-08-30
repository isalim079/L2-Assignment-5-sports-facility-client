import { baseApi } from "@/redux/api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (token) => ({
        url: "/allUsers",
        method: "GET",
        headers: {
            Authorization: token
        }
      }),
    }),
  }),
});

export const { useGetAllUsersQuery } = userManagementApi;
