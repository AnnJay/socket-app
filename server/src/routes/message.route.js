const express = require("express")

const { checkAuth } = require("../middleware/auth.middleware")
const { getRelatedUsers, getUserMessages, sendMessage } = require("../controllers/message.controller")

const messageRoutes = express.Router()

const MESSAGE_PATHS = {
  USERS: "/users",
  USER_MESSAGES: "/:id",
  SEND_MESSAGE: "/send/:id",
}

messageRoutes.get(MESSAGE_PATHS.USERS, checkAuth, getRelatedUsers)
messageRoutes.get(MESSAGE_PATHS.USER_MESSAGES, checkAuth, getUserMessages)

messageRoutes.post(MESSAGE_PATHS.SEND_MESSAGE, checkAuth, sendMessage)

module.exports = { messageRoutes }
