const express = require("express")
const { signUp, login, logout, updateUserData } = require("../controllers/auth.controller")
const { checkAuth } = require("../middleware/auth.middleware")

const authRoutes = express.Router()

const AUTH_PATHS = {
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
  LOGOUT: "/logout",
}

const UPDATE_PATHS = {
  UPDATE_USER: "/update-user",
}

authRoutes.post(AUTH_PATHS.SIGN_UP, signUp)
authRoutes.post(AUTH_PATHS.LOGIN, login)
authRoutes.post(AUTH_PATHS.LOGOUT, logout)

authRoutes.patch(UPDATE_PATHS.UPDATE_USER, checkAuth, updateUserData)

module.exports = { authRoutes, AUTH_PATHS }
