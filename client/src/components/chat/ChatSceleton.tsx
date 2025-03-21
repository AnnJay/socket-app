import React from "react"

export const ChatSceleton = () => {
  const mock_messages = Array(5).fill(0)

  return (
    <div className="w-full h-full">
      {mock_messages.map((_, index) => (
        <React.Fragment key={index}>
          <div className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} `}>
            <div className="skeleton h-16 w-16 shrink-0 rounded-full chat-image avatar"></div>
            <div className="skeleton h-16 w-56 chat-bubble"></div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
