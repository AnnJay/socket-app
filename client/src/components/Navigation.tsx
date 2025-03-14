import { Link } from "react-router-dom"
import { LogOut, PersonStanding, Radius, Settings } from "lucide-react"

import { useAuthStore } from "../store/useAuthStore"

export const Navigation = () => {
  const { authUser, logout } = useAuthStore()
  return (
    <div>
      <header
        className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
      >
        <div className="container p-2 mx-auto h-16">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-colors">
              <div className="flex justify-center items-center w-10 h-10 rounded-lg bg-orange-400">
                <Radius className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-lg font-medium hidden sm:block">Socket-app</h1>
            </Link>

            <div className="flex items-center gap-3">
              <Link to={"/settings"} className="btn btn-sm gap-2 transition-colors">
                <Settings className="size-5" />
                <span className="hidden sm:inline">Настройки</span>
              </Link>

              {authUser && (
                <>
                  <Link to="/profile" className="btn btn-sm gap-2">
                    <PersonStanding className="size-5" />
                    <span className="hidden sm:inline">Профиль</span>
                  </Link>

                  <button className="flex gap-2 items-center" onClick={logout}>
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Выйти</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
