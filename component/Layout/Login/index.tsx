import PrimartButton from "@/component/Buttons/PrimaryButton"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import { Formik } from "formik"
import * as yup from "yup"
import styles from "./styles.module.css"
const LoginLayout = () => {
  const initSchema = yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    password: yup.string().required("Please enter your password"),
  })

  const initialValues = {
    name: "",
    password: "",
  }

  return (
    <>
      <div className={styles.loginText}>
        <h1>Login</h1>
        <p>Enter your credentials to access the system</p>
      </div>
      <Formik
        validationSchema={initSchema}
        initialValues={initialValues}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
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
            <PrimaryInput
              label="Name"
              type="text"
              name="name"
              onchange={(e: any) => setFieldValue("name", e.target.value)}
              placeholder="Enter Name"
            />
            {errors ? <p className={styles.error}>{errors?.name}</p> : null}
            <PrimaryInput
              label="Password"
              name="password"
              type="text"
              onchange={(e: any) => setFieldValue("password", e.target.value)}
              placeholder="Enter Password"
            />
            {errors ? <p className={styles.error}>{errors?.password}</p> : null}
            <PrimartButton text="Login" active={isValid ? true : false} />
          </form>
        )}
      </Formik>
    </>
  )
}

export default LoginLayout
