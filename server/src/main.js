const express = require("express")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")

const { authRoutes } = require("./routes/auth.route")
const { messageRoutes } = require("./routes/message.route")
const connectDataBase = require("./lib/database")
const { app, httpServer } = require("./lib/socket")

dotenv.config()

const PORT = process.env.PORT

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(bodyParser.json({ limit: "2mb" }))
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(path.resolve(), "../frontend", "dist", "index.html"))
  })
}

httpServer.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`)
  connectDataBase()
})
