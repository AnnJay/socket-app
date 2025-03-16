import { create } from "zustand"

interface ThemeStore {
  theme: string
  setTheme: (title: string) => void
}

const THEME_STORAGE_KEY = "theme_title"
const DEFAULT_THEME_TITLE = "retro"

export const useTheme = create<ThemeStore>((set) => ({
  theme: localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME_TITLE,
  setTheme: (theme: string) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    set({ theme })
  },
}))
