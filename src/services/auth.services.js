const Parent = require("../models/parents.model");
const SocialCircleService = require("../services/socialCircle.services");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/server.config");
const School = require("../models/schools.model");
const Class = require("../models/classes.model");
const Section = require("../models/sections.model");
const Society = require("../models/societies.model");

const registerParent = async (parentData) => {
  try {
    const { name, email, password, school, clasS, section, society } =
      parentData;

    const hashedPassword = await bcrypt.hash(parentData.password, 12);
    parentData.password = hashedPassword;

    const schoolId = await School.findOne({ name: school });
    if (!schoolId) {
      const newSchool = await School.create({ name: school });
      parentData.kid_school_id = newSchool._id;
    } else {
      parentData.kid_school_id = schoolId._id;
    }

    const classId = await Class.findOne({
      name: clasS,
      school_id: parentData.kid_school_id,
    });
    if (!classId) {
      const newClass = await Class.create({
        name: clasS,
        school_id: parentData.kid_school_id,
      });
      parentData.kid_class_id = newClass._id;
    } else {
      parentData.kid_class_id = classId._id;
    }

    const sectionId = await Section.findOne({ name: section });
    if (!sectionId) {
      const newSection = await Section.create({
        name: section,
        class_id: parentData.kid_class_id,
      });
      parentData.kid_section_id = newSection._id;
    } else {
      parentData.kid_section_id = sectionId._id;
    }

    if (society) {
      const societyId = await Society.findOne({ name: society });
      if (!societyId) {
        const newSociety = await Society.create({ name: society });
        parentData.society_id = newSociety._id;
      } else {
        parentData.society_id = societyId._id;
      }
    }

    const parent = await Parent.create(parentData);

    //create social circles for the parent
    const socialCircles = await SocialCircleService.createAutoSocialCircles(
      parent._id
    );

    //Add parent to social circles
    await SocialCircleService.addParentToSocialCircle(
      parent._id,
      socialCircles
    );

    // updating parent
    const updatedParent = await Parent.findById(parent._id);

    return updatedParent;
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

module.exports = { registerParent, loginParent };
