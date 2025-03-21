import { useEffect } from "react"
import { useAuthStore } from "../../store/useAuthStore"
import { useChat } from "../../store/useChat"
import { ChatSceleton } from "./ChatSceleton"
import { DEFAULT_AVATAR_PATH } from "../../constants"
import { formatChatMessageTime } from "../../functions"

export const ChatMessagesSection = () => {
  const { getMessagesList, isMessagesLoading, messages, userTalkTo } = useChat()
  const { authUser } = useAuthStore()

  useEffect(() => {
    if (userTalkTo) {
      getMessagesList(userTalkTo._id)
    }
  }, [userTalkTo])
  return (
    <div className="h-[calc(100%-9rem)] overflow-y-auto pr-4 pb-3">
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
              <time className="text-xs opacity-50 mx-2">{formatChatMessageTime(message.createdAt)}</time>
            </div>
            <div className="chat-bubble flex flex-col gap-y-2">
              {message?.text && <div>{message.text}</div>}
              {message?.picture && typeof message.picture === "string" && (
                <img src={message.picture} className="size-40" />
              )}
            </div>
          </div>
        )
      })}
      {isMessagesLoading && <ChatSceleton />}
    </div>
  )
}
