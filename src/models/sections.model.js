const sectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class_id: { type: mongoose.Types.ObjectId, ref: "Class" },
});

const Section = mongoose.model("Section", sectionSchema);
