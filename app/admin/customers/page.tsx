"use client"
import Cover from "@/component/Layout/cover"
import Table from "@/component/Layout/table"
import CustomDropdown from "@/component/reusable_compoenent/custome_dropdown"
import styles from "./styles.module.css"
const TicketSale = () => {
  const table_head = [
    { text: "Ticket ID" },
    { text: "Customer" },
    { text: "Ticket type" },
    { text: "Boarding station" },
    { text: "Destination" },
    { text: "Cost" },
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
    {
      ref: "MKOP_WJ22",
      customer: "Jerry Olakunle",
      type: "Withdrawal",
      Date: "10-12-2023",
      amount: "#10000",
      status: "Successful",
    },
    {
      ref: "MKOP_WJ22",
      customer: "Jerry Olakunle",
      type: "Withdrawal",
      Date: "10-12-2023",
      amount: "#10000",
      status: "Successful",
    },
    {
      ref: "MKOP_WJ22",
      customer: "Jerry Olakunle",
      type: "Withdrawal",
      Date: "10-12-2023",
      amount: "#10000",
      status: "Successful",
    },
    {
      ref: "MKOP_WJ22",
      customer: "Jerry Olakunle",
      type: "Withdrawal",
      Date: "10-12-2023",
      amount: "#10000",
      status: "Successful",
    },
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
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]
  const handleSelect = (selectedOption: any) => {
    console.log("Selected Option:", selectedOption)
  }
  return (
    <div className={styles.dash_layout}>
      <Cover>
        <div>
          <h1>Ticket sales</h1>
        </div>
        <div className={styles.filter_div}>
          <div>
            <p>Filter: </p>
            <CustomDropdown
              options={options}
              onSelect={handleSelect}
              placeholder="All"
            />
          </div>
        </div>
        <Table
          table_head={table_head}
          table_body={table_body}
          onClick={() => null}
        />
      </Cover>
    </div>
  )
}

export default TicketSale
