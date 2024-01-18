import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseUrl = "https://fmil-backend-3rqwa.ondigitalocean.app/v1/api/"

export const mutationApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().cookie
      // headers.set('x-api-key', `${process.env.BASE_KEY}`);
      headers.set("Accept", "application/json")
      headers.set("Content-Type", "application/json")
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    createTrain: builder.mutation({
      query: (body) => ({
        url: "organization/train",
        method: "POST",
        body,
      }),
    }),
    editTrain: builder.mutation({
      query: (body) => ({
        url: "organization/train/update",
        method: "POST",
        body,
      }),
    }),
    fetchTrain: builder.mutation({
      query: (body) => ({
        url: "organization/train/fetch",
        method: "POST",
        body,
      }),
    }),
    deleteTrain: builder.mutation({
      query: (body) => ({
        url: "organization/train",
        method: "DELETE",
        body,
      }),
    }),
    createTicket: builder.mutation({
      query: (body) => ({
        url: "organization/ticket",
        method: "POST",
        body,
      }),
    }),
    editTicket: builder.mutation({
      query: (body) => ({
        url: "organization/ticket/update",
        method: "POST",
        body,
      }),
    }),
    fetchTicket: builder.mutation({
      query: (body) => ({
        url: "organization/ticket/fetch",
        method: "POST",
        body,
      }),
    }),
    deleteTicket: builder.mutation({
      query: (body) => ({
        url: "organization/ticket",
        method: "DELETE",
        body,
      }),
    }),
    getOrganizationUsers: builder.mutation({
      query: (body) => ({
        url: "organization/fmil-users",
        method: "POST",
        body,
      }),
    }),

    inviteMemberOrganization: builder.mutation({
      query: (body) => ({
        url: "organization/invite-members",
        method: "POST",
        body,
      }),
    }),
    addNotifications: builder.mutation({
      query: (body) => ({
        url: "organization/add-notification",
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "users/change-password",
        method: "POST",
        body,
      }),
    }),
    deletOrganisationUser: builder.mutation({
      query: (body) => ({
        url: "organization/user-delete",
        method: "POST",
        body,
      }),
    }),
    updateOrganisationUser: builder.mutation({
      query: (body) => ({
        url: "organization/user-status",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const {
  useUpdateOrganisationUserMutation,
  useDeletOrganisationUserMutation,
  useUserLoginMutation,
  useCreateTrainMutation,
  useAddNotificationsMutation,
  useCreateTicketMutation,
  useDeleteTicketMutation,
  useDeleteTrainMutation,
  useEditTicketMutation,
  useEditTrainMutation,
  useFetchTicketMutation,
  useFetchTrainMutation,
  useGetOrganizationUsersMutation,
  useInviteMemberOrganizationMutation,
} = mutationApi
