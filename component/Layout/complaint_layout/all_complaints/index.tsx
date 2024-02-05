"use client"
import Back_svg from "@/component/SVGs/back_svg"
import { useFetchComplaintsMutation } from "@/redux/api/mutationApi"
import { useEffect, useState } from "react"
import Table from "../../table"
import ComplaintChat from "../chat"
import styles from "./styls.module.css"
const AllComplaints = ({ id, previous }: { id: any; previous: any }) => {
  const [convertedData, setConvertedData] = useState<any[]>([])
  const [chatData, setChatData] = useState()
  const [roles, setRoles] = useState("")
  const [displayType, setDisplayType] = useState("")
  const table_head = [
    { text: "Customer ID" },
    { text: "Customer" },
    { text: "Phone" },
    { text: "Date created" },
    { text: "Role" },
    { text: "Progress" },
    { text: "Actions" },
  ]
  const table_body = [
    {
      ref: "MKOP_WJ22",
      customer: "Jerry Olakunle",
      type: "Withdrawal",
      Date: "10-12-2023",
      amount: "#10000",
      status: "Successful",
    },
  ]
  const options = [
    { label: "Role", value: "Role" },
    { label: "Status", value: "Status" },
  ]
  const rolesData = [
    { label: "Admin", value: "ADMIN" },
    { label: "Agent", value: "AGENT" },
    { label: "Support", value: "SUPPORT" },
  ]
  const statusDatas = [{ label: "Pending invite", value: "pending inviteDMIN" }]
  const handleSelect = (selectedOption: any) => {
    setDisplayType(selectedOption?.value)
    console.log("Selected Option:", selectedOption)
  }
  const handleSelectRole = (selectedOption: any) => {
    setRoles(selectedOption?.value)
    console.log("Selected Option:", selectedOption)
  }
  const handleSelectStatus = (selectedOption: any) => {
    setRoles(selectedOption?.value)
    console.log("Selected Option:", selectedOption)
  }
  const [
    fetchComplaints,
    {
      data: fetchComplaintsData,
      isLoading: fetchComplaintsLoad,
      isSuccess: fetchComplaintsSuccess,
      isError: fetchComplaintsFalse,
      error: fetchComplaintsErr,
      reset: fetchComplaintsReset,
    },
  ] = useFetchComplaintsMutation()
  useEffect(() => {
    const data = {
      userID: id,
      page: "",
      limit: "",
    }
    fetchComplaints(data)
    console.log(fetchComplaintsData)
  }, [])
  useEffect(() => {
    if (fetchComplaintsSuccess) {
      console.log(fetchComplaintsData)
      const convertUserObject = (user: any) => {
        return {
          ref: user.id,
          customer: user.userDetails.fullname,
          amount: user.userDetails.role,
          Date: user.createdAt,
          type: user.userDetails.phone,
          status: user.status,
        }
      }
      // Assuming getOrganizationUsersData?.data is an array
      const convertedData = fetchComplaintsData?.complaints?.map((user: any) =>
        convertUserObject(user)
      )

      setConvertedData(convertedData)
      console.log(convertedData)
      // Filter the data based on the searchType
      const filteredData = convertedData?.filter((user: any) =>
        Object.values(user).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(roles.toLowerCase())
        )
      )

      setConvertedData(filteredData || [])
      console.log(filteredData)
    }
  }, [fetchComplaintsSuccess])
  const searchParticularData = (id: any) => {
    const targetComplaintId = id

    const targetComplaint = fetchComplaintsData?.complaints?.find(
      (complaint: any) => complaint.id === targetComplaintId
    )
    setChatData(targetComplaint)
  }
  return (
    <>
      <div className={styles.add_agent}>
        <Back_svg onClick={() => previous()} />
        <h1>Complaints</h1>
      </div>

      <div className={styles.complaint_flex}>
        <div className={styles.tableMain}>
          <Table
            load={fetchComplaintsLoad}
            noItemFound={convertedData?.length <= 0 ? true : false}
            table_head={table_head}
            table_body={convertedData}
            onClick={(id: any) => {
              searchParticularData(id)
            }}
          />
        </div>
        <ComplaintChat chat={chatData} />
      </div>
    </>
  )
}

export default AllComplaints
