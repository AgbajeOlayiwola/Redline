import CustomDropdown from "@/component/reusable_compoenent/custome_dropdown"
import Table from "../../table"
import styles from "./styls.module.css"
const AllComplaints = ({ nextPage }: { nextPage: any }) => {
  const table_head = [
    { text: "Customer ID" },
    { text: "Customer" },
    { text: "Assigned to" },
    { text: "Date created" },
    { text: "Time created" },
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
    <>
      <div className={styles.add_agent}>
        <h1>Complaints</h1>
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
        load={null}
        table_head={table_head}
        table_body={table_body}
        onClick={() => nextPage()}
      />
    </>
  )
}

export default AllComplaints
