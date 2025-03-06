import React from "react"
import { Navigation } from "./components/Navigation"
import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { SignUpPage } from "./pages/SignUpPage"
import { LoginPage } from "./pages/LoginPage"
import { SettingsPage } from "./pages/SettingsPage"
import { ProfilePage } from "./pages/ProfilePage"
import { NotFound } from "./pages/NotFound"

export const App = () => {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  )
}
