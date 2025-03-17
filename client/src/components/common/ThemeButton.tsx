import { FC } from "react"

interface ThemeButtonProps {
  theme: string
  onClick: () => void
}

export const ThemeButton: FC<ThemeButtonProps> = ({ theme, onClick }) => {
  return (
    <button onClick={onClick}>
      <div className="relative h-12 w-full rounded-md hover bg-base-200 hover:bg-base-200/50" data-theme={theme}>
        <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
          <div className="rounded bg-primary"></div>
          <div className="rounded bg-secondary"></div>
          <div className="rounded bg-accent"></div>
          <div className="rounded bg-neutral"></div>
        </div>
      </div>
      <span className="text-md font-bold w-full text-center capitalize">{theme}</span>
    </button>
  )
}
