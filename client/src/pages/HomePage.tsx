import { useEffect } from "react"
import { LeftSideBar } from "../components/sidebar/LeftSideBar"
import { useChat } from "../store/useChat"
import ChatContainer from "../components/ChatContainer"
import { NoChatContainer } from "../components/NoChatContainer"

export const HomePage = () => {
  const { getUsersList, userTalkTo } = useChat()

  useEffect(() => {
    getUsersList()
  }, [])

  return (
    <div className="h-screen container max-w-screen-lg m-auto pt-16">
      <div className="p-3 bg-base-300 rounded-md h-[calc(100vh-8rem)] mt-4">
        <div className="flex justify-between items-start h-full">
          <LeftSideBar />

          {userTalkTo ? <ChatContainer /> : <NoChatContainer />}
        </div>
      </div>
    </div>
  )
}
