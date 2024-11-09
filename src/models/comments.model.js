const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    post_id: { type: mongoose.Types.ObjectId, ref: "Post" },
    parent_id: { type: mongoose.Types.ObjectId, ref: "Parent" },
    replies: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "Parent" }],
    edited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
