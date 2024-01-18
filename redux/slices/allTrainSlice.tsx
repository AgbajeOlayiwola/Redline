import { createSlice } from "@reduxjs/toolkit"
const initialState = {}
const allTrainSlice = createSlice({
  name: "allTrain",
  initialState,
  reducers: {
    setAllTrain: (state, { payload }) => {
      return payload
    },
    clearAllTrain: () => {
      return {}
    },
  },
})

const { reducer, actions } = allTrainSlice
export const { setAllTrain, clearAllTrain } = actions
export default reducer
