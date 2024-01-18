import styles from "./styles.module.css"
const PrimarySelect = ({
  label,
  options,
  onchange,
}: {
  label: any
  options: any
  onchange: any
}) => {
  return (
    <div className={styles.pInput}>
      <label>{label}</label>
      <select onChange={onchange}>
        {options.map((item: any, index: number) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default PrimarySelect
