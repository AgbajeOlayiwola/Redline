import styles from './styles.module.css'

const PrimaryInput = ({
  label,
  type,
  onchange,
  name,
  placeholder,
  value,
}: {
  label: string
  type: string
  name: string
  onchange: any
  placeholder: string
  value:any
}) => {
  return (
    <div className={styles.pInput}>
      <label>{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onchange}
        className={styles.input}
      />
    </div>
  )
}

export default PrimaryInput