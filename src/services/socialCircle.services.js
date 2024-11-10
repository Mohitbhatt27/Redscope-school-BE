const Parent = require("../models/parents.model");
const SocialCircle = require("../models/socialCircles.model");

const createAutoSocialCircles = async (parentId) => {
  try {
    const parent = await Parent.findById(parentId)
      .populate("kid_school_id")
      .populate("kid_class_id")
      .populate("kid_section_id");
    if (!parent) {
      throw new Error("Parent not found");
    }

    const socialCircles = [];

    // Create a school social circle
    let schoolCircle = await SocialCircle.findOne({
      name: `${parent.kid_school_id.name} School}`,
      type: "school",
      parent: parent.kid_school_id,
    });

    if (!schoolCircle) {
      schoolCircle = new SocialCircle({
        name: `${parent.kid_school_id.name} School}`,
        type: "school",
        parent: parent.kid_school_id,
        parentModel: "School",
      });
      await schoolCircle.save();
    }
    socialCircles.push(schoolCircle);

    // Create a class social circle
    let classCircle = await SocialCircle.findOne({
      name: `Class ${parent.kid_class_id.name}, ${parent.kid_school_id.name} School`,
      type: "class",
      parent: parent.kid_class_id,
    });

    if (!classCircle) {
      classCircle = new SocialCircle({
        name: `Class ${parent.kid_class_id.name}, ${parent.kid_school_id.name} School`,
        type: "class",
        parent: parent.kid_class_id,
        parentModel: "Class",
      });
      await classCircle.save();
    }
    socialCircles.push(classCircle);

    // Create a section social circle
    let sectionCircle = await SocialCircle.findOne({
      name: `Section ${parent.kid_section_id.name}, Class ${parent.kid_class_id.name}, ${parent.kid_school_id.name} School`,
      type: "section",
      parent: parent.kid_section_id,
    });

    if (!sectionCircle) {
      sectionCircle = new SocialCircle({
        name: `Section ${parent.kid_section_id.name}, Class ${parent.kid_class_id.name}, ${parent.kid_school_id.name} School`,
        type: "section",
        parent: parent.kid_section_id,
        parentModel: "Section",
      });
      await sectionCircle.save();
    }
    socialCircles.push(sectionCircle);

    // Create a society social circle if the parent has disclosed their society
    if (parent.society_id) {
      const parentExtendedDetails = await Parent.findById(parentId).populate(
        "society_id"
      );
      let societyCircle = await SocialCircle.findOne({
        name: `${parentExtendedDetails.society_id.name} Society`,
        type: "society",
        parent: parentExtendedDetails.society_id,
      });
      if (!societyCircle) {
        societyCircle = new SocialCircle({
          name: `${parentExtendedDetails.society_id.name} Society`,
          type: "society",
          parent: parentExtendedDetails.society_id,
          parentModel: "Society",
        });
        await societyCircle.save();
      }

      // Create a society, school circle

      let societySchoolCircle = await SocialCircle.findOne({
        name: `${parentExtendedDetails.society_id.name} Society, ${parent.kid_school_id.name} School`,
        type: "custom",
        parent: parent.kid_school_id,
      });

      if (!societySchoolCircle) {
        societySchoolCircle = new SocialCircle({
          name: `${parentExtendedDetails.society_id.name} Society, ${parent.kid_school_id.name} School`,
          type: "custom",
          parent: parent.kid_school_id,
          parentModel: "School",
        });
        await societySchoolCircle.save();
      }

      socialCircles.push(societyCircle, societySchoolCircle);
    }

    return socialCircles;
  } catch (error) {
    console.log(
      "Something went wrong while creating social circles",
      error.message
    );
    throw new Error("Failed to create social circles");
  }
};

const addParentToSocialCircle = async (parentId, socialCircles) => {
  try {
    for (const socialCircle of socialCircles) {
      if (!socialCircle.members.includes(parentId)) {
        socialCircle.members.push(parentId);
        await socialCircle.save();
      }

      // Add social circles to parent's social circles array
      const parent = await Parent.findById(parentId);
      if (parent) {
        socialCircles.forEach((socialCircle) => {
          if (!parent.social_circles.includes(socialCircle._id)) {
            parent.social_circles.push(socialCircle._id);
          }
        });
        await parent.save();
      }
    }
  } catch (error) {
    console.log(
      "Something went wrong while adding parent to social circle",
      error.message
    );
    throw new Error("Failed to add parent to social circle");
  }
};

const createParentInitiatedCircle = async (circleData) => {
  try {
    const parent = await Parent.findById(circleData.parentId);
    if (!parent) {
      throw new Error("Parent not found");
    }

    const newCircle = new SocialCircle({
      name: circleData.name,
      type: "custom",
      customAttributes: circleData.customAttributes,
      parent: circleData.parentId,
    });
    await newCircle.save();

    // Add parent to the circle
    parent.social_circles.push(newCircle._id);
    await parent.save();

    return newCircle;
  } catch (error) {
    console.error("Error creating parent-initiated circle:", error);
    throw new Error("Failed to create parent-initiated circle");
  }
};

module.exports = {
  createAutoSocialCircles,
  addParentToSocialCircle,
  createParentInitiatedCircle,
};
