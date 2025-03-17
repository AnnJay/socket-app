import { create } from "zustand"
import { DEFAULT_THEME_TITLE } from "../constants"

interface ThemeStore {
  theme: string
  setTheme: (title: string) => void
}

const THEME_STORAGE_KEY = "theme_title"

export const useTheme = create<ThemeStore>((set) => ({
  theme: localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME_TITLE,
  setTheme: (theme: string) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    set({ theme })
  },
}))
