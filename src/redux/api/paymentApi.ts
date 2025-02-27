import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: ({ orderId, token }) => ({
        url: "/create-payment",
        method: "POST",
        body: { orderId },
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    processPayment: builder.mutation({
      query: ({ orderId, token, transactionId }) => ({
        url: "/confirm-payment",
        method: "POST",
        body: { orderId, transactionId },
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useProcessPaymentMutation } =
  orderApi;
