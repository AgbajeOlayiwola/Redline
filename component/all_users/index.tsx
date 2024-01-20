import { useGetUsersMutation } from "@/redux/api/mutationApi"
import { useEffect, useState } from "react"
import Table from "../Layout/table"

const AllUsers = ({
  openNext,
  deleteModal,
  customerId,
  ShowModal,
}: {
  openNext: any
  deleteModal: any
  customerId: any
  ShowModal: any
}) => {
  const [convertedData, setConvertedData] = useState()

  const table_head = [
    { text: "Id" },
    { text: "Email Address" },
    { text: "Customer type" },
    { text: "Date added" },
    { text: "Phone number" },
    { text: "Full name" },
    { text: "Actions" },
  ]
  const [
    getUsers,
    {
      data: getUsersData,
      isLoading: getUsersLoad,
      isSuccess: getUsersSuccess,
      isError: getUsersFalse,
      error: getUsersErr,
      reset: getUsersReset,
    },
  ] = useGetUsersMutation()
  useEffect(() => {
    const data = {
      page: "",
      limit: "",
    }
    getUsers(data)
  }, [])
  useEffect(() => {
    if (getUsersSuccess) {
      const convertUserObject = (user: any) => {
        return {
          ref: user.id,
          customer: user.emailAddress,
          amount: user.phoneNumber,
          Date: user.createdAt,
          type: user.role,
          status: user.fullName,
        }
      }

      // Assuming getOrganizationUsersData?.data is an array
      const convertedData = getUsersData?.data.map((user: any) =>
        convertUserObject(user)
      )

      setConvertedData(convertedData)
      console.log(convertedData)
    }
  }, [getUsersSuccess, getUsersData])
  return (
    <div>
      <Table
        deleteAction={(id: any) => {
          deleteModal(), customerId(id)
        }}
        load={getUsersLoad}
        editModal={() => ShowModal()}
        table_head={table_head}
        table_body={convertedData}
        onClick={(id: any) => openNext(id)}
      />
    </div>
  )
}

export default AllUsers
