const authServices = require("../services/auth.services");

const registerParent = async (req, res) => {
  try {
    const parent = await authServices.registerParent(req.body);
    res.status(201).json(parent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginParent = async (req, res) => {
  try {
    const token = await authServices.loginParent(req.body);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifySchoolId = async (req, res) => {};

module.exports = { registerParent, loginParent, verifySchoolId };
