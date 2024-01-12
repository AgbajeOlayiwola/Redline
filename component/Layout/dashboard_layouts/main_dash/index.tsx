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
          <div className={styles.train}>
            <p>Train 1</p>
          </div>
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
        <div>
          <div className={styles.currentLocation}>
            <Locationsvggreen />
            <p>Iyana-ipaja</p>
            <p>4:30</p>
          </div>
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
