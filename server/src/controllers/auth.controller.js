const authController = {
  signUp: (req, res) => {
    res.send("signup");
  },
  login: (req, res) => {
    res.send("login");
  },
  logout: (req, res) => {
    res.send("logout");
  },
  resetPassword: (req, res) => {
    res.send("forget-password");
  },
};

module.exports = authController;
