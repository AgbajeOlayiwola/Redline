"use client"
import Cover from "@/component/Layout/cover"
import Genaral from "@/component/Layout/profile/general"
import RolesAndPermision from "@/component/Layout/profile/roles_and_permission"
import Security from "@/component/Layout/profile/security"
import { useState } from "react"
import styles from "./styles.module.css"

const TicketManagment = () => {
  const [page, setPage] = useState(0)
  const conditional_component = () => {
    switch (page) {
      case 0:
        return <Genaral />
      case 1:
        return <Security />
      case 2:
        return <RolesAndPermision />
    }
  }
  return (
    <>
      <Cover>
        <div className={styles.ticks}>
          {" "}
          <h1>Settings</h1>
          <div className={styles.active_paused}>
            <div
              className={page === 0 ? styles.active : styles.paused}
              onClick={() => {
                setPage(0)
              }}
            >
              <p>General</p>
            </div>
            <div
              className={page == 1 ? styles.active : styles.paused}
              onClick={() => {
                setPage(1)
              }}
            >
              <p>Security</p>
            </div>
            {/* <div
              className={page == 2 ? styles.active : styles.paused}
              onClick={() => {
                setPage(2)
              }}
            >
              <p>Roles And Permissions</p>
            </div> */}
          </div>
        </div>
      </Cover>
      <Cover>
        <div className={styles.back_g}>{conditional_component()}</div>
      </Cover>
    </>
  )
}

export default TicketManagment
