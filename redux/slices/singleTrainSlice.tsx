import { createSlice } from "@reduxjs/toolkit"
const initialState = {}
const singleTrainSlice = createSlice({
  name: "singleTrain",
  initialState,
  reducers: {
    setSingleTrain: (state, { payload }) => {
      return payload
    },
    clearSingleTrain: () => {
      return {}
    },
  },
})

const { reducer, actions } = singleTrainSlice
export const { setSingleTrain, clearSingleTrain } = actions
export default reducer
