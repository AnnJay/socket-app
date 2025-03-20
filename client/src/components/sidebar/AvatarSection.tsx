import { FC } from "react"

import { DEFAULT_AVATAR_PATH, ONLINE_STATUS } from "../../constants"

interface AvatarSectionProps {
  avatar: string
  name: string
  status: string
  isUserTalkTo?: boolean
}

export const AvatarSection: FC<AvatarSectionProps> = ({ avatar, name, status, isUserTalkTo }) => {
  return (
    <div className={`p-2 rounded-md ${isUserTalkTo ? "bg-primary" : "hover:bg-base-200"}`}>
      <div className="flex gap-4 justify-start items-center">
        <div className="relative">
          <img src={avatar || DEFAULT_AVATAR_PATH} className="rounded-full border-2 size-16" />
          <span
            className={`absolute right-0 bottom-1 rounded-full size-4 border-2 
            ${status === ONLINE_STATUS ? "bg-green-500" : "bg-slate-800"}`}
          ></span>
        </div>
        <div className="hidden sm:block">
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-base-content/70">{status}</p>
        </div>
      </div>
    </div>
  )
}
