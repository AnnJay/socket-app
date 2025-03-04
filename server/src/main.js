const express = require("express");
const { authRoutes } = require("./routes/auth.route");

const app = express();
const PORT = 5000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
