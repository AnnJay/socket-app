import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"

import { Navigation } from "./components/Navigation"
import { HomePage } from "./pages/HomePage"
import { SignUpPage } from "./pages/SignUpPage"
import { LoginPage } from "./pages/LoginPage"
import { SettingsPage } from "./pages/SettingsPage"
import { ProfilePage } from "./pages/ProfilePage"
import { NotFound } from "./pages/NotFound"
import { useAuthStore } from "./store/useAuthStore"
import { useTheme } from "./store/useTheme"

export const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme } = useTheme()

  useEffect(() => {
    checkAuth()

    return () => {}
  }, [])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navigation />

      <Toaster />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}
