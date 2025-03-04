const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
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

const saveUser = () => {};

module.exports = { generateToken, hashPassword };
