"use client"
import OutlineButton from "@/component/Buttons/outline_button"
import Locationsvggreen from "@/component/SVGs/locationsvggreen"
import Trans_train from "@/component/SVGs/trans_train"
import LoadingAnimation from "@/component/animations/loadingAnimation"
import { VerticalBarChart } from "@/component/vertical_bar_chart"
import { useFetchTrainMutation } from "@/redux/api/mutationApi"
import { setAllTrain } from "@/redux/slices/allTrainSlice"
import { setSingleTrain } from "@/redux/slices/singleTrainSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import PrimarySelect from "../../primary_select"
import styles from "./styles.module.css"
const MainDash = ({ nextPage }: { nextPage: any }) => {
  const [selectedTrain, setSelectedTrain] = useState(null)
  const dispatch = useDispatch()

  const handleTrainSelect = (trainId: any) => {
    setSelectedTrain(trainId)
  }
  const chartData = [
    {
      companyName: "Yaba",
      progressPaymentPrice: 10,
    },
    {
      companyName: "Ikeja",
      progressPaymentPrice: 120,
    },
    {
      companyName: "Ikotun",
      progressPaymentPrice: 105,
    },
    {
      companyName: "Apple",
      progressPaymentPrice: 80,
    },
    {
      companyName: "Ikorodu",
      progressPaymentPrice: 150,
    },
    {
      companyName: "Iayana Ipaja",
      progressPaymentPrice: 30,
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
    dispatch(setSingleTrain(found))
    nextPage()
  }
  const data = ["Today", "Last 7 days", "Last month", "Last year"]
  return (
    <div>
      <div className={styles.dash_top}>
        <div className={styles.red_sched}>
          <p>Redline Schedule</p>
          <div>
            <OutlineButton text="Edit Schedule" onClick={handleEdit} />
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
                  <div className={styles.point}></div>
                </div>
              ))
          )}
        </div>
      </div>
      <div className={styles.dash_top}>
        <div className={styles.red_sched}>
          <p>Ticket sales summary</p>
          <div>
            <PrimarySelect label={""} options={data} onchange={() => null} />
          </div>
        </div>
        <VerticalBarChart ChartData={chartData} />
      </div>
    </div>
  )
}

export default MainDash
