import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"

import { api } from "./services/api"
import user from "../features/user/userSlice"
import note from "../features/note/noteSlice"
import theme from "../features/theme/themeSlice"
import { listenerMiddleware } from "./middlewares/auth"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user,
    note,
    theme,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware)
  },
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
