import { useGetUsersMutation } from "@/redux/api/mutationApi"
import { useEffect, useState } from "react"
import PrimaryInput from "../Inputs/PrimmaryInput"
import Table from "../Layout/table"
import CustomDropdown from "../reusable_compoenent/custome_dropdown"
import styles from "./styles.module.css"

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
  const [showModal, setShowModal] = useState(false)
  const [deletModala, setDeleteModal] = useState(false)
  const [searchType, setSearchType] = useState("")
  const [displayType, setDisplayType] = useState("")
  const [page, setPage] = useState(0)

  const email = [
    { label: "email", value: "email" },
    { label: "name", value: "name" },
  ]

  const handleSelect = (selectedOption: any) => {
    console.log(selectedOption)
    setDisplayType(selectedOption?.value)
  }
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
      // Filter the data based on the searchType
      const filteredData = convertedData?.filter((user: any) =>
        Object.values(user).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchType.toLowerCase())
        )
      )

      setConvertedData(filteredData || [])
      console.log(filteredData)
    }
  }, [getUsersSuccess, searchType, getUsersData])
  return (
    <div>
      {page === 0 ? (
        <>
          <div>
            <h1>Transactions</h1>
          </div>
          <div className={styles.filter_div}>
            <div>
              <p>Filter: </p>

              <CustomDropdown
                options={email}
                onSelect={handleSelect}
                placeholder="All"
              />
              {displayType === "name" || displayType === "email" ? (
                <PrimaryInput
                  label=""
                  type="text"
                  name="string"
                  onchange={(e: any) => setSearchType(e.target.value)}
                  placeholder={
                    displayType === "name"
                      ? "Search by name"
                      : "Search by email"
                  }
                  value={searchType}
                />
              ) : null}
            </div>
          </div>
        </>
      ) : null}
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
