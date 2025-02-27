import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1️⃣ Fetch all users (Admin only)
    getAllUsers: builder.mutation({
      query: (token) => ({
        url: "/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    actionForUser: builder.mutation({
      query: ({ userId, action, token }) => ({
        url: `/users/${userId}`,
        method: "PATCH",
        body: { action },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    changeUserPassword: builder.mutation({
      query: ({ oldPassword, newPassword, token }) => ({
        url: "/users/changePassword",
        method: "PUT",
        body: { oldPassword, newPassword }, // ✅ Correct body format
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Ensure token is sent
        },
      }),
    }),
  }),
});

export const {
  useGetAllUsersMutation,
  useActionForUserMutation,
  useChangeUserPasswordMutation,
} = userApi;
