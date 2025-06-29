// @ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bike-shop-server-weld.vercel.app/api/products",
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
