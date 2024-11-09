const socialCircleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  parent_circle_id: {
    type: mongoose.Types.ObjectId,
    ref: "SocialCircle",
    default: null,
  },
  members: [{ type: mongoose.Types.ObjectId, ref: "Parent" }],
});

const SocialCircle = mongoose.model("SocialCircle", socialCircleSchema);
