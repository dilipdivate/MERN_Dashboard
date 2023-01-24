import { createApi } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import customFetchBase from "./customFetchBase";
// import { IUser } from './types';

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customFetchBase,
  tagTypes: ["User"],
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: "general/user/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    transformResponse: (result) => result.data.user,
    async onQueryStarted(args, { dispatch, queryFulfilled }) {
      try {
        const { data } = await queryFulfilled;
        console.log("Return data fro api", data);
        dispatch(setUser(data));
      } catch (error) {
        console.log(error);
      }
    },
  }),
});

export const { useGetMeQuery } = userApi;
