import PrimartButton from "@/component/Buttons/PrimaryButton"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import { Formik } from "formik"
import { useSelector } from "react-redux"
import * as yup from "yup"
import styles from "./styles.module.css"
const Genaral = () => {
  const { profile }: any = useSelector((store) => store)
  console.log(profile)
  const initSchema = yup.object().shape({
    firstname: yup.string().trim().required("First name is required"),
    lastname: yup.string().required("Please enter last name date"),
    // status: yup.string().required("Please select status"),
  })

  const initialValues = {
    firstname: profile?.user?.fullName.split(" ")[0]
      ? profile?.user?.fullName.split(" ")[0]
      : "",
    lastname: profile?.user?.fullName.split(" ")[1]
      ? profile?.user?.fullName.split(" ")[1]
      : "",
  }

  return (
    <div>
      <h1>General</h1>
      <p>Manage your account</p>

      <Formik
        validationSchema={initSchema}
        initialValues={initialValues}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting }) => {}}
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
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.name}>
              <PrimaryInput
                label="First Name"
                type="text"
                name="String"
                value={values?.firstname}
                onchange={(e: any) =>
                  setFieldValue("firstname", e.target.value)
                }
                placeholder="N 2,000"
              />
              <PrimaryInput
                label="Last Name"
                type="text"
                name="String"
                value={values?.lastname}
                onchange={(e: any) => setFieldValue("lastname", e.target.value)}
                placeholder="N 2,000"
              />
            </div>
            <div className={styles.btn}>
              <PrimartButton
                load={null}
                text={"Save Changes"}
                active={true}
                onClick={() => null}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Genaral
