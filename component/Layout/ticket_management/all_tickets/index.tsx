import PrimartButton from "@/component/Buttons/PrimaryButton"
import OutlineButton from "@/component/Buttons/outline_button"
import CustomDropdown from "@/component/reusable_compoenent/custome_dropdown"
import {
  useDeleteTicketMutation,
  useFetchTicketMutation,
} from "@/redux/api/mutationApi"
import { useEffect, useState } from "react"
import { FiMoreVertical } from "react-icons/fi"
import styles from "./styles.module.css"
const All_tickets = ({ nextPage }: { nextPage: any }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null)
  const [showEdit, setShowEdit] = useState(false)
  const [showModal, setShowmodal] = useState(false)
  const [ticketId, setTicketId] = useState()

  const handleToggleEdit = (index: any) => {
    setSelectedItemIndex(index)
    setShowEdit((prev) => !prev)
  }

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]
  const handleSelect = (selectedOption: any) => {
    console.log("Selected Option:", selectedOption)
  }
  const [status, setStatus] = useState("ACTIVE")
  const [
    fetchTicket,
    {
      data: fetchTickettData,
      isLoading: fetchTicketLoad,
      isSuccess: fetchTicketSuccess,
      isError: fetchTicketFalse,
      error: fetchTicketErr,
      reset: fetchTicketReset,
    },
  ] = useFetchTicketMutation()
  const [
    deleteTicket,
    {
      data: deleteTicketData,
      isLoading: deleteTicketLoad,
      isSuccess: deleteTicketSuccess,
      isError: deleteTicketFalse,
      error: deleteTicketErr,
      reset: deleteTicketReset,
    },
  ] = useDeleteTicketMutation()

  useEffect(() => {
    const data = {
      status: "ACTIVE",
    }
    fetchTicket(data)
  }, [])
  useEffect(() => {
    if (deleteTicketSuccess) {
      const data = {
        status: "ACTIVE",
      }

      fetchTicket(data)
      setShowmodal(false)
    }
  }, [deleteTicketSuccess])

  return (
    <div>
      <div className={styles.ticket_filter}>
        <div className={styles.ticks}>
          {" "}
          <h1>Ticket management</h1>
          <div className={styles.active_paused}>
            <div
              className={status === "ACTIVE" ? styles.active : styles.paused}
              onClick={() => {
                setStatus("ACTIVE")
                const data = {
                  status: "ACTIVE",
                }
                fetchTicket(data)
              }}
            >
              <p>Active</p>
            </div>
            <div
              className={status != "ACTIVE" ? styles.active : styles.paused}
              onClick={() => {
                setStatus("INACTIVE")
                const data = {
                  status: "INACTIVE",
                }
                fetchTicket(data)
              }}
            >
              <p>Paused</p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.p_btn}>
            <PrimartButton
              load={null}
              onClick={() => nextPage()}
              text={"New Ticket"}
              active={true}
            />
          </div>
          <div className={styles.filter_div}>
            <div>
              <p>Filter: </p>
              <CustomDropdown
                options={options}
                onSelect={handleSelect}
                placeholder="All"
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className={styles.all_trips}>
        {fetchTickettData?.tickets?.length <= 0 ? (
          <h3>No Tickest Found</h3>
        ) : (
          fetchTickettData?.tickets?.map((item: any, index: number) => (
            <div key={index} className={styles.trips}>
              <div className={styles.trips_div}>
                <h1>{item?.name}</h1>
                <p>{item?.description}</p>
                <h2>
                  {item?.costPerPerson}
                  <span>/Person</span>
                </h2>
                <p>{item?.expiryDays}</p>
              </div>
              <div className={styles.more}>
                <FiMoreVertical onClick={() => handleToggleEdit(index)} />
                {showEdit && selectedItemIndex === index ? (
                  <div className={styles.editDelet}>
                    <p>Edit</p>
                    <h6
                      onClick={() => {
                        setShowmodal(true), setTicketId(item?.ticket_id)
                      }}
                    >
                      Delete
                    </h6>
                  </div>
                ) : null}
              </div>
            </div>
          ))
        )}
        {showModal ? (
          <div className={styles.modalOuter}>
            <div className={styles.modalInner}>
              <h3>Are you sure</h3>
              <div className={styles.conundrum}>
                <PrimartButton
                  active={true}
                  onClick={() => deleteTicket({ ticket_id: ticketId })}
                  load={deleteTicketLoad}
                  text="delete"
                />
                <OutlineButton
                  onClick={() => setShowmodal(false)}
                  text="cancl"
                />
              </div>
            </div>
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  )
}

export default All_tickets
