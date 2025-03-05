const mongoose = require("mongoose")

const connectDataBase = () =>
  mongoose
    .connect(process.env.MONGO_URI)
    .then((value) => {
      console.log("MONGODB host is: ", value.connection.host)
    })
    .catch((error) => console.log(error))

module.exports = connectDataBase
