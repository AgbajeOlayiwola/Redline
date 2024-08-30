"use client"
import AllComplaints from "@/component/Layout/complaint_layout/all_complaints"
import ComplaintChat from "@/component/Layout/complaint_layout/chat"
import Cover from "@/component/Layout/cover"
import { useState } from "react"
import styles from "./styles.module.css"
const Complaint = () => {
  const [chatData, setChatData] = useState()

  const [page, setPage] = useState(0)
  const [customerId, setCustomerId] = useState()

  // const searchParticularData = (id: any) => {
  //   const targetComplaintId = id

  //   const targetComplaint = fetchComplaintsData?.complaints?.find(
  //     (complaint: any) => complaint.id === targetComplaintId
  //   )
  //   setChatData(targetComplaint)
  // }
  const conditional_component = () => {
    switch (page) {
      case 0:
        return (
          <AllComplaints
            id={customerId}
            chatData={(id: any) => {
              console.log(id)
              setPage(1)
              setChatData(id)
            }}
          />
        )
      case 1:
        return <ComplaintChat chat={chatData} previous={() => setPage(0)} />
    }
  }
  return (
    <div className={styles.dash_layout}>
      <Cover>{conditional_component()}</Cover>
    </div>
  )
}

export default Complaint
