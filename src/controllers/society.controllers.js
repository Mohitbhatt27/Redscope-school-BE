const societyService = require("../services/society.services");

const createSociety = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new Error("All fields are required");
    }
    const society = await societyService.createSociety(req.body);
    res.status(201).json(society);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllSocieties = async (req, res) => {
  try {
    const societies = await societyService.getAllSocieties();
    res.json(societies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createSociety, getAllSocieties };
