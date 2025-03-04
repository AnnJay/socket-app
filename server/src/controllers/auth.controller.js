const User = require("../models/user.model");
const { generateToken, hashPassword } = require("../utils/auth.utils");

const signUp = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Заполните все поля" });
    }
    
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Длина пароля - минимум 6 символов" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Пользователь с таким email адресом уже существует",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      });
    } else {
      return res.status(400).json("Неправильно введены данные");
    }
  } catch (error) {
    console.log("Произошла ошибка при попытке создания нового пользователя");
    res.status(500).json({ message: "Internet Server Error" });
  }
};

const login = (req, res) => {
  res.send("login");
};

const logout = (req, res) => {
  res.send("logout");
};

const resetPassword = (req, res) => {
  res.send("forget-password");
};

module.exports = { login, logout, signUp, resetPassword };
