const express = require("express");
const PostsRouter = express.Router();
const postController = require("../../controllers/post.controllers");
const commentController = require("../../controllers/comment.controllers");
const { authenticateToken } = require("../../middlewares/auth.middlewares");

PostsRouter.post(
  "/:postID/comments",
  authenticateToken,
  commentController.createComment
);
PostsRouter.get(
  "/:postID/comments",
  authenticateToken,
  commentController.getComments
);

PostsRouter.put("/:postId/vote", authenticateToken, postController.voteOnPost);

module.exports = PostsRouter;
