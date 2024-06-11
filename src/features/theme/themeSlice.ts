import { createSlice } from "@reduxjs/toolkit"

import { RootState } from "../../app/store"

interface InitialState {
  theme: "dark" | "light"
}

const initialState: InitialState = {
  theme: (localStorage.getItem("theme") as "dark" | "light") || "dark",
}

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.theme === "dark") {
        state.theme = "light"
        localStorage.setItem("theme", "light")
      } else {
        state.theme = "dark"
        localStorage.setItem("theme", "dark")
      }
    },
  },
})

export default slice.reducer
export const { toggleTheme } = slice.actions
export const selectTheme = (state: RootState) => state.theme.theme
