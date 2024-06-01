const userService = require("../services/userService");

async function register(req, res) {
  try {
    await userService.register(req, res);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    await userService.login(req, res);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
};
