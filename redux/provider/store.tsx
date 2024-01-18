import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { combineReducers } from "redux"
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { mutationApi } from "../api/mutationApi"
import allTrainReducr from "../slices/allTrainSlice"
import cookieReducer from "../slices/cookieSlice"
import profileReduceer from "../slices/profileSlice"
import singleTrainReducer from "../slices/singleTrainSlice"
const reducers = combineReducers({
  [mutationApi.reducerPath]: mutationApi.reducer,
  cookie: cookieReducer,
  profile: profileReduceer,
  singleTrain: singleTrainReducer,
  allTrain: allTrainReducr,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cookie", "profile", "singleTrain", "allTrain"],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(mutationApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
setupListeners(store.dispatch)
export const persistor = persistStore(store)
