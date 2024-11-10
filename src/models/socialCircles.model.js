const mongoose = require("mongoose");

const socialCircleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["school", "class", "section", "society", "custom"],
    required: true,
  },
  parent: {
    type: mongoose.Types.ObjectId,
    refPath: "parentModel", // refpath references different models based on parentModel value
    default: null,
  },
  parentModel: {
    type: String,
    enum: ["School", "Class", "Section", "Society", null], // can reference any of these models
    default: null,
  },
  members: [{ type: mongoose.Types.ObjectId, ref: "Parent" }],
});

const SocialCircle = mongoose.model("SocialCircle", socialCircleSchema);

module.exports = SocialCircle;
