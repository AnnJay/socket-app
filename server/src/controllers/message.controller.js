const { HTTP_STATUS, ERROR_MESSAGES } = require("../constants")
const RequestError = require("../errors/RequestError")
const { cloud } = require("../lib/cloud")
const User = require("../models/user.model")
const { handleError } = require("../utils/auth.utils")

const getRelatedUsers = async (req, res) => {
  try {
    const currentUser = req.user._id
    const myContactsList = await User.find({ _id: { $ne: currentUser } }).select("-password")

    res.status(HTTP_STATUS.SUCCESS).json(myContactsList)
  } catch (error) {
    handleError(res, error.statusCode, error.message)
  }
}

const getUserMessages = async (req, res) => {
  try {
    const chatUserId = req.params.id
    const currentUserId = req.user._id

    const messagesList = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: chatUserId },
        { senderId: chatUserId, receiverId: currentUserId },
      ],
    }).sort({ createdAt: 1 })

    res.status(HTTP_STATUS.SUCCESS).json(messagesList)
  } catch (error) {
    handleError(res, error.statusCode, error.message)
  }
}

const sendMessage = async (req, res) => {
  try {
    const { text, picture } = req.body
    const receiverId = req.params.id
    const senderId = req.user._id

    if (!text && !picture) {
      throw new RequestError(ERROR_MESSAGES.NO_DATA, HTTP_STATUS.BAD_REQUEST)
    }

    let pictureUrl

    if (picture) {
      const uploadPicture = await cloud.uploader.upload(picture)
      pictureUrl = uploadPicture.secure_url
    }

    const newMessage = new Message({ senderId, receiverId, text, picture: pictureUrl })

    await newMessage.save()

    res.status(HTTP_STATUS.CREATED).json(newMessage)
  } catch (error) {
    handleError(res, error.statusCode, error.message)
  }
}

module.exports = { getRelatedUsers, getUserMessages, sendMessage }
