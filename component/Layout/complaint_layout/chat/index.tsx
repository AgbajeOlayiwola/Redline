import PrimartButton from "@/component/Buttons/PrimaryButton"
import OutlineButton from "@/component/Buttons/outline_button"
import Circle_svg from "@/component/SVGs/circle_svg"
import Send_svg from "@/component/SVGs/send_svg"
import {
  useMarkComplaintsMutation,
  useReplyComplaintsMutation,
} from "@/redux/api/mutationApi"
import { useEffect, useState } from "react"
import { LuMessagesSquare } from "react-icons/lu"
import styles from "./styls.module.css"
const ComplaintChat = ({ chat }: { chat: any }) => {
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState<any>([])

  useEffect(() => {
    if (chat && chat?.messages) {
      setChats([...chat?.messages])
    }
  }, [chat])

  const [
    replyComplaints,
    {
      data: replyComplaintsData,
      isLoading: replyComplaintsLoad,
      isSuccess: replyComplaintsSuccess,
      isError: replyComplaintsFalse,
      error: replyComplaintsErr,
      reset: replyComplaintsReset,
    },
  ]: any = useReplyComplaintsMutation()
  const [
    markComplaints,
    {
      data: markComplaintsData,
      isLoading: markComplaintsLoad,
      isSuccess: markComplaintsSuccess,
      isError: markComplaintsFalse,
      error: markComplaintsErr,
      reset: markComplaintsReset,
    },
  ]: any = useMarkComplaintsMutation()

  const sendMessage = () => {
    const data = {
      userID: chat?.userDetails?.id,
      complaintId: chat?.id,
      replyMessage: message,
    }
    replyComplaints(data)

    // Create a copy of the chat object with a new messages array
    const updatedChat = {
      ...chat,
      messages: [...chat.messages],
    }

    const newMessage = {
      sender: "admin", // Assuming the sender is always admin for the reply
      content: message,
      timestamp: new Date().toISOString(),
    }
    updatedChat.messages.push(newMessage)

    setChats(updatedChat.messages)
    setMessage("")
  }
  const resolveComplaint = () => {
    const data = {
      userID: chat?.userDetails?.id,
      complaintId: chat?.id,
      newStatus: "Resolved",
    }

    markComplaints(data)
  }
  return (
    <>
      {chat ? (
        <div>
          <div className={styles.chat_box}>
            <div className={styles.chatTop}>
              <div>
                <h1>{chat?.userDetails?.fullname}</h1>
                <p className={styles.chatTopP}>
                  {chat?.userDetails?.email} . {chat?.userDetails?.phone}
                </p>
              </div>
              <OutlineButton
                text="Resolve ticket"
                onClick={() => resolveComplaint()}
              />
            </div>
            <hr />
            <div className={styles.messagesContainer}>
              {chats.map((messageItem: any, index: number) => (
                <div
                  key={index}
                  className={
                    messageItem.sender === "user"
                      ? styles.userMessage
                      : styles.adminMessage
                  }
                >
                  <p>{messageItem.content}</p>
                </div>
              ))}
            </div>
            <div className={styles.input_btn}>
              <div className={styles.input_div}>
                <Circle_svg />
                <input
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type something"
                />
              </div>
              <div className={styles.send_btn}>
                <PrimartButton
                  load={null}
                  onClick={() => sendMessage()}
                  active={true}
                  text={<Send_svg />}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>
          <LuMessagesSquare />
        </div>
      )}
    </>
  )
}

export default ComplaintChat
