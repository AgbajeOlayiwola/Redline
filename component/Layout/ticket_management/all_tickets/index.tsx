import PrimartButton from "@/component/Buttons/PrimaryButton"
import CustomDropdown from "@/component/reusable_compoenent/custome_dropdown"
import { FiMoreVertical } from "react-icons/fi"
import styles from "./styles.module.css"
const All_tickets = ({ nextPage }: { nextPage: any }) => {
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ]
  const handleSelect = (selectedOption: any) => {
    console.log("Selected Option:", selectedOption)
  }
  const ticket_data = [
    {
      label: "Single trip",
      price: "3500",
      time: "Expires in 1week",
      duration: "Covers the whole redline",
    },
    {
      label: "Single trip",
      price: "3500",
      time: "Expires in 1week",
      duration: "Covers the whole redline",
    },
    {
      label: "Single trip",
      price: "3500",
      time: "Expires in 1week",
      duration: "Covers the whole redline",
    },
    {
      label: "Round trip",
      price: "3500",
      time: "Expires in 1week",
      duration: "Covers the whole redline",
    },
    {
      label: "Single trip",
      price: "3500",
      time: "Expires in 1week",
      duration: "Covers the whole redline",
    },
    {
      label: "Round trip",
      price: "3500",
      time: "Expires in 1week",
      duration: "Covers the whole redline",
    },
    {
      label: "Round trip",
      price: "3500",
      time: "Expires in 1week",
      duration: "Covers the whole redline",
    },
  ]
  return (
    <div>
      <div className={styles.ticket_filter}>
        <div className={styles.ticks}>
          {" "}
          <h1>Ticket management</h1>
          <div className={styles.active_paused}>
            <div className={styles.active}>
              <p>Active</p>
            </div>
            <div className={styles.paused}>
              <p>Paused</p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.p_btn}>
            <PrimartButton
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
        {ticket_data.map((item, index) => {
          return (
            <div key={index} className={styles.trips}>
              <div className={styles.trips_div}>
                <h1>{item?.label}</h1>
                <p>{item?.duration}</p>
                <h2>
                  {item?.price}
                  <span>/Person</span>
                </h2>
                <p>{item?.time}</p>
              </div>
              <FiMoreVertical />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default All_tickets
