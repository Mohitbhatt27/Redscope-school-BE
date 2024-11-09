const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  kid_school_id: {
    type: mongoose.Types.ObjectId,
    ref: "School",
    required: true,
  },
  kid_class_id: { type: mongoose.Types.ObjectId, ref: "Class", required: true },
  kid_section_id: {
    type: mongoose.Types.ObjectId,
    ref: "Section",
    required: true,
  },
  society_id: { type: mongoose.Types.ObjectId, ref: "Society", default: null },
  social_circles: [{ type: mongoose.Types.ObjectId, ref: "SocialCircle" }],
});

const Parent = mongoose.model("Parent", parentSchema);

module.exports = Parent;
