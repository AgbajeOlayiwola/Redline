import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = "https://fmil-backend-3rqwa.ondigitalocean.app/v1/api"

// const baseUrl = 'https://bankit-two.vercel.app/api/v1';

export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers: any, { getState }: any) => {
      const token = getState()?.cookie
      headers.set("x-api-key", "aXA7DdqHKemWwXO5maT1hiLuWbOYTyFB")
      headers.set("Accept", "application/json")
      headers.set("Content-Type", "application/json")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder: any) => ({
    getProfile: builder.query({
      query: () => {
        return {
          url: "user",
        }
      },
    }),
    trainTraffic: builder.query({
      query: () => {
        return {
          url: "trips/total-traffic",
        }
      },
    }),
  }),
})

export const { useTrainTrafficQuery } = queryApi
