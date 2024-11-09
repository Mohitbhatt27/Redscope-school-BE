const Parent = require("../models/parents.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/server.config");

const registerParent = async (parentData) => {
  try {
    const hashedPassword = await bcrypt.hash(parentData.password, 12);
    parentData.password = hashedPassword;
    const parent = await Parent.create(parentData);
    return parent;
  } catch (error) {
    console.log("Something went wrong while registering parent", error.message);
    throw new Error("Registration failed");
  }
};

const loginParent = async (loginData) => {
  try {
    const parent = await Parent.findOne({ email: loginData.email });
    if (!parent) {
      throw new Error("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(loginData.password, parent.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    const token = jwt.sign(
      {
        id: parent._id,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return token;
  } catch (error) {
    console.log("Something went wrong while logging in parent", error.message);
    throw new Error("Login failed");
  }
};

const verifySchoolId = async () => {};

module.exports = { registerParent, loginParent, verifySchoolId };
