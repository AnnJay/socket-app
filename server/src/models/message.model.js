const { Schema, model, default: mongoose } = require("mongoose")

const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true }
)

const Message = model("Message", messageSchema)

module.exports = Message
