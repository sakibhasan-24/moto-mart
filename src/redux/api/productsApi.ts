import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.mutation<any, void>({
      query: () => ({ url: "/products" }),
    }),
    getProductById: builder.mutation<any, string>({
      query: (id) => ({ url: `/products/${id}` }),
    }),
  }),
});

export const { useGetProductsMutation, useGetProductByIdMutation } = productApi;
export default productApi;
