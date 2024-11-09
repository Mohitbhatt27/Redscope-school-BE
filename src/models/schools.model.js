const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;
