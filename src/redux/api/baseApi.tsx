// @ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://moto-gamma.vercel.app/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
