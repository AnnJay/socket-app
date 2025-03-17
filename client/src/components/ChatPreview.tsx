import { FC } from "react"
import { SendHorizontal } from "lucide-react"

import { AvatarSection } from "./AvatarSection"
import { DEFAULT_AVATAR_PATH } from "../constants"

const MOCK_CHAT = [
  {
    id: 1,
    text: "Значит, наши с ним стихии идеально совпадают?",
    isSent: false,
    avatar: "/default_avatar.webp",
    name: "Naruto Uzumaki",
  },
  {
    id: 2,
    text: "Да, только ветер может победить молнию",
    isSent: true,
    avatar: "https://res.cloudinary.com/dcyl8cn9p/image/upload/v1742196902/Kakashi700_mb6rry.webp",
    name: "Kakashi Hatake",
  },
  {
    id: 3,
    text: "Нет! Только ветер может сделать огонь еще сильнее!",
    isSent: false,
    avatar: "/default_avatar.webp",
    name: "Naruto Uzumaki",
  },
]

export const ChatPreview: FC = () => {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-base-content">Превью чата</h2>

      <div className="bg-base-300 rounded-md flex justify-center p-4">
        <div className="bg-base-100 max-w-lg w-full p-4 rounded-md space-y-7">
          <AvatarSection avatar={DEFAULT_AVATAR_PATH} name="Naruto Uzumaki" status="Online" />

          <div className="space-y-4">
            {MOCK_CHAT.map((message) => (
              <div key={message.id} className={`chat chat-${message.isSent ? "end" : "start"}`}>
                <div className="chat-image avatar">
                  <div className="max-w-10 rounded-full border-2">
                    <img alt="avatar" src={message.avatar} />
                  </div>
                </div>
                <div className="chat-header">
                  {message.name}
                  <time className="text-xs opacity-50 mx-2">12:45</time>
                </div>
                <div className="chat-bubble">{message.text}</div>
              </div>
            ))}

            <div className="flex items-center justify-between gap-2 w-full">
              <input
                type="text"
                placeholder="Превью чата"
                readOnly
                className="input input-bordered  rounded-md w-full"
              />

              <div className="flex items-center justify-center border-2 rounded-md size-12 bg-base-300 hover:bg-base-100 cursor-pointer">
                <SendHorizontal className="size-8 text-secondary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
