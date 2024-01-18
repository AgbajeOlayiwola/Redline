import PrimartButton from "@/component/Buttons/PrimaryButton"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import Back_svg from "@/component/SVGs/back_svg"
import { useCreateTicketMutation } from "@/redux/api/mutationApi"
import { Formik } from "formik"
import { useEffect } from "react"
import * as yup from "yup"
import PrimarySelect from "../../primary_select"
import styles from "./styles.module.css"
const Edit_tickets = ({ previous }: { previous: any }) => {
  const initSchema = yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    expiry: yup.string().required("Please enter expiry date"),
    description: yup.string().required("Please enter description"),
    cost: yup.string().required("Please enter cost"),
    // status: yup.string().required("Please select status"),
  })

  const initialValues = {
    name: "",
    description: "",
    cost: "",
    expiry: "",
    status: "",
  }

  const [
    createTicket,
    {
      data: createTicketData,
      isLoading: createTicketLoad,
      isSuccess: createTicketSuccess,
      isError: createTicketFalse,
      error: createTicketErr,
      reset: createTicketReset,
    },
  ] = useCreateTicketMutation()
  useEffect(() => {
    if (createTicketSuccess) {
      previous()
    }
  }, [createTicketSuccess])

  const data = ["ACTIVE", "INACTIVE"]
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
        <Formik
          validationSchema={initSchema}
          initialValues={initialValues}
          validateOnChange={true}
          onSubmit={(values, { setSubmitting }) => {
            const data = {
              tickets: [
                {
                  name: values?.name,
                  description: values?.description,
                  expiryDays: values?.expiry,
                  costPerPerson: values?.cost,
                  status: values?.status,
                  otherCharges: "500",
                  tax: "500",
                },
              ],
            }
            createTicket(data)
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            setFieldValue,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                {" "}
                <div className={styles.p_input}>
                  <PrimaryInput
                    label="Ticket name"
                    type="text"
                    name="name"
                    onchange={(e: any) => setFieldValue("name", e.target.value)}
                    placeholder="e.g Presidential bonus"
                  />
                  <PrimaryInput
                    label="Ticket description"
                    type="text"
                    name="description"
                    onchange={(e: any) =>
                      setFieldValue("description", e.target.value)
                    }
                    placeholder="e.g 50% discount on all trips for the year"
                  />
                  <PrimaryInput
                    label="Expiry"
                    type="date"
                    name="expiry"
                    onchange={(e: any) =>
                      setFieldValue("expiry", e.target.value)
                    }
                    placeholder="How many days after purchase"
                  />
                  <PrimaryInput
                    label="Cost per person"
                    type="text"
                    name="STring"
                    onchange={(e: any) => setFieldValue("cost", e.target.value)}
                    placeholder="N 2,000"
                  />
                  <PrimarySelect
                    options={data}
                    label="Select Train Status"
                    onchange={(e: any) =>
                      setFieldValue("status", e.target.value)
                    }
                  />
                </div>
                <br />
                <br />
                <br />
                <div className={styles.pr_btn}>
                  <PrimartButton
                    load={createTicketLoad}
                    text="Create ticket"
                    active={true}
                    onClick={() => null}
                  />
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Edit_tickets
