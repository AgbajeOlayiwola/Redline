"use client"
import AllComplaints from "@/component/Layout/complaint_layout/all_complaints"
import Cover from "@/component/Layout/cover"
import AllUsers from "@/component/all_users"
import { useState } from "react"
import styles from "./styles.module.css"
const Complaint = () => {
  const [page, setPage] = useState(0)
  const [customerId, setCustomerId] = useState()
  const conditional_component = () => {
    switch (page) {
      case 0:
        return (
          <AllUsers
            openNext={(id: any) => {
              setCustomerId(id), setPage(1)
            }}
            label="Transactions"
            deleteModal={null}
            customerId={null}
            ShowModal={null}
          />
        )
      case 1:
        return <AllComplaints previous={() => setPage(0)} id={customerId} />
    }
  }
  return (
    <div className={styles.dash_layout}>
      <Cover>{conditional_component()}</Cover>
    </div>
  )
}

export default Complaint
