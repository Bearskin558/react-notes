import { createSlice } from "@reduxjs/toolkit"

import { User } from "../../app/types"
import { userApi } from "../../app/services/userApi"
import { RootState } from "../../app/store"

interface InitialState {
  isAuthentificated: boolean
  token?: string
}

const initialState: InitialState = {
  isAuthentificated: false,
}

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: state => {
      localStorage.setItem("token", "")
      return initialState
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.isAuthentificated = true
        state.token = action.payload.token
      },
    )
    builder.addMatcher(
      userApi.endpoints.current.matchFulfilled,
      (state, payload) => {
        state.isAuthentificated = true
      },
    )
  },
})

export const { logout } = slice.actions
export default slice.reducer

export const selectIsAuthentificated = (state: RootState) =>
  state.user.isAuthentificated
