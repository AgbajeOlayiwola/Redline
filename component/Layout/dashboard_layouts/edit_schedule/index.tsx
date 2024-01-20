import PrimartButton from "@/component/Buttons/PrimaryButton"
import OutlineButton from "@/component/Buttons/outline_button"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import Back_svg from "@/component/SVGs/back_svg"
import Blue_location_svg from "@/component/SVGs/blue_location_svg"
import LoadingAnimation from "@/component/animations/loadingAnimation"
import { useEditTrainMutation } from "@/redux/api/mutationApi"
import { Formik } from "formik"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import * as yup from "yup"
import PrimarySelect from "../../primary_select"
import styles from "./styles.module.css"
const EditSchedule = ({ previous }: { previous: any }) => {
  const [editForm, setEditForm] = useState(false)

  const { singleTrain }: any = useSelector((store) => store)
  const [singleTrainState, setSingleTrainState] = useState(singleTrain)
  const formRef = useRef()
  const [
    editTrain,
    {
      data: editTrainData,
      isLoading: editTrainLoad,
      isSuccess: editTrainSuccess,
      isError: editTrainFalse,
      error: editTrainErr,
      reset: editTrainReset,
    },
  ] = useEditTrainMutation()
  console.log(singleTrain)
  const initSchema = yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    Route_1: yup.string().required("Please enter your first route"),
    Time_1: yup.string().required("Please enter your first route"),
  })

  const initialValues = {
    name: "",
    Route_1: "",
    Time_1: "",
    status: "",
  }

  const [routes, setRoutes] = useState(singleTrain?.route || [])
  const saveChanges = () => {
    editTrain(singleTrainState)
  }
  const removeRoute = (index: number) => {
    // Remove the route from the routes state
    setRoutes((prevRoutes: any) =>
      prevRoutes.filter((_: any, i: number) => i !== index)
    )

    // Update the singleTrainState with the new routes
    const updatedSingleTrain = {
      ...singleTrainState,
      route: routes.filter((_: any, i: number) => i !== index),
    }
    setSingleTrainState(updatedSingleTrain)
  }

  useEffect(() => {
    if (editTrainSuccess) {
      previous()
    }
  }, [editTrainSuccess])
  const data = ["ACTIVE", "INACTIVE"]
  // useEffect(() => {
  //   const data = {
  //     train_id: singleTrainState?.train_id,
  //     name: formRef?.current?.values?.name
  //       ? formRef?.current?.values?.name
  //       : singleTrainState?.name,
  //     status: formRef?.current?.values?.status
  //       ? formRef?.current?.values?.status
  //       : singleTrainState?.status,
  //     route: routes,
  //   }
  //   setSingleTrainState(data)
  // }, [])
  return (
    <div>
      <div className={styles.back_save}>
        <Back_svg onClick={() => previous()} />
        <button className={styles.save_btn} onClick={saveChanges}>
          {editTrainLoad ? <LoadingAnimation /> : <p> Save Changes</p>}
        </button>
      </div>
      <div className={styles.stationDetails}>
        <div>
          <h1>{singleTrainState?.name} schedule</h1>
          <p>Edit {singleTrainState?.name}</p>
        </div>
        <div className={styles.local_flex}>
          {singleTrainState?.route.map((item: any, index: number) => {
            return (
              <div className={styles.train_route} key={index}>
                <div className={styles.local}>
                  <Blue_location_svg />
                  <p>{item?.station}</p>
                </div>
                <hr className={styles.hr} />
                <div className={styles.time}>
                  <p>{item?.time}</p>
                  <OutlineButton
                    onClick={() => removeRoute(index)}
                    text="Delete"
                  />
                </div>
              </div>
            )
          })}
          <div className={styles.add_stop}>
            <OutlineButton
              onClick={() => setEditForm((prev) => !prev)}
              text="Add Stop"
            />
          </div>
          {editForm ? (
            <Formik
              validationSchema={initSchema}
              initialValues={initialValues}
              validateOnChange={true}
              onSubmit={(values, { setSubmitting }) => {
                // Add a new route to the routes state
                setRoutes((prevRoutes: any) => [
                  ...prevRoutes,
                  {
                    station: values?.Route_1, // You might want to set default values or leave it empty initially
                    time: values?.Time_1,
                  },
                ])

                // Update the singleTrainState with the new routes
                setSingleTrainState((prevSingleTrainState: any) => {
                  const updatedSingleTrain = {
                    ...prevSingleTrainState,
                    route: [
                      ...prevSingleTrainState.route,
                      {
                        station: values?.Route_1,
                        time: values?.Time_1,
                      },
                    ],
                  }
                  return updatedSingleTrain
                })

                // Rest of your form submission logic
                // ...

                setSubmitting(false) // Make sure to setSubmitting(false) when done
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
                <form onSubmit={handleSubmit} className={styles.editForm}>
                  <PrimaryInput
                    label="Train Name"
                    type="text"
                    name="name"
                    value={values?.name}
                    onchange={(e: any) => setFieldValue("name", e.target.value)}
                    placeholder="Enter Train Name"
                  />
                  {errors ? (
                    <p className={styles.error}>{errors?.name}</p>
                  ) : null}
                  <PrimarySelect
                    options={data}
                    label="Select Train Status"
                    onchange={(e: any) =>
                      setFieldValue("status", e.target.value)
                    }
                  />
                  <div className={styles.editTrainRoute}>
                    <PrimaryInput
                      label="Route 1"
                      name="Route_1"
                      type="text"
                      value={values?.Route_1}
                      onchange={(e: any) =>
                        setFieldValue("Route_1", e.target.value)
                      }
                      placeholder="Enter First Route"
                    />
                    <PrimaryInput
                      label="Time 1"
                      name="Time_1"
                      type="time"
                      value={values?.Time_1}
                      onchange={(e: any) =>
                        setFieldValue("Time_1", e.target.value)
                      }
                      placeholder="Enter First Time"
                    />
                  </div>
                  {errors ? (
                    <p className={styles.error}>{errors?.Time_1}</p>
                  ) : null}
                  {errors ? (
                    <p className={styles.error}>{errors?.Route_1}</p>
                  ) : null}

                  <PrimartButton
                    load={false}
                    text="Add Route"
                    active={isValid ? true : false}
                    onClick={() => null}
                  />
                </form>
              )}
            </Formik>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default EditSchedule
