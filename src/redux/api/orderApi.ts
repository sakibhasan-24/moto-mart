import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<any, { orderData: any; token: string }>({
      query: ({ orderData, token }) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAllOrders: builder.mutation<any, string>({
      query: (token) => ({
        url: "/orders",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    updateOrderStatus: builder.mutation<
      any,
      { orderId: string; orderStatus: string; token: string }
    >({
      query: ({ orderId, orderStatus, token }) => ({
        url: `/orders/${orderId}`,
        method: "PUT",
        body: { orderStatus },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

      async onQueryStarted(
        { orderId, orderStatus, token },

        { dispatch, queryFulfilled }
      ) {
        try {
          console.log(orderId, orderStatus, token);
          await queryFulfilled;
          dispatch(orderApi.util.invalidateTags(["Orders"] as any));
        } catch (error) {
          console.error("Error updating order status:", error);
        }
      },
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
