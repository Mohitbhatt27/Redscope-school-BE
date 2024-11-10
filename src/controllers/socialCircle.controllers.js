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

const joinSocialCircle = async (req, res) => {
  try {
    const circleId = req.params.socialCircleId;
    const parentId = req.user._id;
    const socialCircle = await socialCircleService.joinSocialCircle(
      circleId,
      parentId
    );
    res.json(socialCircle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createParentInitiatedCircle,
  joinSocialCircle,
};
