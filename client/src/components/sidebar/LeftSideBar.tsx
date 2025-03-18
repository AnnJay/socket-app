import { FC } from "react"

import { AvatarSection } from "./AvatarSection"
import { UsersRound } from "lucide-react"
import { useChat } from "../../store/useChat"
import { UsersSceleton } from "./UsersSceleton"
import { useAuthStore } from "../../store/useAuthStore"
import { OFFLINE_STATUS, ONLINE_STATUS } from "../../constants"

export const LeftSideBar: FC = () => {
  const { onlineUsers } = useAuthStore()
  const { isUsersLoading, users, setUserTalkTo, userTalkTo } = useChat()

  return (
    <div className="max-w-20 w-full mr-3 h-full sm:max-w-72">
      <div className="flex items-center mb-5">
        <h2 className="text-2xl font-bold text-base-content mr-4 hidden sm:block">Контакты</h2>
        <UsersRound className="size-5" />
      </div>

      <div className="space-y-2 overflow-y-auto w-full h-[calc(100%-3.25rem)]">
        {users.length > 0 &&
          users.map((user) => (
            <div onClick={() => setUserTalkTo(user)} key={user._id}>
              <AvatarSection
                avatar={user.avatar}
                name={user.name}
                status={onlineUsers.includes(user._id) ? ONLINE_STATUS : OFFLINE_STATUS}
                isUserTalkTo={user._id === userTalkTo?._id}
              />
            </div>
          ))}

        {isUsersLoading && <UsersSceleton />}
      </div>
    </div>
  )
}
