"use client"
import OutlineButton from "@/component/Buttons/outline_button"
import Locationsvggreen from "@/component/SVGs/locationsvggreen"
import Trans_train from "@/component/SVGs/trans_train"
import { VerticalBarChart } from "@/component/vertical_bar_chart"
import styles from "./styles.module.css"
const MainDash = ({ nextPage }: { nextPage: any }) => {
  const chartData = [
    {
      companyName: "Apple",
      progressPaymentPrice: 10,
    },
    {
      companyName: "Apple",
      progressPaymentPrice: 120,
    },
    {
      companyName: "Apple",
      progressPaymentPrice: 105,
    },
    {
      companyName: "Apple",
      progressPaymentPrice: 80,
    },
    {
      companyName: "Apple",
      progressPaymentPrice: 150,
    },
    {
      companyName: "Apple",
      progressPaymentPrice: 30,
    },
  ]
  const location = [
    { name: "New York", time: "4:30" },
    { name: "New York", time: "4:30" },
    { name: "New York", time: "4:30" },
    { name: "New York", time: "4:30" },
    { name: "New York", time: "4:30" },
    { name: "New York", time: "4:30" },
    { name: "New York", time: "4:30" },
    { name: "New York", time: "4:30" },
  ]
  const trains = [
    { train: "Train 1", condition: "active" },
    { train: "Train 2", condition: "inActive" },
    { train: "Train 3", condition: "inActive" },
    { train: "Train 4", condition: "inActive" },
    { train: "Train 5", condition: "inActive" },
    { train: "Train 6", condition: "inActive" },
    { train: "Train 7", condition: "inActive" },
  ]
  return (
    <div>
      <div className={styles.dash_top}>
        <div className={styles.red_sched}>
          <p>Redline Schedule</p>
          <div>
            <OutlineButton text="Edit Schedule" onClick={() => nextPage()} />
          </div>
        </div>
        <div className={styles.trains}>
          {trains.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  item?.condition === "active"
                    ? styles.train
                    : styles.trainInactive
                }
              >
                <p>{item?.train}</p>
              </div>
            )
          })}
        </div>
        <div className={styles.movement}>
          <div className={styles.loca}>
            <h1>IPJ</h1>
            <p>Iyana Ipaja</p>
          </div>
          <Trans_train />
          <div className={styles.loca}>
            <h1>YAB</h1>
            <p>Yaba</p>
          </div>
        </div>
        <div className={styles.red_sched}>
          <p>Train Route</p>
          <div>
            <OutlineButton text="Move To Next Station" onClick={() => null} />
          </div>
        </div>
        <div className={styles.local}>
          {location.map((item, index) => {
            return (
              <div key={index} className={styles.currentLocation}>
                <Locationsvggreen />
                <p>{item?.name}</p>
                <p>{item?.time}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.dash_top}>
        <div className={styles.red_sched}>
          <p>Ticket sales summary</p>
          <div>
            <OutlineButton text="Edit Schedule" onClick={() => null} />
          </div>
        </div>
        <VerticalBarChart ChartData={chartData} />
      </div>
    </div>
  )
}

export default MainDash
