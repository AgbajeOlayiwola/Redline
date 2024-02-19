"usee client"
import Back_svg from "@/component/SVGs/back_svg"
import { useGetUsersTripsMutation } from "@/redux/api/mutationApi"
import { useEffect, useState } from "react"

import Table from "../table"
import styles from "./styles.module.css"
const EachUsrTrips = ({ id, previous }: { id: any; previous: any }) => {
  const [convertedData, setConvertedData] = useState()
  const [
    getUsersTrips,
    {
      data: getUsersTripsData,
      isLoading: getUsersTripsLoad,
      isSuccess: getUsersTripsSuccess,
      isError: getUsersTripsFalse,
      error: getUsersTripsErr,
      reset: getUsersTripsReset,
    },
  ] = useGetUsersTripsMutation()
  const table_head = [
    { text: "Refference ID" },
    { text: "Customer" },
    { text: "Status" },
    { text: "Transaction date" },
    { text: "Amount" },
    { text: "Train" },
    { text: "Actions" },
  ]
  useEffect(() => {
    const data = {
      user_id: id,
      page: "",
      limit: "",
    }
    getUsersTrips(data)
  }, [])
  useEffect(() => {
    if (getUsersTripsSuccess) {
      const convertUserObject = (user: any) => {
        return {
          ref: user.ticket_id,
          customer: user.traveller.fullName,
          amount: user.total,
          Date: user.createdAt,
          type: user.status,
          status: user.train.name,
        }
      }

      // Assuming getOrganizationUsersData?.data is an array
      const convertedData = getUsersTripsData?.trips?.map((user: any) =>
        convertUserObject(user)
      )

      setConvertedData(convertedData)
      console.log(convertedData)
    }
  }, [getUsersTripsSuccess, getUsersTripsData])
  return (
    <div className={styles.main}>
      <div className={styles.back_save}>
        <Back_svg
          onClick={() => {
            previous()
          }}
        />
      </div>
      <br />
      <br />
      <Table
        editDelete={false}
        table_head={table_head}
        table_body={convertedData}
        onClick={() => null}
        load={getUsersTripsLoad}
        noItemFound={getUsersTripsData?.trips?.length <= 0 ? true : false}
      />
    </div>
  )
}

export default EachUsrTrips
