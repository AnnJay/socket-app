import { SendHorizontal } from "lucide-react"

export const ChatFooter = () => {
  return (
    <div className="flex items-center justify-between gap-2 w-full">
      <input type="text" className="input input-bordered  rounded-md w-full" />

      <div className="bg-base-300 hover:bg-base-200 cursor-pointer rounded-md transition-colors border-2">
        <div className="flex items-center justify-center  size-12 ">
          <SendHorizontal className="size-8 text-secondary" />
        </div>
      </div>
    </div>
  )
}
