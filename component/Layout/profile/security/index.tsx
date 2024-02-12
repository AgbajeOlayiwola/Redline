import PrimartButton from "@/component/Buttons/PrimaryButton"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import { useChangeAgentPasswordMutation } from "@/redux/api/mutationApi"
import { Formik } from "formik"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as yup from "yup"
import styles from "./styles.module.css"

const Security = () => {
  const { profile }: any = useSelector((store) => store)
  console.log(profile)
  const initSchema = yup.object().shape({
    oldPassword: yup.string().trim().required("Old Password is required"),
    newPassword: yup.string().required("Please enter new password"),
  })

  const initialValues = {
    oldPassword: "",
    newPassword: "",
  }

  const [
    changeAgentPassword,
    {
      data: changeAgentPasswordData,
      isLoading: changeAgentPasswordLoad,
      isSuccess: changeAgentPasswordSuccess,
      isError: changeAgentPasswordFalse,
      error: changeAgentPasswordErr,
      reset: changeAgentPasswordReset,
    },
  ] = useChangeAgentPasswordMutation()
  const showToastSuccessMessage = () => {
    toast.success("Password changed successfully", {
      position: "top-right",
    })
  }
  const showToastErrorMessage = () => {
    toast.error("Error Changing password try again", {
      position: "top-right",
    })
  }
  useEffect(() => {
    if (changeAgentPasswordErr) {
      showToastErrorMessage()
    }
  }, [changeAgentPasswordErr])

  useEffect(() => {
    if (changeAgentPasswordSuccess) {
      showToastSuccessMessage()
    }
  }, [changeAgentPasswordSuccess])

  return (
    <div>
      <ToastContainer />
      <h1>Security</h1>
      <p>Manage your password</p>

      <Formik
        validationSchema={initSchema}
        initialValues={initialValues}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting }) => {
          const data = {
            oldPassword: values?.oldPassword,
            newPassword: values?.newPassword,
          }
          changeAgentPassword(data)
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
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.name}>
              <div>
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
                {errors ? (
                  <p className={styles.error}>{errors?.oldPassword}</p>
                ) : null}
              </div>
              <div>
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
                {errors ? (
                  <p className={styles.error}>{errors?.newPassword}</p>
                ) : null}
              </div>
            </div>
            <div className={styles.btn}>
              <PrimartButton
                load={changeAgentPasswordLoad}
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
