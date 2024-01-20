"use client"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import Cover from "@/component/Layout/cover"
import EachUsrTransactions from "@/component/Layout/payment_layout/user_transactions"
import AllUsers from "@/component/all_users"
import CustomDropdown from "@/component/reusable_compoenent/custome_dropdown"
import { useState } from "react"
import styles from "./styles.module.css"
const Payment = () => {
  const [showModal, setShowModal] = useState(false)
  const [deletModala, setDeleteModal] = useState(false)
  const [customerId, setCustomerId] = useState()
  const [searchType, setSearchType] = useState("")
  const [displayType, setDisplayType] = useState("")
  const [page, setPage] = useState(0)

  const email = [
    { label: "email", value: "email" },
    { label: "name", value: "name" },
  ]
  const name = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]
  const type = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]
  const handleSelect = (selectedOption: any) => {
    console.log(selectedOption)
    setDisplayType(selectedOption?.value)
  }

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
        return (
          <EachUsrTransactions previous={() => setPage(0)} id={customerId} />
        )
    }
  }
  return (
    <div className={styles.dash_layout}>
      <Cover>{conditional_component()}</Cover>
    </div>
  )
}

export default Payment
