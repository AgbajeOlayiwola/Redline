import React, { ReactNode } from "react"
import styles from "./styles.module.css"
interface IndexProps {
  children: ReactNode
}

const Cover: React.FC<IndexProps> = ({ children }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}

export default Cover
