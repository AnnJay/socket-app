import { create } from "zustand"

import { axiosInstance } from "../libs/axios"

interface User {
  id: string
  name: string
  email: string
}

interface AuthStoreState {
  authUser: User | null
  isSigningUp: boolean
  isLoggingIn: boolean
  isUpdatingProfile: boolean
  isCheckingAuth: boolean

  checkAuth: () => Promise<void>
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
}))
