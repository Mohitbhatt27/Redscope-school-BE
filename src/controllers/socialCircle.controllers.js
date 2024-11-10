const socialCircleService = require("../services/socialCircle.services");

const createParentInitiatedCircle = async (req, res) => {
  try {
    const circleData = {
      name: req.body.name,
      customAttributes: req.body.customAttributes,
      parentId: req.user._id,
    };
    const newCircle = await socialCircleService.createParentInitiatedCircle(
      circleData
    );
    res.status(201).json(newCircle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createParentInitiatedCircle,
};
