import { CircleX, ImageUp, SendHorizontal } from "lucide-react"
import { ChangeEvent, useRef, useState } from "react"
import toast from "react-hot-toast"
import { useChat } from "../../store/useChat"

export const ChatFooter = () => {
  const [text, setText] = useState<string>("")
  const [picture, setPicture] = useState<string>("")
  const imageInputRef = useRef<HTMLInputElement | null>(null)

  const { sendMessage, isMessageSending } = useChat()

  const handleChangeImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    let file

    if (files && files[0]) {
      file = files[0]
    } else {
      return
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onloadend = () => {
      if (reader?.result && typeof reader.result === "string") setPicture(reader.result)
      else toast.error("Проблема с чтением изображения")
    }
  }

  const handleResetImage = () => {
    setPicture("")
    if (imageInputRef.current) imageInputRef.current.value = ""
  }

  const handleSendMessage = async () => {
    if (isMessageSending || (!text.trim() && !picture)) return

    setPicture("")
    setText("")
    if (imageInputRef.current) imageInputRef.current.value = ""

    sendMessage({ text, picture })
  }

  return (
    <div className="flex items-center justify-between gap-3 w-full relative">
      {picture && (
        <div className="absolute -top-44 size-40 left-0 z-40 ">
          <div className="relative">
            <img src={picture} alt="image preview" className="w-full h-full size-40 rounded-md" />
            <div
              className="bg-primary absolute -right-3 -top-3 z-50 cursor-pointer size-7 rounded-full"
              onClick={handleResetImage}
            >
              <div className="flex justify-center items-center h-full">
                <CircleX className="size-5" />
              </div>
            </div>
          </div>
        </div>
      )}

      <input
        type="text"
        className="input input-bordered  rounded-md w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="bg-base-300 hover:bg-base-200 cursor-pointer rounded-md transition-colors border-2">
        <div className="flex items-center justify-center  size-12 ">
          <input
            type="file"
            id="avatar-upload-input"
            className="hidden"
            accept="image/*"
            onChange={handleChangeImage}
            ref={imageInputRef}
          />
          <ImageUp className="size-8 text-secondary" onClick={() => imageInputRef?.current?.click()} />
        </div>
      </div>

      <div
        className="bg-base-300 hover:bg-base-200 cursor-pointer rounded-md transition-colors border-2"
        onClick={handleSendMessage}
      >
        <div className="flex items-center justify-center  size-12 ">
          <SendHorizontal className="size-8 text-secondary" />
        </div>
      </div>
    </div>
  )
}
