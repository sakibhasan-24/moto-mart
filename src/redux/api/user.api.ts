import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
        body: { oldPassword, newPassword },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ token, profile }) => ({
        url: "/users/profile/update",
        method: "PUT",
        body: profile,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getAdminData: builder.mutation({
      query: (token: string) => ({
        url: "/users/admin/stat",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllUsersMutation,
  useActionForUserMutation,
  useChangeUserPasswordMutation,
  useUpdateProfileMutation,
  useGetAdminDataMutation,
} = userApi;
