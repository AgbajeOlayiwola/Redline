"use client"
import PrimartButton from "@/component/Buttons/PrimaryButton"
import OutlineButton from "@/component/Buttons/outline_button"
import PrimaryInput from "@/component/Inputs/PrimmaryInput"
import Locationsvggreen from "@/component/SVGs/locationsvggreen"
import Trans_train from "@/component/SVGs/trans_train"
import LoadingAnimation from "@/component/animations/loadingAnimation"
import { VerticalBarChart } from "@/component/vertical_bar_chart"
import {
  useAddNotificationsMutation,
  useDeleteTrainMutation,
  useFetchTrainMutation,
} from "@/redux/api/mutationApi"
import { setAllTrain } from "@/redux/slices/allTrainSlice"
import { setSingleTrain } from "@/redux/slices/singleTrainSlice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Modal from "../../modal"
import PrimarySelect from "../../primary_select"
import styles from "./styles.module.css"

import { useTrainTrafficQuery } from "@/redux/api/queryApi"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const MainDash = ({ nextPage }: { nextPage: any }) => {
  const [selectedTrain, setSelectedTrain] = useState(null)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const { profile }: any = useSelector((store) => store)
  const [title, setTitle] = useState("")
  const [descriptions, setDescription] = useState("")
  console.log(profile)
  const dispatch = useDispatch()
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const handleWindowResize = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    handleWindowResize()
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [width])
  const handleTrainSelect = (trainId: any) => {
    setSelectedTrain(trainId)
  }
  const chartData = [
    {
      companyName: "Oyingbo",
      progressPaymentPrice: 10,
    },
    {
      companyName: "Yaba",
      progressPaymentPrice: 120,
    },
    {
      companyName: "Mushin",
      progressPaymentPrice: 105,
    },
    {
      companyName: "Oshodi",
      progressPaymentPrice: 80,
    },
    {
      companyName: "Ikeja",
      progressPaymentPrice: 150,
    },
    {
      companyName: "Agege",
      progressPaymentPrice: 30,
    },
    {
      companyName: "Iju",
      progressPaymentPrice: 40,
    },
    {
      companyName: "Agbado",
      progressPaymentPrice: 15,
    },
  ]

  const [
    fetchTrain,
    {
      data: fetchTrainData,
      isLoading: fetchTrainLoad,
      isSuccess: fetchTrainSuccess,
      isError: fetchTrainFalse,
      error: fetchTrainErr,
      reset: fetchTrainReset,
    },
  ] = useFetchTrainMutation()
  const {
    data: trainTrafficData,
    isLoading: trainTrafficLoad,
    isSuccess: trainTrafficSuccess,
    isError: trainTrafficFalse,
    error: trainTrafficErr,
    refetch: trainTrafficReset,
  } = useTrainTrafficQuery(null)
  const [
    addNotifications,
    {
      data: addNotificationsData,
      isLoading: addNotificationsLoad,
      isSuccess: addNotificationsSuccess,
      isError: addNotificationsFalse,
      error: addNotificationsErr,
    },
  ]: any = useAddNotificationsMutation()
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

  const notifications = () => {
    const data = {
      notifications: [
        {
          title: title,
          description: descriptions,
          type: "ALERTS",
          userID: profile?.user?.user_id,
        },
      ],
    }
    setModal(addNotifications(data))
  }

  useEffect(() => {
    const data = {
      status: "",
    }
    fetchTrain(data)
  }, [])
  useEffect(() => {
    dispatch(setAllTrain(fetchTrainData?.trains))
    if (fetchTrainData?.trains.length > 0) {
      setSelectedTrain(fetchTrainData.trains[0].train_id)
    }
  }, [fetchTrainSuccess])
  const handleEdit = () => {
    const found = fetchTrainData?.trains?.find(
      (train: any) => train?.train_id === selectedTrain
    )
    console.log(found)
    dispatch(setSingleTrain(found))
    nextPage()
  }
  const deleteTrainFunc = () => {
    const found = fetchTrainData?.trains?.find(
      (train: any) => train?.train_id === selectedTrain
    )
    console.log(found)
    const data = { train_id: found?.train_id }
    deleteTrain(data)
  }
  const handleAdd = () => {
    nextPage()
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
      fetchTrain(data)
    }
  }, [deleteTrainSuccess])
  useEffect(() => {
    if (deleteTrainErr) {
      showToastDeletTrainErrorMessage()
    }
  }, [deleteTrainErr])

  const showToastErrorMessage = () => {
    toast.error("Notification Failed ", {
      position: "top-right",
    })
  }
  useEffect(() => {
    if (addNotificationsErr) {
      showToastErrorMessage()
    }
  }, [addNotificationsErr])

  const showToastSuccessMessage = () => {
    toast.error("Notification Sent Successfullt ", {
      position: "top-right",
    })
  }
  useEffect(() => {
    if (addNotificationsSuccess) {
      showToastSuccessMessage()
      setModal(false)
    }
  }, [addNotificationsSuccess])
  const data = ["Today", "Last 7 days", "Last month", "Last year"]
  return (
    <div>
      <ToastContainer />
      <div className={styles.dash_top}>
        <div className={styles.red_sched}>
          <p>Redline Schedule</p>
          <div>
            <div className={styles.flexButtons}>
              <OutlineButton text="Edit Train" onClick={handleEdit} />
              <OutlineButton text="Add Train" onClick={handleAdd} />
            </div>
            <br />
            <div className={styles.flexButtons}>
              <PrimartButton
                text="Send Not6ification"
                onClick={() => setModal(true)}
                active={true}
                load={null}
              />
            </div>
          </div>
        </div>
        <div className={styles.trains}>
          {fetchTrainData?.trains?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={
                  selectedTrain === item?.train_id
                    ? styles.active
                    : styles.Inactive
                }
              >
                <div
                  onClick={() => handleTrainSelect(item?.train_id)}
                  className={
                    item?.status === "ACTIVE"
                      ? styles.train
                      : styles.trainInactive
                  }
                >
                  <p>{item?.name}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.movement}>
          {fetchTrainLoad ? (
            <LoadingAnimation />
          ) : (
            selectedTrain &&
            fetchTrainData?.trains
              ?.find((train: any) => train?.train_id === selectedTrain)
              .route.map((station: any, index: any, array: any) => (
                <div className={styles.loca} key={index}>
                  {index === 0 || index === array.length - 1 ? (
                    <div>
                      <h1>{station?.station}</h1>
                      <p>{station?.time}</p>
                      <p>{station?.departureTime[0]}</p>
                    </div>
                  ) : null}
                </div>
              ))
          )}
          <div className={styles.trainSvg}>
            <Trans_train />
          </div>
        </div>
        <div className={styles.red_sched}>
          <p>Train Route</p>
          {/* <div>
            <OutlineButton text="Move To Next Station" onClick={() => null} />
          </div> */}
        </div>
        <div className={styles.local}>
          {fetchTrainLoad ? (
            <LoadingAnimation />
          ) : (
            selectedTrain &&
            fetchTrainData?.trains
              ?.find((train: any) => train?.train_id === selectedTrain)
              .route.map((station: any, index: any) => (
                <div key={index} className={styles.currentLocation}>
                  <Locationsvggreen />
                  <p>{station?.station}</p>
                  <p>{station?.time}</p>

                  <p className={styles.departure}>
                    {station?.departureTime[0]}
                  </p>
                  <p className={styles.arrival}>{station?.arrivalTime[0]}</p>
                  <div className={styles.point}></div>
                </div>
              ))
          )}
        </div>
      </div>
      {width > 900 ? (
        <div className={styles.dash_top}>
          <div className={styles.red_sched}>
            <p>Ticket Usage summary</p>
            <div>
              <PrimarySelect label={""} options={data} onchange={() => null} />
            </div>
          </div>
          <VerticalBarChart ChartData={chartData} />
        </div>
      ) : null}
      {modal ? (
        <Modal close={() => setModal(false)}>
          <div className={styles.popup}>
            <PrimaryInput
              label="title"
              type="text"
              name="title"
              onchange={(e: any) => setTitle(e.target.value)}
              placeholder={"Notification title"}
              value={title}
            />
            <textarea
              cols={59}
              rows={9}
              onChange={(e) => setDescription(e.target.value)}
              value={descriptions}
            ></textarea>
            <PrimartButton
              text="Send Not6ification"
              onClick={notifications}
              active={true}
              load={addNotificationsLoad}
            />
          </div>
        </Modal>
      ) : null}
    </div>
  )
}

export default MainDash
