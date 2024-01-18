import PrimartButton from "@/component/Buttons/PrimaryButton"
import OutlineButton from "@/component/Buttons/outline_button"
import Back_svg from "@/component/SVGs/back_svg"
import Circle_svg from "@/component/SVGs/circle_svg"
import Send_svg from "@/component/SVGs/send_svg"
import styles from "./styls.module.css"
const ComplaintChat = ({ previous }: { previous: any }) => {
  return (
    <div>
      <div className={styles.back_save}>
        <Back_svg onClick={() => previous()} />
      </div>
      <br />
      <div className={styles.chat_box}>
        <div className={styles.chatTop}>
          <div>
            <h1>Jerry Olakunle</h1>
            <p className={styles.chatTopP}>
              jerryolakunle@gmail.com . jerryolakunle@gmail.com
            </p>
          </div>
          <OutlineButton text="Resolve ticket" onClick={() => null} />
        </div>
        <hr />
        <div className={styles.input_btn}>
          <div className={styles.input_div}>
            <Circle_svg />
            <input type="text" placeholder="Type something" />
          </div>
          <div className={styles.send_btn}>
            <PrimartButton
              load={null}
              onClick={() => null}
              active={true}
              text={<Send_svg />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComplaintChat
