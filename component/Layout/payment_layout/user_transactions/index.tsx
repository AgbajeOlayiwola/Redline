"usee client"
import Back_svg from "@/component/SVGs/back_svg"
import { useGetUsersTransactionsMutation } from "@/redux/api/mutationApi"
import { useEffect, useState } from "react"
import Table from "../../table"
import styles from "./styles.module.css"
const EachUsrTransactions = ({ id, previous }: { id: any; previous: any }) => {
  const [convertedData, setConvertedData] = useState()
  const [
    getUsersTransactions,
    {
      data: getUsersTransactionsData,
      isLoading: getUsersTransactionsLoad,
      isSuccess: getUsersTransactionsSuccess,
      isError: getUsersTransactionsFalse,
      error: getUsersTransactionsErr,
      reset: getUsersTransactionsReset,
    },
  ] = useGetUsersTransactionsMutation()
  const table_head = [
    { text: "Refference ID" },
    { text: "Customer" },
    { text: "Transaction date" },
    { text: "Amount" },
    { text: "Status" },
    { text: "Cost" },
    { text: "Actions" },
  ]
  useEffect(() => {
    const data = {
      user_id: id,
      page: "",
      limit: "",
    }
    getUsersTransactions(data)
  }, [])
  useEffect(() => {
    if (getUsersTransactionsSuccess) {
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
      const convertedData = getUsersTransactionsData?.data.map((user: any) =>
        convertUserObject(user)
      )

      setConvertedData(convertedData)
      console.log(convertedData)
    }
  }, [getUsersTransactionsSuccess, getUsersTransactionsData])
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
        table_head={table_head}
        table_body={convertedData}
        onClick={() => null}
        noItemFound={getUsersTransactionsData?.data?.lenght <= 0 ? true : false}
      />
    </div>
  )
}

export default EachUsrTransactions
