import { setEditAgentt } from "@/redux/slices/edit-agent-slice"
import { useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { useDispatch } from "react-redux"
import styles from "./styles.module.css"
const Table = ({
  table_head,
  table_body,
  onClick,
  deleteAction,
  editModal,
}: {
  table_head?: any
  table_body?: any
  onClick?: any
  deleteAction?: any
  editModal?: any
}) => {
  const dispatch = useDispatch()
  const [showAction, setShowAction] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)
  const handleToggleEdit = (index: any) => {
    setSelectedItemIndex(index)
    setShowAction((prev) => !prev)
  }

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
                  <p>{item?.Date.split("T")[0]}</p>
                </div>
                <div>
                  <p>{item?.amount}</p>
                </div>
                <div>
                  <p>{item?.status?.replace("_", " ").toLowerCase()}</p>
                </div>
                <div className={styles.action}>
                  <FiMoreVertical onClick={() => handleToggleEdit(index)} />
                  {showAction && selectedItemIndex === index ? (
                    <div className={styles.show}>
                      <p
                        onClick={() => {
                          dispatch(setEditAgentt(item)), editModal()
                        }}
                      >
                        Edit
                      </p>
                      <h6 onClick={() => deleteAction(item?.ref)}>Delete</h6>
                    </div>
                  ) : null}
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
