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
        category?: string;
        sortBy?: string;
        brand?: string;
      }
    >({
      query: ({
        page = 1,
        limit = 3,
        searchTerm,
        minPrice,
        maxPrice,
        category,
        sortBy,
        brand,
      }) => {
        const params = new URLSearchParams();

        if (page) params.append("page", page.toString());
        if (limit) params.append("limit", limit.toString());
        if (searchTerm) params.append("searchTerm", searchTerm);
        if (minPrice) params.append("minPrice", minPrice.toString());
        if (maxPrice) params.append("maxPrice", maxPrice.toString());
        if (category) params.append("category", category);
        if (sortBy) params.append("sortBy", sortBy);
        if (brand) params.append("brand", brand);

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
      invalidatesTags: ["Product"] as any,
    }),
    // addOrUpdateReview: builder.mutation({
    //   query: ({ productId, user, rating, text, token }) => ({
    //     url: `/add-review/${productId}`,
    //     method: "PUT",
    //     body: { user, rating, text, productId },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    // }),
    addOrUpdateReview: builder.mutation({
      query: ({ productId, userId, rating, text, token }) => ({
        url: `/add-review/${productId}`,
        method: "PUT",
        body: { userId, rating, text },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsMutation,
  useGetProductByIdMutation,
  useAddProductMutation,
  useSoftDeleteProductMutation,
  useUpdateProductMutation,
  useAddOrUpdateReviewMutation,
} = productApi;
export default productApi;
