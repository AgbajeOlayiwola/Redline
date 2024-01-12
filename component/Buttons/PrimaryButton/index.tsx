import styles from "./styles.module.css"
const PrimartButton = ({
  text,
  active,
  onClick,
}: {
  text: any
  active: boolean
  onClick: any
}) => {
  return (
    <button
      className={active ? styles.Activebtn : styles.btn}
      disabled={!active ? true : false}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default PrimartButton
