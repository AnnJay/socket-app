import { create } from "zustand"

import { Message, MessageContent, User } from "../types/common.type"
import { axiosInstance } from "../libs/axios"
import toast from "react-hot-toast"

interface ChatStore {
  userTalkTo: User | null
  users: User[]
  messages: Message[]
  isUsersLoading: boolean
  isMessagesLoading: boolean

  getUsersList: () => Promise<void>
  getMessagesList: (id: string) => Promise<void>
  sendMessage: (content: MessageContent, userId: string) => Promise<void>
  setUserTalkTo: (user: User | null) => void
}

export const useChat = create<ChatStore>((set, get) => ({
  userTalkTo: null,
  users: [],
  messages: [],
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsersList: async () => {
    set({ isUsersLoading: true })

    try {
      const res = await axiosInstance.get("/message/users")
      set({ users: res.data })
    } catch (error) {
      toast.error("Не удалось загрузить пользователей")
      console.log(error)
    } finally {
      set({ isUsersLoading: false })
    }
  },

  getMessagesList: async (userTalkToId: string) => {
    set({ isMessagesLoading: true })

    try {
      const res = await axiosInstance.get(`/message/${userTalkToId}`)
      set({ users: res.data })
    } catch (error) {
      toast.error("Не удалось загрузить сообщения пользователя")
      console.log(error)
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  sendMessage: async (messageContent) => {
    const { messages, userTalkTo } = get()
    try {
      const res = await axiosInstance.post(`/message/send/${userTalkTo?._id}`, messageContent)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      toast.error("Ошибка при отправке сообщения")
      console.log(error)
    }
  },

  setUserTalkTo: (user) => set({ userTalkTo: user }),
}))
