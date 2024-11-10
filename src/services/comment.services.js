const Post = require("../models/posts.model");
const Comment = require("../models/comments.model");
const Parent = require("../models/parents.model");

const createComment = async (commentData) => {
  try {
    const parent = await Parent.findById(commentData.parent_id).populate(
      "social_circles"
    );
    if (!parent) {
      throw new Error("Parent not found");
    }
    const post = await Post.findById(commentData.post_id);
    if (!post) {
      throw new Error("Post not found");
    }
    if (!parent.social_circles.includes(post.social_circle_id)) {
      throw new Error("Parent does not belong to this social circle");
    }

    const comment = new Comment(commentData);
    await comment.save();
    post.comments.push(comment._id);
    await post.save();
    return comment;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw new Error("Failed to create comment");
  }
};

const getComments = async (postId) => {
  try {
    const comments = await Comment.find({ post_id: postId })
      .populate("parent_id")
      .populate("replies");
    return comments;
  } catch (error) {
    console.error("Error getting comments:", error);
    throw new Error("Failed to get comments");
  }
};

const createReply = async (commentData) => {
  try {
    const parent = await Parent.findById(commentData.parent_id).populate(
      "social_circles"
    );
    if (!parent) {
      throw new Error("Parent not found");
    }
    const comment = await Comment.findById(commentData.comment_id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    const post = await Post.findById(comment.post_id);
    if (!post) {
      throw new Error("Post not found");
    }
    if (!parent.social_circles.includes(post.social_circle_id)) {
      throw new Error("Parent does not belong to this social circle");
    }

    const reply = new Comment(commentData);
    await reply.save();
    comment.replies.push(reply._id);
    await comment.save();
    return reply;
  } catch (error) {
    console.error("Error creating reply:", error);
    throw new Error("Failed to create reply");
  }
};

const voteOnComment = async (commentId, parentId, voteType) => {
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    if (voteType === "upvote") {
      if (comment.likes.includes(parentId)) {
        comment.likes.pull(parentId);
      } else {
        comment.likes.push(parentId);
        comment.dislikes.pull(parentId);
      }
    } else if (voteType === "downvote") {
      if (comment.dislikes.includes(parentId)) {
        comment.dislikes.pull(parentId);
      } else {
        comment.dislikes.push(parentId);
        comment.likes.pull(parentId);
      }
    }
    await comment.save();
    return comment;
  } catch (error) {
    console.error("Error voting on comment:", error);
    throw new Error("Failed to vote on comment");
  }
};

module.exports = { createComment, getComments, createReply, voteOnComment };
