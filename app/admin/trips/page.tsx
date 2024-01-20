"use client"
import Cover from "@/component/Layout/cover"
import EachUsrTrips from "@/component/Layout/trips"
import AllUsers from "@/component/all_users"
import { useState } from "react"
import styles from "./styles.module.css"
const Payment = () => {
  const [showModal, setShowModal] = useState(false)
  const [deletModala, setDeleteModal] = useState(false)
  const [customerId, setCustomerId] = useState()
  const [page, setPage] = useState(0)

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]
  const handleSelect = (selectedOption: any) => {
    console.log("Selected Option:", selectedOption)
  }
  const conditional_component = () => {
    switch (page) {
      case 0:
        return (
          <AllUsers
            openNext={(id: any) => {
              setCustomerId(id), setPage(1)
            }}
            label="Trips"
            deleteModal={null}
            customerId={null}
            ShowModal={null}
          />
        )
      case 1:
        return <EachUsrTrips previous={() => setPage(0)} id={customerId} />
    }
  }
  return (
    <div className={styles.dash_layout}>
      <Cover>{conditional_component()}</Cover>
    </div>
  )
}

export default Payment
