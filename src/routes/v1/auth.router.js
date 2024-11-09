const express = require("express");
const Authrouter = express.Router();
const authController = require("../../controllers/auth.controllers");
const authValidator = require("../../middlewares/auth.middlewares");

Authrouter.post(
  "/register",
  authValidator.registerParentValidator,
  authController.registerParent
);
Authrouter.post(
  "/login",
  authValidator.loginParentValidator,
  authController.loginParent
);

module.exports = Authrouter;
