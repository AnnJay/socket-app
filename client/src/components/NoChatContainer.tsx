import { MessageSquare } from "lucide-react"

export const NoChatContainer = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-16 bg-base-100/50">
      <div
        className="size-16 rounded-md bg-primary/10 flex items-center
             justify-center animate-bounce mb-4"
      >
        <MessageSquare className="size-8 text-primary" />
      </div>

      <p className="text-base-content/60">Выберите контакт, чтобы начать диалог</p>
    </div>
  )
}
