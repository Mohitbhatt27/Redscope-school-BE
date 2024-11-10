const Post = require("../models/posts.model");
const Comment = require("../models/comments.model");
const Parent = require("../models/parents.model");

const createPost = async (postData) => {
  try {
    const parent = await Parent.findById(postData.parent_id).populate(
      "social_circles"
    );
    if (!parent) {
      throw new Error("Parent not found");
    }

    if (
      !parent.social_circles.some(
        (circle) =>
          circle._id.toString() === postData.social_circle_id.toString()
      )
    ) {
      throw new Error("Parent does not belong to this social circle");
    }

    const post = new Post(postData);
    await post.save();
    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }
};

const getPosts = async (socialCircleId) => {
  try {
    const posts = await Post.find({ social_circle_id: socialCircleId })
      .populate("parent_id")
      .populate("comments");
    return posts;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw new Error("Failed to get posts");
  }
};

const voteOnPost = async (postId, parentId, voteType) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    if (voteType === "upvote") {
      if (post.likes.includes(parentId)) {
        post.likes.pull(parentId);
      } else {
        post.likes.push(parentId);
        post.dislikes.pull(parentId);
      }
    } else if (voteType === "downvote") {
      if (post.dislikes.includes(parentId)) {
        post.dislikes.pull(parentId);
      } else {
        post.dislikes.push(parentId);
        post.likes.pull(parentId);
      }
    }
    await post.save();
    return post;
  } catch (error) {
    console.error("Error voting on post:", error);
    throw new Error("Failed to vote on post");
  }
};

module.exports = { createPost, getPosts, voteOnPost };
