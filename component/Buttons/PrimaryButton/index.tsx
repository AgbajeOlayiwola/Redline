import LoadingAnimation from "@/component/animations/loadingAnimation"
import styles from "./styles.module.css"
const PrimartButton = ({
  text,
  active,
  onClick,
  load,
}: {
  text: any
  active: boolean
  onClick: any
  load: any
}) => {
  return (
    <button
      className={active ? styles.Activebtn : styles.btn}
      disabled={!active ? true : false}
      onClick={onClick}
    >
      {load ? <LoadingAnimation /> : <>{text}</>}
    </button>
  )
}

export default PrimartButton
