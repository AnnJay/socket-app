const http = require("http")
const { Server } = require("socket.io")
const express = require("express")

const app = express()
const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
  },
})

let onlineUsers = {}

const getReceiverSocketId = (receiverId) => onlineUsers[receiverId]

io.on("connection", (socket) => {
  console.log("Пользователь online", socket.id)
  const userId = socket.handshake.query.userId

  if (userId) onlineUsers[userId] = socket.id
  io.emit("broadcastOnlineUsers", Object.keys(onlineUsers))

  socket.on("disconnect", () => {
    console.log("Пользователь offline", socket.id)

    if (userId) {
      delete onlineUsers[userId]
    }

    io.emit("broadcastOnlineUsers", Object.keys(onlineUsers))
  })
})

module.exports = { app, httpServer, io, getReceiverSocketId }
