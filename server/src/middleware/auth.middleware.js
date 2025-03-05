const jwt = require("jsonwebtoken")

const { handleError } = require("../utils/auth.utils")
const RequestError = require("../errors/RequestError")
const { ERROR_MESSAGES, HTTP_STATUS } = require("../constants")
const User = require("../models/user.model")

const checkAuth = async (req, res, next) => {
  try {
    const token = res.cookies.jwt

    if (!token) {
      throw new RequestError(ERROR_MESSAGES.NO_TOKEN, HTTP_STATUS.UNAUTHORIZED)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if (!decoded) {
      throw new RequestError(ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED)
    }

    const existingUser = await User.findById(decoded.userId).select("-password")

    if (!existingUser) {
      throw new RequestError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND)
    }

    req.user = existingUser
    next()
  } catch (error) {
    handleError(res, error.statusCode, error.message)
  }
}

module.exports = { checkAuth }
