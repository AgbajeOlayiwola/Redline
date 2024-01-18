import PrimartButton from "@/component/Buttons/PrimaryButton"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import { Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import * as yup from "yup"
import styles from "./styles.module.css"
const SetPassword = ({ previous }: { previous: any }) => {
  const formRef = useRef()
  const [hasEight, setIseight] = useState(false)
  const [isEight, setIsEight] = useState(false)
  const [hasUppercase, setHasUppercase] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false)
  const [checkPassword, setChaeckPassword] = useState("")

  const initSchema = yup.object().shape({
    Createpassword: yup.string().trim().required("Name is required"),
    Confirmpassword: yup.string().required("Please enter your password"),
  })

  const initialValues = {
    Createpassword: "",
    Confirmpassword: "",
  }
  useEffect(() => {
    const confirmPassword = checkPassword

    // Check if Confirm Password has at least 8 characters
    setIsEight(confirmPassword?.length >= 8)

    // Check if Confirm Password has at least 1 uppercase letter
    setHasUppercase(/[A-Z]/.test(confirmPassword))

    // Check if Confirm Password has at least 1 number
    setHasNumber(/\d/.test(confirmPassword))

    // Check if Confirm Password has at least 1 special character
    setHasSpecialCharacter(/[!@#$%^&*(),.?":{}|<>]/.test(confirmPassword))
  }, [checkPassword])

  return (
    <>
      <div className={styles.loginText}>
        <h1>Setup account</h1>
        <p>Create a password to access your account</p>
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
              label="Create password"
              type="text"
              name="Createpassword"
              value={values?.Createpassword}
              onchange={(e: any) =>
                setFieldValue("Createpassword", e.target.value)
              }
              placeholder="Create Password"
            />
            {errors ? (
              <p className={styles.error}>{errors?.Createpassword}</p>
            ) : null}
            <PrimaryInput
              label="Confirm password"
              name="Confirmpassword"
              type="text"
              value={values?.Confirmpassword}
              onchange={(e: any) => {
                setFieldValue("Confirmpassword", e.target.value),
                  setChaeckPassword(e.target.value)
              }}
              placeholder="Re-type password"
            />
            {errors ? (
              <p className={styles.error}>{errors?.Confirmpassword}</p>
            ) : null}
            <PrimartButton
              load={null}
              text="Login"
              active={isValid ? true : false}
              onClick={() => previous()}
            />
            <br />
            <div className={styles.checks}>
              <div>
                <input type="checkbox" disabled checked={isEight} />
                <label>8 characters minimum</label>
              </div>
              <div>
                <input type="checkbox" disabled checked={hasUppercase} />
                <label>At least 1 uppercase</label>
              </div>
            </div>
            <div className={styles.checks}>
              <div>
                <input type="checkbox" disabled checked={hasNumber} />
                <label>At least 1 number</label>
              </div>
              <div>
                <input type="checkbox" disabled checked={hasSpecialCharacter} />
                <label>At least 1 special character</label>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}

export default SetPassword
