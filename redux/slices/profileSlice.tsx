import { createSlice } from "@reduxjs/toolkit"
const initialState = {}
const allProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      return payload
    },
    clearProfile: () => {
      return {}
    },
  },
})

const { reducer, actions } = allProfileSlice
export const { setProfile, clearProfile } = actions
export default reducer
