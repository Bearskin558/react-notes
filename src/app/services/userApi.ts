import { api } from "./api"
import { User } from "../types"

export const userApi = api.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<
      User,
      { email: string; password: string; name: string }
    >({
      query: userData => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: userData => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    current: builder.query<User, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),
  }),
})

export const { register, login, current } = userApi.endpoints
export const { useLoginMutation, useRegisterMutation, useCurrentQuery } =
  userApi
