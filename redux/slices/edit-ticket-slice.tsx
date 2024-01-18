import { createSlice } from "@reduxjs/toolkit"
const initialState = {}
const editTicketSlice = createSlice({
  name: "cookie",
  initialState,
  reducers: {
    setEditTicket: (state, { payload }) => {
      return payload
    },
    clearEditTicket: () => {
      return {}
    },
  },
})

const { reducer, actions } = editTicketSlice
export const { setEditTicket, clearEditTicket } = actions
export default reducer
