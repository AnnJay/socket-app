import { FC, useState } from "react"

import { AvatarSection } from "./AvatarSection"
import { UsersRound } from "lucide-react"
import { useChat } from "../../store/useChat"
import { UsersSceleton } from "./UsersSceleton"
import { useAuthStore } from "../../store/useAuthStore"
import { OFFLINE_STATUS, ONLINE_STATUS } from "../../constants"

export const LeftSideBar: FC = () => {
  const { onlineUsers } = useAuthStore()
  const { isUsersLoading, users, setUserTalkTo, userTalkTo } = useChat()

  const [showOnline, setShowOnline] = useState<boolean>(false)

  const filterUsers = () => {
    return users.filter((user) => {
      if (showOnline) return onlineUsers.includes(user._id)
      return true
    })
  }

  return (
    <div className="max-w-20 w-full mr-3 h-full sm:max-w-72 border-r-2 border-base-200">
      <div className="flex items-center mb-5">
        <h2 className="text-2xl font-bold text-base-content mr-4 hidden sm:block">Контакты</h2>
        <UsersRound className="size-5" />
      </div>

      <div className="form-control">
        <label className="cursor-pointer label text-md flex gap-x-2 justify-start">
          <input
            type="checkbox"
            checked={showOnline}
            onChange={() => setShowOnline((prev) => !prev)}
            className="checkbox checkbox-info"
          />
          <span className="label-text">Только Online</span>
        </label>
      </div>

      <div className="space-y-2 overflow-y-auto w-full h-[calc(100%-3.25rem)]">
        {users.length > 0 &&
          filterUsers().map((user) => (
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
