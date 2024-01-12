import { FiMoreVertical } from "react-icons/fi"
import styles from "./styles.module.css"
const Table = ({
  table_head,
  table_body,
  onClick,
}: {
  table_head: any
  table_body: any
  onClick: any
}) => {
  return (
    <div>
      <div className={styles.table_head}>
        {table_head?.map((item: any, index: any) => {
          return (
            <>
              <div key={index}>
                <p>{item?.text}</p>
              </div>
            </>
          )
        })}
      </div>
      <div className={styles.table_body_cov}>
        {table_body?.map((item: any, index: any) => {
          return (
            <>
              <div key={index} className={styles.table_body} onClick={onClick}>
                <div>
                  <p>{item?.ref}</p>
                </div>
                <div>
                  <p>{item?.customer}</p>
                </div>
                <div>
                  <p>{item?.type}</p>
                </div>
                <div>
                  <p>{item?.Date}</p>
                </div>
                <div>
                  <p>{item?.amount}</p>
                </div>
                <div>
                  <p>{item?.status}</p>
                </div>
                <div>
                  <FiMoreVertical />
                </div>
              </div>
              <hr className={styles.table_hr} />
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Table
