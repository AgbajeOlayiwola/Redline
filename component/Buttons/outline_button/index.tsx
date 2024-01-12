import styles from "./styles.module.css"

const OutlineButton = ({ text, onClick }: { text: string; onClick: any }) => {
  return (
    <div className={styles.outline_btn} onClick={onClick}>
      <p> {text}</p>
    </div>
  )
}

export default OutlineButton
