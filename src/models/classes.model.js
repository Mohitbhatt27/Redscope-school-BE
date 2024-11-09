const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school_id: { type: mongoose.Types.ObjectId, ref: "School" },
});

const Class = mongoose.model("Class", classSchema);
