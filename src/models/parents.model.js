const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  kid_school_id: { type: mongoose.Types.ObjectId, ref: "School" },
  kid_class_id: { type: mongoose.Types.ObjectId, ref: "Class" },
  kid_section_id: { type: mongoose.Types.ObjectId, ref: "Section" },
  society_id: { type: mongoose.Types.ObjectId, ref: "Society", default: null },
  social_circles: [{ type: mongoose.Types.ObjectId, ref: "SocialCircle" }],
});

const Parent = mongoose.model("Parent", parentSchema);
