import styles from './styles.module.css'

const PrimaryInput = ({label, type, onchange,name, placeholder}:{label:string, type:string,name:string, onchange:any, placeholder:string}) => {
  return (
    <div className={styles.pInput}>
        <label>{label}</label>
        <input placeholder={placeholder} type={type} name={name} onChange={onchange} className={styles.input}/>
    </div>
  )
}

export default PrimaryInput