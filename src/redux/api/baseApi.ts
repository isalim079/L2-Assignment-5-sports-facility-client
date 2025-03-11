import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//*  http://localhost:5003
//*  https://assignment-3-i-salim079.vercel.app/api

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://assignment-3-i-salim079.vercel.app/api",
    credentials: "include",
  }),
  endpoints: () => ({}),
});
