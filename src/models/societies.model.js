const mongoose = require("mongoose");

const societySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Society = mongoose.model("Society", societySchema);

module.exports = Society;
