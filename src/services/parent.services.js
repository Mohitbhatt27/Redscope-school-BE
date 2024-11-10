const Class = require("../models/classes.model");
const Parent = require("../models/parents.model");
const SocialCircleService = require("../services/socialCircle.services");
const updateParentDetails = async (parentData) => {
  const parent = await Parent.findById(parentData.parent_id);

  const clasS = await Class.findOne({
    name: parentData.class,
    school_id: parent.kid_school_id,
  });
  if (!clasS) {
    const newClass = await Class.create({
      name: parentData.clasS,
      school_id: parent.kid_school_id,
    });
    parentData.kid_class_id = newClass._id;
  } else {
    parentData.kid_class_id = clasS._id;
  }

  try {
    const updatedParent = await Parent.findOneAndUpdate(
      { _id: parentData.parent_id },
      { $set: parentData },
      { new: true }
    );

    const socialCircles = await SocialCircleService.createAutoSocialCircles(
      updatedParent._id
    );
    await SocialCircleService.addParentToSocialCircle(
      parent._id,
      socialCircles
    );

    // updating parent
    const ParentResponse = await Parent.findById(parent._id);

    return ParentResponse;
  } catch (error) {
    throw error;
  }
};

const getAllParents = async () => {
  try {
    const parents = await Parent.find({}).populate("social_circles");
    return parents;
  } catch (error) {
    throw error;
  }
};

const getParentById = async (parentId) => {
  try {
    const parent = await Parent.findById(parentId).populate("social_circles");
    return parent;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateParentDetails,
  getAllParents,
  getParentById,
};
