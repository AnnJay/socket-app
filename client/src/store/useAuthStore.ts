import { create } from "zustand"
import toast from "react-hot-toast"
import { io, Socket } from "socket.io-client"

import { axiosInstance } from "../libs/axios"
import { SignUpFormData } from "../pages/SignUpPage"
import { LoginFormData } from "../pages/LoginPage"
import { User } from "../types/common.type"

interface AuthStoreState {
  authUser: User | null
  isSigningUp: boolean
  isLoggingIn: boolean
  isUpdatingProfile: boolean
  isCheckingAuth: boolean
  socket: Socket | null
  onlineUsers: string[]

  checkAuth: () => Promise<void>
  login: (formData: LoginFormData) => Promise<void>
  signUp: (formData: SignUpFormData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (avatarUrl: string) => Promise<void>
  connectSocket: () => Promise<void>
  disconnectSocket: () => Promise<void>
}

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/"

export const useAuthStore = create<AuthStoreState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-user")

      set({ authUser: res.data })
      get().connectSocket()
    } catch (error) {
      console.log("Произошла ошибка при проверке сессии", error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  login: async (formData) => {
    set({ isLoggingIn: true })

    try {
      const res = await axiosInstance.post("/auth/login", formData)
      set({ authUser: res.data })
      toast.success("Успешно!")

      get().connectSocket()
    } catch (error) {
      toast.error("Ошибка при входе пользователя")
      console.log(error)
    } finally {
      set({ isLoggingIn: false })
    }
  },
  signUp: async (formData) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post("/auth/sign-up", formData)
      toast.success("Вы успешно зарегестрировались")
      set({ authUser: res.data })

      get().connectSocket()
    } catch (error) {
      toast.error("Ошибка при регистрации пользователя")
      console.log(error)
    } finally {
      set({ isSigningUp: false })
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout")
      set({ authUser: null })
      toast.success("Успешно!")

      get().disconnectSocket()
    } catch (error) {
      toast.error("Произошла ошибка [logout error].")
    }
  },
  updateProfile: async (avatarUrl) => {
    set({ isUpdatingProfile: true })

    try {
      const res = await axiosInstance.patch("/auth/update-user", { avatar: avatarUrl })
      set({ authUser: res.data })
      toast.success("Поздравляем с новым аватаром!")
    } catch (error) {
      toast.error("Ошибка при попытке загрузить изображение")
      console.log(error)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },
  connectSocket: async () => {
    const { authUser, socket } = get()
    if (socket?.connected) return

    const socketInstance = io(BASE_URL, {
      query: {
        userId: authUser?._id,
      },
    })
    socketInstance.connect()

    set({ socket: socketInstance })

    socketInstance?.on("broadcastOnlineUsers", (onlineUsersIds) => {
      set({ onlineUsers: onlineUsersIds })
    })
  },

  disconnectSocket: async () => {
    const { socket } = get()

    if (!socket?.connected) return

    socket.disconnect()
    set({ socket: null })
  },
}))
