import { FC } from "react"

import { DEFAULT_AVATAR_PATH } from "../constants"

interface AvatarSectionProps {
  avatar: string
  name: string
  status: string
}

export const AvatarSection: FC<AvatarSectionProps> = ({ avatar = DEFAULT_AVATAR_PATH, name, status = "Online" }) => {
  return (
    <div className="flex gap-4 justify-start items-center">
      <img src={avatar} className="rounded-full border-2 size-16" />
      <div>
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-base-content/70">{status}</p>
      </div>
    </div>
  )
}
