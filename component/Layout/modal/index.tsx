import styles from "./styles.module.css"
const Modal = ({ children }: { children: any }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}

export default Modal
