import { create } from "zustand"
import toast from "react-hot-toast"

import { axiosInstance } from "../libs/axios"
import { SignUpFormData } from "../pages/SignUpPage"
import { LoginFormData } from "../pages/LoginPage"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: string
}

interface AuthStoreState {
  authUser: User | null
  isSigningUp: boolean
  isLoggingIn: boolean
  isUpdatingProfile: boolean
  isCheckingAuth: boolean

  checkAuth: () => Promise<void>
  login: (formData: LoginFormData) => Promise<void>
  signUp: (formData: SignUpFormData) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (avatarUrl: string) => Promise<void>
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-user")

      set({ authUser: res.data })
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
    } catch (error) {
      toast.error("Произошла ошибка [logout error].")
    }
  },
  updateProfile: async (avatarUrl) => {
    set({ isUpdatingProfile: true })

    try {
      const res = await axiosInstance.post("/auth/update-user", { avatar: avatarUrl })
      set({ authUser: res.data })
      toast.success("Поздравляем с новым аватаром!")
    } catch (error) {
      toast.error("Ошибка при попвтке загрузить изображение")
      console.log(error)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },
}))
