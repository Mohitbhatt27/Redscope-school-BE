const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    parent_id: { type: mongoose.Types.ObjectId, ref: "Parent" },
    social_circle_id: { type: mongoose.Types.ObjectId, ref: "SocialCircle" },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "Parent" }],
    dislikes: [{ type: mongoose.Types.ObjectId, ref: "Parent" }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
