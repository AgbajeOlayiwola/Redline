"use client"
import Cover from "@/component/Layout/cover"
import All_tickets from "@/component/Layout/ticket_management/all_tickets"
import Edit_tickets from "@/component/Layout/ticket_management/edit_tickets"
import { useState } from "react"
import styles from "./styles.module.css"

const TicketManagment = () => {
  const [page, setPage] = useState(0)
  const conditional_component = () => {
    switch (page) {
      case 0:
        return <All_tickets nextPage={() => setPage(1)} />
      case 1:
        return <Edit_tickets previous={() => setPage(0)} />
    }
  }
  return (
    <div className={styles.dash_layout}>
      <Cover>{conditional_component()}</Cover>
    </div>
  )
}

export default TicketManagment
