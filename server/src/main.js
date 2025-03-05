const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const { authRoutes } = require("./routes/auth.route");
const connectDataBase = require("./lib/database");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте ${PORT}`);
  connectDataBase();
});
