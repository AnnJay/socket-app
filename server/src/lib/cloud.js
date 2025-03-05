const { v2: cloud } = require("cloudinary")
const dotenv = require("dotenv")

dotenv.config()

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

module.exports = { cloud }
