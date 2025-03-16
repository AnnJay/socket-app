import { ThemeButton } from "../components/ThemeButton"
import { THEMES } from "../constants"
import { useTheme } from "../store/useTheme"

export const SettingsPage = () => {
  const { setTheme } = useTheme()

  return (
    <div className="h-screen container mx-auto pt-8">
      <div className="flex flex-col space-y-6">
        <h2 className="text-2xl">Темы</h2>
        <p className="text-lg text-base-content ">Подберите тему по вкусу</p>

        <div className="grid grid-cols-6 gap-4 ">
          {THEMES.map((themeItem) => (
            <ThemeButton theme={themeItem} onClick={() => setTheme(themeItem)} />
          ))}
        </div>
      </div>
    </div>
  )
}
