import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
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
      }),
      providesTags: ["User"],
    }),
    getUserByEmail: build.query({
      query: (email) => ({
        url: `general/user/${email}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    postUser: build.mutation({
      query: (payload) => ({
        url: `general/user`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["User"],
    }),
    putUser: build.mutation({
      query: (id, payload) => ({
        url: `general/user/${id}`,
        method: "PUT",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `general/user/${id}`,
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["User"],
    }),
    postSignin: build.mutation({
      query: (payload) => ({
        url: `general/user/signin`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["User"],
    }),
    postForgotPassword: build.mutation({
      query: (payload) => ({
        url: `general/user/forgot-password`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["User"],
    }),
    postResetPassword: build.mutation({
      query: (payload) => ({
        url: `general/user/reset-password`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["User"],
    }),
    postVerifyEmail: build.mutation({
      query: (payload) => ({
        url: `general/user/verify-email`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["User"],
    }),
    postValidateToken: build.mutation({
      query: (payload) => ({
        url: `general/user/validate-reset-token`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["User"],
    }),
    postRefreshToken: build.mutation({
      query: (payload) => ({
        url: `general/user/refresh-token`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["User"],
    }),
    postRevokeToken: build.mutation({
      query: (payload) => ({
        url: `general/user/revoke-token`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["User"],
    }),
    getProducts: build.query({
      // query: () => "client/products",
      query: () => ({ url: "client/products", method: "GET" }),
      providesTags: ["Products"],
    }),

    getProductsById: build.query({
      query: (id) => ({
        url: `client/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    postProduct: build.mutation({
      query: (payload) => ({
        url: `client/products`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["Products"],
    }),
    putProduct: build.mutation({
      query: (id, payload) => ({
        url: `client/products/${id}`,
        method: "PUT",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `client/products/${id}`,
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["Products"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),

    getTransactionById: build.query({
      query: (id) => ({
        url: `client/transactions/${id}`,
        method: "GET",
      }),
      providesTags: ["Transactions"],
    }),
    postTransaction: build.mutation({
      query: (payload) => ({
        url: `client/transactions`,
        method: "POST",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["Transactions"],
    }),
    putTransaction: build.mutation({
      query: (id, payload) => ({
        url: `client/transactions/${id}`,
        method: "PUT",
        body: payload,
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }),
      invalidatesTags: ["Transactions"],
    }),
    deleteTransaction: build.mutation({
      query: (id) => ({
        url: `client/transactions/${id}`,
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
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
  usePostForgotPasswordMutation,
  usePostResetPasswordMutation,
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
} = apiSlice;
