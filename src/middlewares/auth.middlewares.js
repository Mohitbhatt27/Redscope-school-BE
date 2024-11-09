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

module.exports = {
  registerParentValidator,
  loginParentValidator,
};
