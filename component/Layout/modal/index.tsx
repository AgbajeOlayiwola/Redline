import styles from "./styles.module.css"
const Modal = ({ children, close }: { children: any; close: any }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div onClick={close} className={styles.close}>
          <h2>X</h2>
        </div>{" "}
        {children}
      </div>
    </div>
  )
}

export default Modal
