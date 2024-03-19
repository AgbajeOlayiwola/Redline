import PrimartButton from "@/component/Buttons/PrimaryButton"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import Back_svg from "@/component/SVGs/back_svg"
import {
  useCreateTrainMutation,
  useDeleteTrainMutation,
  useEditTrainMutation,
} from "@/redux/api/mutationApi"

import OutlineButton from "@/component/Buttons/outline_button"
import { clearSingleTrain } from "@/redux/slices/singleTrainSlice"
import { FieldArray, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as yup from "yup"
import Modal from "../../modal"
import PrimarySelect from "../../primary_select"
import styles from "./styles.module.css"
const EditSchedule = ({ previous }: { previous: any }) => {
  const [routeIndex, setRouteIndex] = useState(1)
  const { singleTrain }: any = useSelector((store) => store)
  const [singleTrainState, setSingleTrainState] = useState(singleTrain)
  const [deleteModal, setDeleteModal] = useState(false)
  // const formRef = useRef()
  const dispatch = useDispatch()
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
  const [
    deleteTrain,
    {
      data: deleteTrainData,
      isLoading: deleteTrainLoad,
      isSuccess: deleteTrainSuccess,
      isError: deleteTrainFalse,
      error: deleteTrainErr,
    },
  ] = useDeleteTrainMutation()
  const [
    createTrain,
    {
      data: createTrainData,
      isLoading: createTrainLoad,
      isSuccess: createTrainSuccess,
      isError: createTrainFalse,
      error: createTrainErr,
      reset: createTrainReset,
    },
  ] = useCreateTrainMutation()

  const initSchema = yup.object().shape({
    Route_1: yup.string().required("Please enter your first route"),
    Time_1: yup.string().required("Please enter your first route"),
  })

  const initialValues = {
    trains: [
      {
        name: "",
        status: "ACTIVE",
        station: "",
        departureTimes: ["", "", "", ""],
        arrivalTimes: ["", "", "", ""],
      },
    ],
  }

  const editinitialValues = {
    trains: [
      {
        name: singleTrain.name,
        status: singleTrain.status,
        station: "", // Initialize as empty since station-specific values are not provided
        departureTimes: ["", "", "", ""], // Initialize as empty since station-specific values are not provided
        arrivalTimes: ["", "", "", ""], // Initialize as empty since station-specific values are not provided
      },
    ],
  }

  // Fill the stations, departure times, and arrival times
  editinitialValues.trains[0].station = singleTrain?.route?.map(
    (route: any) => route.station
  )
  editinitialValues.trains[0].departureTimes = singleTrain?.route?.map(
    (route: any) => route?.departureTime
  )
  editinitialValues.trains[0].arrivalTimes = singleTrain?.route?.map(
    (route: any) => route?.arrivalTime
  )
  const [routes, setRoutes] = useState(singleTrain?.route || [])
  const saveChanges = () => {
    editTrain(singleTrainState)
  }

  useEffect(() => {
    if (editTrainSuccess) {
      previous()
    }
  }, [editTrainSuccess])
  useEffect(() => {
    if (createTrainSuccess) {
      previous()
    }
  }, [createTrainSuccess])
  const data = ["ACTIVE", "INACTIVE"]
  const [numFields, setNumFields] = useState(1) // State to keep track of the number of fields

  const handleAddField = () => {
    setNumFields(numFields + 1) // Increment the number of fields
  }
  const deleteTrainFunc = () => {
    const data = { train_id: singleTrain?.train_id }
    deleteTrain(data)
  }
  const showToastDeletTrainErrorMessage = () => {
    toast.error("Unabl to delete train try again", {
      position: "top-right",
    })
  }
  const showToastDeletTrainSuccesMessage = () => {
    toast.success("Unabl to delete train try again", {
      position: "top-right",
    })
  }
  useEffect(() => {
    if (deleteTrainSuccess) {
      showToastDeletTrainSuccesMessage()
      setDeleteModal(false)
      const data = {
        status: "",
      }
      dispatch(clearSingleTrain())
      previous()
    }
  }, [deleteTrainSuccess])
  console.log(singleTrain)
  // Function to format the time string
  const formatTime = (timeString: any) => {
    if (/^\d{2}:\d{2}(:\d{2}(\.\d{3})?)?$/.test(timeString)) {
      return timeString
    }

    const [time, meridiem] = timeString.split(/(?=[AP]M)/)
    const [hours, minutes] = time.split(":")
    let formattedHours = parseInt(hours, 10)

    // Adjust hours if it's PM and not 12 PM
    if (meridiem === "PM" && formattedHours < 12) {
      formattedHours = (formattedHours + 12) % 24 // Ensure it's within the 24-hour format
    } else if (meridiem === "AM" && formattedHours === 12) {
      formattedHours = 0 // 12 AM should be represented as 0 in 24-hour format
    }

    // Add leading zeros if needed
    const formattedTime = `${String(formattedHours).padStart(
      2,
      "0"
    )}:${minutes}`

    return formattedTime
  }
  return (
    <div>
      <ToastContainer />
      <div className={styles.back_save}>
        <Back_svg
          onClick={() => {
            previous(), dispatch(clearSingleTrain())
          }}
        />
        {singleTrain?.train_id ? (
          <button className={styles.del} onClick={() => setDeleteModal(true)}>
            Delete
          </button>
        ) : null}
      </div>
      <div className={styles.stationDetails}>
        <div>
          {/* <h1>{singleTrainState?.name} schedule</h1> */}
          {/* <p>Edit {singleTrainState?.name}</p> */}
        </div>
        {!singleTrain?.train_id ? (
          <div className={styles.local_flex}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                const formattedTrains = values.trains.map((train) => ({
                  name: train.name,
                  route: train.routes.map((route: any) => ({
                    station: route.station,
                    departureTime: route.departureTimes,
                    arrivalTime: route.arrivalTimes,
                  })),
                  status: train.status,
                }))

                // Formatted object with 'trains' array in the desired structure
                const formattedValues = { trains: formattedTrains }

                createTrain(formattedValues)
                setSubmitting(false)
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
                <Form className={styles.editForm}>
                  {singleTrain?.train_id ? (
                    <h1>Edit train</h1>
                  ) : (
                    <h1>Add Train</h1>
                  )}
                  <FieldArray name="trains">
                    {({ push, remove }) => (
                      <div>
                        {values.trains.map((train, trainIndex) => (
                          <div key={trainIndex}>
                            <PrimaryInput
                              name="name"
                              type="text"
                              placeholder="Train Name"
                              value={values.trains[trainIndex].name}
                              onchange={(e: any) =>
                                setFieldValue(
                                  `trains.${trainIndex}.name`,
                                  e.target.value
                                )
                              }
                            />
                            <br />
                            <br />
                            {/* {errors.name && touched.name && (
                              <div className="error">{errors.name}</div>
                            )} */}

                            <PrimarySelect
                              options={data}
                              label={null}
                              onchange={(e: any) =>
                                setFieldValue(
                                  `trains.${trainIndex}.status`,
                                  e.target.value
                                )
                              }
                            />

                            <br />
                            <br />
                            {/* {errors.status && touched.status && (
                              <div className="error">{errors.status}</div>
                            )} */}
                            {[...Array(routeIndex)].map((_, routeIndex) => (
                              <div key={routeIndex}>
                                <PrimaryInput
                                  name={`trains.${trainIndex}.routes.${routeIndex}.station`}
                                  type="text"
                                  placeholder={`Station ${routeIndex + 1}`}
                                  onchange={(e: any) =>
                                    setFieldValue(
                                      `trains.${trainIndex}.routes.${routeIndex}.station`,
                                      e.target.value
                                    )
                                  }
                                />

                                <div className={styles.editTrainRoute}>
                                  <div className={styles.time}>
                                    <h5>Departure Time</h5>
                                    {[...Array(4)].map((_, timeIndex) => (
                                      <PrimaryInput
                                        key={timeIndex}
                                        name={`trains.${trainIndex}.routes.${routeIndex}.departureTimes.${timeIndex}`}
                                        type="time"
                                        placeholder={`Departure Time ${
                                          timeIndex + 1
                                        }`}
                                        onchange={(e: any) =>
                                          setFieldValue(
                                            `trains.${trainIndex}.routes.${routeIndex}.departureTimes.${timeIndex}`,
                                            e.target.value
                                          )
                                        }
                                      />
                                    ))}
                                  </div>
                                  <div className={styles.time}>
                                    <h5>Arrival Time</h5>
                                    {[...Array(4)].map((_, timeIndex) => (
                                      <PrimaryInput
                                        key={timeIndex}
                                        name={`trains.${trainIndex}.routes.${routeIndex}.arrivalTimes.${timeIndex}`}
                                        type="time"
                                        placeholder={`Arrival Time ${
                                          timeIndex + 1
                                        }`}
                                        onchange={(e: any) =>
                                          setFieldValue(
                                            `trains.${trainIndex}.routes.${routeIndex}.arrivalTimes.${timeIndex}`,
                                            e.target.value
                                          )
                                        }
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className={styles.editTrainRoute}>
                              <button
                                className={styles.save_btn}
                                type="button"
                                onClick={() => setRouteIndex(routeIndex + 1)}
                              >
                                Add Route
                              </button>
                              {routeIndex > 1 && ( // Make sure you don't allow to remove routes if there's only one route
                                <button
                                  className={styles.save_btn}
                                  type="button"
                                  onClick={() => setRouteIndex(routeIndex - 1)}
                                >
                                  Remove Route
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        <br />
                        <br />
                        <div className={styles.editTrainRoute}>
                          <button
                            className={styles.save_btn}
                            type="button"
                            onClick={() =>
                              push({
                                name: "",
                                status: "",
                                station: "",
                                departureTimes: ["", "", "", ""],
                                arrivalTimes: ["", "", "", ""],
                              })
                            }
                          >
                            Add Train
                          </button>
                          <button
                            className={styles.save_btn}
                            type="button"
                            onClick={() => remove(index)}
                          >
                            Remove Train
                          </button>
                        </div>
                      </div>
                    )}
                  </FieldArray>

                  <PrimartButton
                    text="Submit"
                    active={true}
                    onClick={null}
                    load={createTrainLoad}
                  />
                </Form>
              )}
            </Formik>
            {/* ) : null} */}
          </div>
        ) : (
          <div className={styles.local_flex}>
            <Formik
              initialValues={editinitialValues}
              onSubmit={(values, { setSubmitting }) => {
                const formattedTrains = values.trains.map((train) => ({
                  name: train.name,
                  route: train.routes.map((route) => ({
                    station: route.station,
                    departureTime: route.departureTimes,
                    arrivalTime: route.arrivalTimes,
                  })),
                  status: train.status,
                }))

                // Formatted object with 'trains' array in the desired structure
                const formattedValues = { trains: formattedTrains }

                createTrain(formattedValues)
                setSubmitting(false)
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
                <Form className={styles.editForm}>
                  {singleTrain?.train_id ? (
                    <h1>Edit train</h1>
                  ) : (
                    <h1>Add Train</h1>
                  )}
                  <FieldArray name="trains">
                    {({ push, remove }) => (
                      <div>
                        {values.trains.map((train, trainIndex) => (
                          <div key={trainIndex}>
                            <PrimaryInput
                              name={`trains.${trainIndex}.name`}
                              value={`${values.trains[trainIndex].name}`}
                              type="text"
                              placeholder="Train Name"
                              onchange={(e: any) =>
                                setFieldValue(
                                  `trains.${trainIndex}.name`,
                                  e.target.value
                                )
                              }
                            />
                            <br />
                            <br />
                            {/* {errors.name && touched.name && (
                              <div className="error">{errors.name}</div>
                            )} */}

                            <PrimarySelect
                              options={data}
                              label={null}
                              // value={values.trains[trainIndex].status}
                              onchange={(e: any) =>
                                setFieldValue(
                                  `trains.${trainIndex}.status`,
                                  e.target.value
                                )
                              }
                            />

                            <br />
                            <br />
                            {/* {errors?.status && touched?.status && (
                              <div className="error">{errors?.status}</div>
                            )} */}

                            {singleTrain.route.map(
                              (route: any, routeIndex: number) => (
                                <div key={routeIndex}>
                                  <PrimaryInput
                                    name={`trains.${trainIndex}.routes.${routeIndex}.station`}
                                    type="text"
                                    value={route?.station}
                                    placeholder={`Station ${routeIndex + 1}`}
                                    onchange={(e: any) =>
                                      setFieldValue(
                                        `trains.${trainIndex}.routes.${routeIndex}.station`,
                                        e.target.value
                                      )
                                    }
                                  />

                                  <div className={styles.editTrainRoute}>
                                    <div className={styles.time}>
                                      <h5>Departure Time</h5>
                                      {route.departureTime.map(
                                        (
                                          departureTime: any,
                                          timeIndex: number
                                        ) => (
                                          <PrimaryInput
                                            key={timeIndex}
                                            name={`trains.${trainIndex}.routes.${routeIndex}.departureTimes.${timeIndex}`}
                                            type="time"
                                            placeholder={`Departure Time ${
                                              timeIndex + 1
                                            }`}
                                            value={formatTime(
                                              departureTime || ""
                                            )} // Make sure to provide the value if it exists
                                            onchange={(e: any) =>
                                              setFieldValue(
                                                `trains.${trainIndex}.routes.${routeIndex}.departureTimes.${timeIndex}`,
                                                e.target.value
                                              )
                                            }
                                          />
                                        )
                                      )}
                                    </div>
                                    <div className={styles.time}>
                                      <h5>Arrival Time</h5>
                                      {route.arrivalTime.map(
                                        (
                                          arrivalTime: any,
                                          timeIndex: number
                                        ) => {
                                          return (
                                            <PrimaryInput
                                              key={timeIndex}
                                              name={`trains.${trainIndex}.routes.${routeIndex}.arrivalTimes.${timeIndex}`}
                                              type="time"
                                              placeholder={`Arrival Time ${
                                                timeIndex + 1
                                              }`}
                                              value={formatTime(
                                                arrivalTime || ""
                                              )} // Make sure to provide the value if it exists
                                              onchange={(e: any) =>
                                                setFieldValue(
                                                  `trains.${trainIndex}.routes.${routeIndex}.arrivalTimes.${timeIndex}`,
                                                  e.target.value
                                                )
                                              }
                                            />
                                          )
                                        }
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                            <div className={styles.editTrainRoute}>
                              <button
                                className={styles.save_btn}
                                type="button"
                                onClick={() =>
                                  push({
                                    station: "",
                                    departureTimes: ["", "", "", ""],
                                    arrivalTimes: ["", "", "", ""],
                                  })
                                }
                              >
                                Add Route
                              </button>
                              {/* {train.routes.length > 1 && ( // Make sure you don't allow to remove routes if there's only one route
                                <button
                                  className={styles.save_btn}
                                  type="button"
                                  onClick={() => remove(trainIndex)}
                                >
                                  Remove Route
                                </button>
                              )} */}
                            </div>
                          </div>
                        ))}
                        <br />
                        <br />
                        <div className={styles.editTrainRoute}>
                          <button
                            className={styles.save_btn}
                            type="button"
                            onClick={() =>
                              push({
                                name: "",
                                status: "",
                                routes: [
                                  {
                                    station: "",
                                    departureTimes: ["", "", "", ""],
                                    arrivalTimes: ["", "", "", ""],
                                  },
                                ],
                              })
                            }
                          >
                            Add Train
                          </button>
                        </div>
                      </div>
                    )}
                  </FieldArray>

                  <PrimartButton
                    text="Submit"
                    active={true}
                    onClick={null}
                    load={createTrainLoad}
                  />
                </Form>
              )}
            </Formik>
            {/* ) : null} */}
          </div>
        )}
      </div>
      {deleteModal ? (
        <Modal close={() => setDeleteModal(false)}>
          <div className={styles.popup}>
            <h5>Are you sure you want to delete this train</h5>
            <div className={styles.flexButtons}>
              <OutlineButton
                text="Cancel"
                onClick={() => setDeleteModal(false)}
              />
              <button className={styles.del} onClick={deleteTrainFunc}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default EditSchedule
