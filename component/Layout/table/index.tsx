import LoadingAnimation from "@/component/animations/loadingAnimation"
import { setEditAgentt } from "@/redux/slices/edit-agent-slice"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import { useDispatch } from "react-redux"
import styles from "./styles.module.css"
const Table = ({
  table_head,
  table_body,
  onClick,
  deleteAction,
  editModal,
  noItemFound,
  load,
  editDelete,
}: {
  table_head?: any
  table_body?: any
  onClick?: any
  deleteAction?: any
  editModal?: any
  noItemFound?: any
  load: any
  editDelete: boolean
}) => {
  const dispatch = useDispatch()
  const [showAction, setShowAction] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)

  const navigation = usePathname()
  const handleToggleEdit = (index: any) => {
    setSelectedItemIndex(index)
    setShowAction((prev) => !prev)
  }
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }
  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    handleWindowResize()
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [width])

  return (
    <div className={styles.tableMain}>
      {width > 900 ? (
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
      ) : null}
      <div className={styles.table_body_cov}>
        {load ? (
          <LoadingAnimation />
        ) : noItemFound ? (
          <h3>No Items Found</h3>
        ) : (
          table_body?.map((item: any, index: any) => {
            return (
              <>
                {width > 900 ? (
                  <div key={index} className={styles.table_body}>
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
                          {navigation == "/admin/agents" ? null : (
                            <p onClick={() => onClick(item?.ref)}>
                              View Details
                            </p>
                          )}
                          {editDelete ? (
                            <>
                              <p
                                onClick={() => {
                                  dispatch(setEditAgentt(item)), editModal()
                                }}
                              >
                                Edit
                              </p>
                              <h6 onClick={() => deleteAction(item?.ref)}>
                                Delete
                              </h6>
                            </>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div key={index} className={styles.table_body}>
                    <div>
                      <p>{item?.customer}</p>
                      <p>{item?.amount}</p>
                    </div>
                    <div>
                      <p>{item?.customer}</p>
                      <FiMoreVertical onClick={() => handleToggleEdit(index)} />
                      {showAction && selectedItemIndex === index ? (
                        <div className={styles.show}>
                          {navigation == "/admin/agents" ? null : (
                            <p onClick={() => onClick(item?.ref)}>
                              View Details
                            </p>
                          )}
                          <p
                            onClick={() => {
                              dispatch(setEditAgentt(item)), editModal()
                            }}
                          >
                            Edit
                          </p>
                          <h6 onClick={() => deleteAction(item?.ref)}>
                            Delete
                          </h6>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
                <hr className={styles.table_hr} />
              </>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Table
