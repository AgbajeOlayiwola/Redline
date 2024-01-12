"use client"
import Cover from "@/component/Layout/cover"
import { useState } from "react"
import styles from "./styles.module.css"
import AllComplaints from "@/component/Layout/complaint_layout/all_complaints"
import ComplaintChat from "@/component/Layout/complaint_layout/chat"
const Complaint = () => {
  const [page, setPage] = useState(0)
  const conditional_component = () => {
    switch (page) {
      case 0:
        return <AllComplaints nextPage={() => setPage(1)} />
      case 1:
        return <ComplaintChat previous={() => setPage(0)} />
    }
  }
  return (
    <div className={styles.dash_layout}>
      <Cover>{conditional_component()}</Cover>
    </div>
  )
}

export default Complaint
