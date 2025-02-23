import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<
      {
        token: string;
        user: { id: string; name: string; email: string; role: string };
      },
      { name: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<
      { token: string; user: { id: string; name: string; email: string } },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
export default authApi;
