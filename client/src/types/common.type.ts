export interface User {
  _id: string
  name: string
  email: string
  avatar: string
  createdAt: string
}

export interface MessageContent {
  text?: string
  picture?: string
}

export interface Message extends MessageContent {
  _id: string
  receiverId: string
  senderId: string
  createdAt: string
}
