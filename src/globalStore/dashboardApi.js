import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

export const dashboardApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getCustomers: build.query({
      query: () => "general/user",
      providesTags: ["Customers"],
    }),

    getUserById: build.query({
      query: (id) => ({
        url: `general/user/${id}`,
        method: "GET",
        // credentials: "include",
      }),
      providesTags: ["User"],
    }),
    getUserByEmail: build.query({
      query: (email) => ({
        url: `general/user/${email}`,
        method: "GET",
        // credentials: "include",
      }),
      providesTags: ["User"],
    }),
    postUser: build.mutation({
      query: (payload) => ({
        url: `auth/register`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    putUser: build.mutation({
      query: (id, payload) => ({
        url: `general/user/${id}`,
        method: "PUT",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `general/user/${id}`,
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    postSignin: build.mutation({
      query: (payload) => ({
        url: `auth/signin`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
      invalidatesTags: ["User"],
    }),
    postSignout: build.mutation({
      query: () => ({
        url: `auth/signout`,
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    postForgotPassword: build.mutation({
      query: (payload) => ({
        url: `auth/forgot-password`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    patchResetPassword: build.mutation({
      query: ({ resetToken, password, passwordConfirm }) => ({
        url: `auth/reset-password/${resetToken}`,
        method: "PATCH",
        body: { password, passwordConfirm },
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    patchChangePassword: build.mutation({
      query: (payload) => ({
        url: "auth/change-password",
        method: "PATCH",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    postVerifyEmail: build.mutation({
      query: (verificationCode) => ({
        url: `auth/verify-email/?token=${verificationCode}`,
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    postValidateToken: build.mutation({
      query: (payload) => ({
        url: `auth/validate-reset-token`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    postRefreshToken: build.mutation({
      query: (payload) => ({
        url: `auth/refresh-token`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    postRevokeToken: build.mutation({
      query: (payload) => ({
        url: `auth/revoke-token`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    getProducts: build.query({
      // query: () => "client/products",
      query: () => ({
        url: "client/products",
        method: "GET",
        // credentials: "include",
      }),
      providesTags: ["Products"],
    }),

    getProductsById: build.query({
      query: (id) => ({
        url: `client/products/${id}`,
        method: "GET",
        // credentials: "include",
      }),
      providesTags: ["Products"],
    }),
    postProduct: build.mutation({
      query: (payload) => ({
        url: `client/products`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    putProduct: build.mutation({
      query: (id, payload) => ({
        url: `client/products/${id}`,
        method: "PUT",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `client/products/${id}`,
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["Products"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        // credentials: "include",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),

    getTransactionById: build.query({
      query: (id) => ({
        url: `client/transactions/${id}`,
        method: "GET",
        // credentials: "include",
      }),
      providesTags: ["Transactions"],
    }),
    postTransaction: build.mutation({
      query: (payload) => ({
        url: `client/transactions`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["Transactions"],
    }),
    putTransaction: build.mutation({
      query: (id, payload) => ({
        url: `client/transactions/${id}`,
        method: "PUT",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["Transactions"],
    }),
    deleteTransaction: build.mutation({
      query: (id) => ({
        url: `client/transactions/${id}`,
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        credentials: "include",
      }),
      invalidatesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetUserByIdQuery,
  useGetUserByEmailQuery,
  usePostUserMutation,
  usePutUserMutation,
  useDeleteUserMutation,
  usePostSigninMutation,
  usePostSignoutMutation,
  usePostForgotPasswordMutation,
  usePatchResetPasswordMutation,
  usePatchChangePasswordMutation,
  usePostVerifyEmailMutation,
  usePostValidateTokenMutation,
  usePostRefreshTokenMutation,
  usePostRevokeTokenMutation,

  useGetProductsQuery,
  useGetProductsByIdQuery,
  usePutProductMutation,
  usePostProductMutation,
  useDeleteProductMutation,

  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  usePutTransactionMutation,
  usePostTransactionMutation,
  useDeleteTransactionMutation,

  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = dashboardApi;
