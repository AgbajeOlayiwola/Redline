"use client"
import PrimartButton from "@/component/Buttons/PrimaryButton"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import { useUserLoginMutation } from "@/redux/api/mutationApi"
import { setCookie } from "@/redux/slices/cookieSlice"
import { setProfile } from "@/redux/slices/profileSlice"
import { Formik } from "formik"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import * as yup from "yup"
import styles from "./styles.module.css"
const LoginLayout = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const initSchema = yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    password: yup.string().required("Please enter your password"),
  })

  const initialValues = {
    name: "",
    password: "",
  }
  const [
    userLogin,
    {
      data: userLoginData,
      isLoading: userLoginLoad,
      isSuccess: userLoginSuccess,
      isError: userLoginFalse,
      error: userLoginErr,
      reset: userLoginReset,
    },
  ] = useUserLoginMutation()
  useEffect(() => {
    if (userLoginSuccess) {
      dispatch(setProfile(userLoginData?.data))
      dispatch(setCookie(userLoginData?.data?.token))
      router.push("/admin/dashboard")
    }
  }, [userLoginSuccess])

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
          const data = {
            emailAddress: values?.name,
            password: values?.password,
          }
          userLogin(data)
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
            <PrimartButton
              load={userLoginLoad}
              text="Login"
              active={isValid ? true : false}
              onClick={() => null}
            />
          </form>
        )}
      </Formik>
    </>
  )
}

export default LoginLayout
