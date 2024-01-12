import OutlineButton from "@/component/Buttons/outline_button"
import Back_svg from "@/component/SVGs/back_svg"
import Blue_location_svg from "@/component/SVGs/blue_location_svg"
import styles from "./styles.module.css"
const EditSchedule = ({ previous }: { previous: any }) => {
  return (
    <div>
      <div className={styles.back_save}>
        <Back_svg onClick={() => previous()} />
        <div className={styles.save_btn}>
          <p> Save Changes</p>
        </div>
      </div>
      <div className={styles.stationDetails}>
        <div>
          <h1>Train 1 schedule</h1>
          <p>Edit Train 1</p>
        </div>
        <div className={styles.local_flex}>
          <div className={styles.train_route}>
            <div className={styles.local}>
              <Blue_location_svg />
              <p>Iyana-Ipajs</p>
            </div>
            <hr className={styles.hr} />
            <div className={styles.time}>
              <p>10AM</p>
              <OutlineButton onClick={() => null} text="Edit" />
            </div>
          </div>
          <div className={styles.add_stop}>
            <OutlineButton onClick={() => null} text="Add Stop" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSchedule
