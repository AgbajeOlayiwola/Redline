"use client"
import Cover from "@/component/Layout/cover"
import EditSchedule from "@/component/Layout/dashboard_layouts/edit_schedule"
import MainDash from "@/component/Layout/dashboard_layouts/main_dash"
import { useState } from "react"
import styles from "./styles.module.css"
const Dashboard = () => {
  const [page, setPage] = useState(0)
  const conditional_component = () => {
    switch (page) {
      case 0:
        return <MainDash nextPage={() => setPage(1)} />
      case 1:
        return <EditSchedule previous={() => setPage(0)} />
    }
  }
  return (
    <div className={styles.dash_layout}>
      <Cover>{conditional_component()}</Cover>
    </div>
  )
}

export default Dashboard
