import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

const baseUrl = "https://api.staging.bankitafrica.com"

// const baseUrl = 'https://bankit-two.vercel.app/api/v1';

export const queryApi = createApi({
  reducerPath: "queryApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.token
      headers.set("x-api-key", "aXA7DdqHKemWwXO5maT1hiLuWbOYTyFB")
      headers.set("Accept", "application/json")
      headers.set("Content-Type", "application/json")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => {
        return {
          url: "user",
        }
      },
    }),
  }),
})

export const { useGetBeneficiariesQuery } = queryApi
