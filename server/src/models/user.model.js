const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    avatar: {
      type: String,
      dafault: "",
    },
  },
  { timestamps: true }
)

const User = model("User", userSchema)

module.exports = User
