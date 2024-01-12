"use client"
import PrimartButton from "@/component/Buttons/PrimaryButton"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import Cover from "@/component/Layout/cover"
import Modal from "@/component/Layout/modal"
import Table from "@/component/Layout/table"
import CustomDropdown from "@/component/reusable_compoenent/custome_dropdown"
import { useState } from "react"
import { GiCancel } from "react-icons/gi"
import styles from "./styles.module.css"
const Agent = () => {
  const [showModal, setShowModal] = useState(false)
  const table_head = [
    { text: "Agent" },
    { text: "Email Address" },
    { text: "Phone Number" },
    { text: "Tickets Sold" },
    { text: "Last Active Date" },
    { text: "Station" },
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
      {showModal ? (
        <Modal>
          <div className={styles.agent_inner}>
            {" "}
            <div className={styles.new_agent}>
              <div>
                <h2>New Agents</h2>
                <p>Add a new agent to a station</p>
              </div>
              <GiCancel onClick={() => setShowModal((prev) => !prev)} />
            </div>
            <div className={styles.input_drill}>
              <PrimaryInput
                label="Agent name"
                type="text"
                name="agent_name"
                onchange={(e: any) => e.taregt.value}
                placeholder="Enter agent name"
              />
            </div>
            <div className={styles.input_drill}>
              <PrimaryInput
                label="Station"
                type="text"
                name="agent_name"
                onchange={(e: any) => e.taregt.value}
                placeholder="Choose a station"
              />
            </div>
            <PrimartButton
              text="Assign agent"
              active={true}
              onClick={() => setShowModal((prev) => !prev)}
            />
          </div>
        </Modal>
      ) : null}
      <Cover>
        <div className={styles.add_agent}>
          <h1>Agents</h1>
          <div className={styles.add_agent_btn}>
            <PrimartButton
              text="Add agent"
              active={true}
              onClick={() => setShowModal((prev) => !prev)}
            />
          </div>
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

export default Agent
