const { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } = require("../constants")
const RequestError = require("../errors/RequestError")
const { cloud } = require("../lib/cloud")
const User = require("../models/user.model")
const {
  generateToken,
  hashPassword,
  isValidPassword,
  validateSignUpData,
  handleError,
  validateLoginData,
  clearCookiesToken,
} = require("../utils/auth.utils")

const signUp = async (req, res) => {
  const { email, name, password } = req.body
  try {
    await validateSignUpData(name, email, password)

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new RequestError(ERROR_MESSAGES.USER_EXISTS, HTTP_STATUS.BAD_REQUEST)
    }

    const hashedPassword = await hashPassword(password)

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      avatar: "",
    })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save()

      res.status(HTTP_STATUS.CREATED).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      })
    } else {
      throw new RequestError(ERROR_MESSAGES.SIGNUP_ERROR, HTTP_STATUS.BAD_REQUEST)
    }
  } catch (error) {
    handleError(res, error.statusCode, error.message)
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    validateLoginData(email, password)

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
      throw new RequestError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.NOT_FOUND)
    }

    if (await isValidPassword(password, existingUser.password)) {
      generateToken(existingUser._id, res)

      res.status(200).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        avatar: existingUser.avatar,
      })
    } else {
      throw new RequestError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.NOT_FOUND)
    }
  } catch (error) {
    handleError(res, error.statusCode, error.message)
  }
}

const logout = async (_, res) => {
  try {
    clearCookiesToken(res)
    return res.status(HTTP_STATUS.SUCCESS).json({ message: SUCCESS_MESSAGES.LOGOUT_SUCCESS })
  } catch (error) {
    handleError(res, error.statusCode, error.message)
  }
}

const updateUserData = async (req, res) => {
  try {
    const { avatar } = req.body
    const userId = req.user._id

    if (!avatar) {
      throw new RequestError(ERROR_MESSAGES.NO_FILE_ATTACHED, HTTP_STATUS.BAD_REQUEST)
    }

    const uploadResult = await cloud.uploader.upload(avatar)
    const updatedUser = await User.findByIdAndUpdate(userId, { avatar: uploadResult.secure_url }, { new: true })

    res.status(HTTP_STATUS.SUCCESS).json(updatedUser)
  } catch (error) {
    handleError(res, error.statusCode, error.message)
  }
}

const checkUserSession = async (req, res) => {
  try {
    if (req.user) {
      res.status(HTTP_STATUS.SUCCESS).json(req.user)
    } else {
      throw new RequestError(ERROR_MESSAGES.EXPIRED_SESSION, HTTP_STATUS.UNAUTHORIZED)
    }
  } catch (error) {
    handleError(res, error.statusCode, error.message)
  }
}

module.exports = { checkUserSession, login, logout, signUp, updateUserData }
