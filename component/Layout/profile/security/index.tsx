import PrimartButton from "@/component/Buttons/PrimaryButton"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import { Formik } from "formik"
import { useSelector } from "react-redux"
import * as yup from "yup"
import styles from "./styles.module.css"
const Security = () => {
  const { profile }: any = useSelector((store) => store)
  console.log(profile)
  const initSchema = yup.object().shape({
    oldPassword: yup.string().trim().required("First name is required"),
    newPassword: yup.string().required("Please enter last name date"),
    // status: yup.string().required("Please select status"),
  })

  const initialValues = {
    oldPassword: profile?.user?.fullName.split(" ")[0]
      ? profile?.user?.fullName.split(" ")[0]
      : "",
    newPassword: profile?.user?.fullName.split(" ")[1]
      ? profile?.user?.fullName.split(" ")[1]
      : "",
  }

  return (
    <div>
      <h1>Security</h1>
      <p>Manage your password</p>

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
                label="Old password"
                type="password"
                name="String"
                value={values?.oldPassword}
                onchange={(e: any) =>
                  setFieldValue("oldPassword", e.target.value)
                }
                placeholder="******"
              />
              <PrimaryInput
                label="New password"
                type="password"
                name="String"
                value={values?.newPassword}
                onchange={(e: any) =>
                  setFieldValue("newPassword", e.target.value)
                }
                placeholder="****"
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

export default Security
