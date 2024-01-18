import { createSlice } from "@reduxjs/toolkit"
const initialState = {}
const editAgentSlice = createSlice({
  name: "editAgent",
  initialState,
  reducers: {
    setEditAgentt: (state, { payload }) => {
      return payload
    },
    clearEditAgent: () => {
      return {}
    },
  },
})

const { reducer, actions } = editAgentSlice
export const { setEditAgentt, clearEditAgent } = actions
export default reducer
