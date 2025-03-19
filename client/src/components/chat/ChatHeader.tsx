import { CircleX } from "lucide-react"
import { AvatarSection } from "../sidebar/AvatarSection"
import { useChat } from "../../store/useChat"
import { useAuthStore } from "../../store/useAuthStore"
import { OFFLINE_STATUS, ONLINE_STATUS } from "../../constants"

export const ChatHeader = () => {
  const { userTalkTo, setUserTalkTo } = useChat()
  const { onlineUsers } = useAuthStore()

  return (
    <div className="header flex justify-between items-center w-full">
      {userTalkTo && (
        <AvatarSection
          avatar={userTalkTo.avatar}
          name={userTalkTo.name}
          status={onlineUsers.includes(userTalkTo._id) ? ONLINE_STATUS : OFFLINE_STATUS}
        />
      )}

      <CircleX className="size-6 hover:text-secondary/80 transition-colors" onClick={() => setUserTalkTo(null)} />
    </div>
  )
}
