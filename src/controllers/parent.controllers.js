const parentService = require("../services/parent.services");
const updateParentDetails = async (req, res) => {
  try {
    const parentData = {
      parent_id: req.user._id,
      clasS: req.body.clasS,
    };

    const parent = await parentService.updateParentDetails(parentData);
    res.status(201).json(parent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllParents = async (req, res) => {
  try {
    const parents = await parentService.getAllParents();
    res.status(200).json(parents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getParentById = async (req, res) => {
  try {
    const parent = await parentService.getParentById(req.params.parentId);
    res.status(200).json(parent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  updateParentDetails,
  getAllParents,
  getParentById,
};
