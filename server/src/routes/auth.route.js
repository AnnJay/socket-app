const express = require("express");
const authController = require("../controllers/auth.controller");

const authRoutes = express.Router();

const AUTH_PATHS = {
  SIGN_UP: "/sign-up",
  LOGIN: "/login",
  LOGOUT: "/logout",
  RESET_PASSWORD: "/reset-password",
};

authRoutes.post(AUTH_PATHS.SIGN_UP, authController.signUp);
authRoutes.post(AUTH_PATHS.LOGIN, authController.login);
authRoutes.post(AUTH_PATHS.LOGOUT, authController.logout);
authRoutes.post(AUTH_PATHS.RESET_PASSWORD, authController.resetPassword);

module.exports = { authRoutes, AUTH_PATHS };
