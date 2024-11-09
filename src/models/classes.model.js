const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school_id: { type: mongoose.Types.ObjectId, ref: "School", required: true },
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
