import { RiLoader2Line } from "react-icons/ri"
import styles from "./styles.module.css"
const OutlineButton = ({
  text,
  onClick,
  loads,
}: {
  text: string
  onClick: any
  loads?: any
}) => {
  return (
    <div className={styles.outline_btn} onClick={onClick}>
      {loads ? <RiLoader2Line /> : <p> {text}</p>}
    </div>
  )
}

export default OutlineButton
