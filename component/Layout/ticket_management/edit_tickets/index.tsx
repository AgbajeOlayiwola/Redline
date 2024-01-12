import PrimartButton from "@/component/Buttons/PrimaryButton"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import Back_svg from "@/component/SVGs/back_svg"
import styles from "./styles.module.css"
const Edit_tickets = ({ previous }: { previous: any }) => {
  return (
    <>
      {" "}
      <div className={styles.back_save}>
        <Back_svg onClick={() => previous()} />
      </div>
      <br />
      <br />
      <div className={styles.edit_ticket}>
        <div className={styles.ticket_top}>
          <h1>New ticket</h1>
          <p>Set up a new ticket for commuters</p>
        </div>
        <div>
          {" "}
          <div className={styles.p_input}>
            <PrimaryInput
              label="Ticket name"
              type="text"
              name="STring"
              onchange={(e: any) => e.target.value}
              placeholder="e.g Presidential bonus"
            />
            <PrimaryInput
              label="Ticket description"
              type="text"
              name="STring"
              onchange={(e: any) => e.target.value}
              placeholder="e.g 50% discount on all trips for the year"
            />
            <PrimaryInput
              label="Expiry"
              type="text"
              name="STring"
              onchange={(e: any) => e.target.value}
              placeholder="How many days after purchase"
            />
            <PrimaryInput
              label="Cost per person"
              type="text"
              name="STring"
              onchange={(e: any) => e.target.value}
              placeholder="N 2,000"
            />
          </div>
          <br />
          <br />
          <br />
          <div className={styles.pr_btn}>
            <PrimartButton
              text="Create ticket"
              active={true}
              onClick={() => null}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit_tickets
