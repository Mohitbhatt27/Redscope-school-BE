const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class_id: { type: mongoose.Types.ObjectId, ref: "Class", required: true },
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
