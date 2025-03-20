import { useEffect } from "react"
import { useAuthStore } from "../../store/useAuthStore"
import { useChat } from "../../store/useChat"
import { ChatSceleton } from "./ChatSceleton"
import { DEFAULT_AVATAR_PATH } from "../../constants"

export const ChatMessagesSection = () => {
  const { getMessagesList, isMessagesLoading, messages, userTalkTo } = useChat()
  const { authUser } = useAuthStore()

  useEffect(() => {
    if (userTalkTo) {
      getMessagesList(userTalkTo._id)
    }
  }, [userTalkTo])
  return (
    <div className="h-[calc(100%-9rem)] overflow-y-auto">
      {messages.map((message) => {
        const isAuthUserMessage = authUser && message.senderId === authUser._id
        const userInfo = isAuthUserMessage ? authUser : userTalkTo
        return (
          <div key={message._id} className={`chat chat-${isAuthUserMessage ? "end" : "start"}`}>
            <div className="chat-image avatar">
              <div className="max-w-10 rounded-full border-2">
                <img alt="avatar" src={userInfo?.avatar || DEFAULT_AVATAR_PATH} />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50 mx-2">{message.createdAt.split("T")[1].slice(0, 5)}</time>
            </div>
            {message?.text && <div className="chat-bubble">{message.text}</div>}
            {message?.picture && typeof message.picture === "string" && (
              <div className="chat-bubble">
                <img src={message.picture} className="size-40" />
              </div>
            )}
          </div>
        )
      })}
      {isMessagesLoading && <ChatSceleton />}
    </div>
  )
}
