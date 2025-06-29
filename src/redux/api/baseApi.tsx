// @ts-nocheck
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bike-shop-kappa-rust.vercel.app/api",
    // baseUrl: "http://localhost:5000/api",
  }),
  endpoints: (builder) => ({}),
});
