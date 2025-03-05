const express = require("express")
const { signUp, login, logout, updateUserData, checkUserSession } = require("../controllers/auth.controller")
const { checkAuth } = require("../middleware/auth.middleware")

const authRoutes = express.Router()

const AUTH_PATHS = {
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
  LOGOUT: "/logout",
}

const ADDITIONAL_PATHS = {
  UPDATE_USER: "/update-user",
  CHECK_USER: "/check-user",
}

authRoutes.post(AUTH_PATHS.SIGN_UP, signUp)
authRoutes.post(AUTH_PATHS.LOGIN, login)
authRoutes.post(AUTH_PATHS.LOGOUT, logout)

authRoutes.patch(ADDITIONAL_PATHS.UPDATE_USER, checkAuth, updateUserData)
authRoutes.get(ADDITIONAL_PATHS.CHECK_USER, checkAuth, checkUserSession)

module.exports = { authRoutes, AUTH_PATHS }
