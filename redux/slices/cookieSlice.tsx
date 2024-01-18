import { createSlice } from "@reduxjs/toolkit"
const initialState = {}
const allCookieSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    setCookie: (state, { payload }) => {
      return payload
    },
    clearCookie: () => {
      return {}
    },
  },
})

const { reducer, actions } = allCookieSlice
export const { setCookie, clearCookie } = actions
export default reducer
