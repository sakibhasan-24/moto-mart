import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getProducts: builder.mutation<any, void>({
    //   query: () => ({ url: "/products" }),
    // }),
    getProducts: builder.mutation<
      any,
      {
        page?: number;
        limit?: number;
        searchTerm?: string;
        minPrice?: number;
        maxPrice?: number;
      }
    >({
      query: ({ page = 1, limit = 3, searchTerm, minPrice, maxPrice }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (minPrice) params.append("minPrice", minPrice.toString());
        if (maxPrice) params.append("maxPrice", maxPrice.toString());

        return {
          url: `/products?${params.toString()}`,
        };
      },
    }),

    getProductById: builder.mutation<any, string>({
      query: (id) => ({ url: `/products/${id}` }),
    }),
    addProduct: builder.mutation<any, { formData: FormData; token: string }>({
      query: ({ formData, token }) => ({
        url: "/products",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ productId, formData, token }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    softDeleteProduct: builder.mutation<{ message: string }, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: { isDelete: true },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsMutation,
  useGetProductByIdMutation,
  useAddProductMutation,
  useSoftDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
export default productApi;
