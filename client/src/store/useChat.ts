import { create } from "zustand"

import { Message, MessageContent, User } from "../types/common.type"
import { axiosInstance } from "../libs/axios"
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore"

interface ChatStore {
  userTalkTo: User | null
  users: User[]
  messages: Message[]
  isUsersLoading: boolean
  isMessagesLoading: boolean
  isMessageSending: boolean

  getUsersList: () => Promise<void>
  getMessagesList: (id: string) => Promise<void>
  sendMessage: (content: MessageContent) => Promise<void>
  setUserTalkTo: (user: User | null) => void
  listenToMessages: () => void
  stopListeningMessages: () => void
}

export const useChat = create<ChatStore>((set, get) => ({
  userTalkTo: null,
  users: [],
  messages: [],
  isUsersLoading: false,
  isMessagesLoading: false,
  isMessageSending: false,

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
      set({ messages: res.data })
    } catch (error) {
      toast.error("Не удалось загрузить сообщения пользователя")
      console.log(error)
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  sendMessage: async (messageContent) => {
    const { messages, userTalkTo } = get()
    set({ isMessageSending: true })
    try {
      const res = await axiosInstance.post(`/message/send/${userTalkTo?._id}`, messageContent)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      toast.error("Ошибка при отправке сообщения")
      console.log(error)
    } finally {
      set({ isMessageSending: false })
    }
  },

  listenToMessages: () => {
    const { userTalkTo } = get()

    if (!userTalkTo) return

    const socket = useAuthStore.getState().socket

    socket?.on("message", (message) => {
      if (message.senderId === userTalkTo._id) set({ messages: [...get().messages, message] })
    })
  },

  stopListeningMessages: () => {
    const socket = useAuthStore.getState().socket

    socket?.off("message")
  },

  setUserTalkTo: (user) => set({ userTalkTo: user }),
}))
