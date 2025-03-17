import { FC } from "react"
import { User } from "../types/common.type"
import { AvatarSection } from "./AvatarSection"
import { UsersRound } from "lucide-react"

export const LeftSideBar: FC<{ contacts: User[]; isLoading: boolean }> = ({ contacts, isLoading }) => {
  return (
    <div className="max-w-72 w-full mr-3 h-full">
      <div className="flex items-center mb-5">
        <h2 className="text-2xl font-bold text-base-content mr-4">Контакты</h2>
        <UsersRound className="size-5" />
      </div>

      <div className="space-y-2 overflow-y-auto">
        {contacts.map((contact) => (
          <AvatarSection key={contact._id} avatar={contact.avatar} name={contact.name} status="Online" />
        ))}
      </div>
    </div>
  )
}
