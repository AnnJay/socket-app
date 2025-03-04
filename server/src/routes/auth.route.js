const express = require("express");
const {
  signUp,
  login,
  logout,
  resetPassword,
} = require("../controllers/auth.controller");

const authRoutes = express.Router();

const AUTH_PATHS = {
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
  LOGOUT: "/logout",
  RESET_PASSWORD: "/reset-password",
};

authRoutes.post(AUTH_PATHS.SIGN_UP, signUp);
authRoutes.post(AUTH_PATHS.LOGIN, login);
authRoutes.post(AUTH_PATHS.LOGOUT, logout);
authRoutes.post(AUTH_PATHS.RESET_PASSWORD, resetPassword);

module.exports = { authRoutes, AUTH_PATHS };
