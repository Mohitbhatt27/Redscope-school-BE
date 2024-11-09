const School = require("../models/schools.model");
const Class = require("../models/classes.model");
const Section = require("../models/sections.model");

const getSchools = async () => {
  try {
    const schools = await School.find();
    return schools;
  } catch (error) {
    throw error;
  }
};
const getClassesBySchool = async (schoolId) => {
  try {
    const classes = await Class.find({ school_id: schoolId });
    return classes;
  } catch (error) {
    throw error;
  }
};
const getSectionsByClass = async (classId) => {
  try {
    const sections = await Section.find({ class_id: classId });
    return sections;
  } catch (error) {
    throw error;
  }
};
const createSchool = async (schoolData) => {
  try {
    const school = await School.create(schoolData);
    return school;
  } catch (error) {
    throw error;
  }
};
const createClass = async (classData) => {
  try {
    const newclass = await Class.create(classData);
    return newclass;
  } catch (error) {
    throw error;
  }
};
const createSection = async (sectionData) => {
  try {
    const newsection = await Section.create(sectionData);
    return newsection;
  } catch (error) {
    throw error;
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
