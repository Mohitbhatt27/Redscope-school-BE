const jwt = require("jsonwebtoken");
const Parent = require("../models/parents.model");
const { JWT_SECRET } = require("../config/server.config");
const registerParentValidator = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginParentValidator = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers["token"];

    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }

    // if token exists
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error("Token verification error:", error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired" });
      }
      return res.status(403).json({ error: "Invalid token" });
    }

    // if token is valid
    const parent = await Parent.findById(decodedToken.id);
    if (!parent) {
      return res.status(403).json({ error: "Parent not found, Invalid token" });
    }

    // if token is valid, attach parent to request object
    req.user = {
      _id: parent._id,
      name: parent.name,
      email: parent.email,
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({
      message: "Internal server error during authentication",
    });
  }
};

module.exports = {
  registerParentValidator,
  loginParentValidator,
  authenticateToken,
};
