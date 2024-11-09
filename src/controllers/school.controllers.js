const schoolServices = require("../services/school.services");

const getSchools = async (req, res) => {
  try {
    const schools = await schoolServices.getSchools();
    res.status(200).json(schools);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getClassesBySchool = async (req, res) => {
  try {
    const { school_id } = req.params;
    if (!school_id) {
      throw new Error("All fields are required");
    }
    const classes = await schoolServices.getClassesBySchool(school_id);
    res.status(200).json(classes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getSectionsByClass = async (req, res) => {
  try {
    const { class_id } = req.body;
    if (!class_id) {
      throw new Error("All fields are required");
    }
    const sections = await schoolServices.getSectionsByClass(class_id);
    res.status(200).json(sections);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createClass = async (req, res) => {
  try {
    const { name, school_id } = req.body;
    if (!name || !school_id) {
      throw new Error("All fields are required");
    }
    const newClass = await schoolServices.createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createSection = async (req, res) => {
  try {
    const { name, class_id } = req.body;
    if (!name || !class_id) {
      throw new Error("All fields are required");
    }
    const newSection = await schoolServices.createSection(req.body);
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const createSchool = async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name || !address) {
      throw new Error("All fields are required");
    }
    const newSchool = await schoolServices.createSchool(req.body);
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSchools,
  getClassesBySchool,
  getSectionsByClass,
  createClass,
  createSection,
  createSchool,
};
