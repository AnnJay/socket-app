const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { ERROR_MESSAGES, HTTP_STATUS } = require("../constants");
const RequestError = require("../errors/RequestError");

const handleError = (res, status, message) => {
  if (status) return res.status(status).json({ message });
  else
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.SERVER_ERROR);
};

const validateSignUpData = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new RequestError(
      ERROR_MESSAGES.MISSING_FIELDS,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (password.length < 6) {
    throw new RequestError(
      ERROR_MESSAGES.PASSWORD_LENGTH,
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

const validateLoginData = (email, password) => {
  if (!email || !password) {
    throw new RequestError(
      ERROR_MESSAGES.MISSING_FIELDS,
      HTTP_STATUS.BAD_REQUEST
    );
  }
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const isValidPassword = async (inputPassword, realPassword) => {
  return await bcrypt.compare(inputPassword, realPassword);
};

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "14d",
  });

  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.DEVELOPMENT_STAGE !== "development",
  });

  return token;
};

const clearCookiesToken = (res) => {
  res.cookie("jwt", "", { maxAge: 0 });
};

module.exports = {
  clearCookiesToken,
  generateToken,
  hashPassword,
  isValidPassword,
  handleError,
  validateLoginData,
  validateSignUpData,
};
