import PrimartButton from "@/component/Buttons/PrimaryButton"
import OutlineButton from "@/component/Buttons/outline_button"
import Back_svg from "@/component/SVGs/back_svg"
import Circle_svg from "@/component/SVGs/circle_svg"
import Send_svg from "@/component/SVGs/send_svg"
import LoadingAnimation from "@/component/animations/loadingAnimation"
import {
  useFetchSingleComplaintsMutation,
  useMarkComplaintsMutation,
  useReplyComplaintsMutation,
} from "@/redux/api/mutationApi"
import { useEffect, useState } from "react"
import { LuMessagesSquare } from "react-icons/lu"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styles from "./styls.module.css"
const ComplaintChat = ({ chat, previous }: { chat: any; previous: any }) => {
  const [message, setMessage] = useState("")
  const [chats, setChats] = useState<any>([])

  useEffect(() => {
    if (chat && chat?.messages) {
      setChats([...chat?.messages])
    }
  }, [chat])
  console.log(chat)
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
    fetchSingleComplaints,
    {
      data: fetchSingleComplaintsData,
      isLoading: fetchSingleComplaintsLoad,
      isSuccess: fetchSingleComplaintsSuccess,
      isError: fetchSingleComplaintsFalse,
      error: fetchSingleComplaintsErr,
      reset: fetchSingleComplaintsReset,
    },
  ]: any = useFetchSingleComplaintsMutation()
  useEffect(() => {
    const data = {
      userID: "66706bdda5067212fec15bc9",
      complaintId: "6672a990df130c5c4cfcb440",
    }
    fetchSingleComplaints(data)
  }, [])

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
      newStatus: "CLOSED",
    }

    markComplaints(data)
  }
  const showToastSuccessMessage = () => {
    toast.success("Complaint Resolved Successfully", {
      position: "top-right",
    })
  }
  const showToastErrorMessage = () => {
    toast.error("Complaint resolve error ", {
      position: "top-right",
    })
  }
  useEffect(() => {
    if (markComplaintsErr) {
      showToastErrorMessage()
    }
  }, [markComplaintsErr])

  useEffect(() => {
    if (markComplaintsSuccess) {
      showToastSuccessMessage()
    }
  }, [markComplaintsSuccess])

  return (
    <>
      <div className={styles.add_agent}>
        <Back_svg onClick={() => previous()} />
        <h1>Complaints</h1>
      </div>
      <ToastContainer />
      {fetchSingleComplaintsLoad ? (
        <LoadingAnimation />
      ) : chat ? (
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
                loads={markComplaintsLoad}
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
