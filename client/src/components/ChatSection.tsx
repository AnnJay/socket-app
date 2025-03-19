import { ChatHeader } from "./chat/ChatHeader"
import { ChatFooter } from "./chat/ChatFooter"
import { ChatMessagesSection } from "./chat/ChatMessagesSection"

export const ChatSection = () => {
  return (
    <div className="w-full h-full">
      <ChatHeader />
      <ChatMessagesSection />
      <ChatFooter />
    </div>
  )
}
