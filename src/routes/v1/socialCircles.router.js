const express = require("express");
const SocialCircleRouter = express.Router();
const postController = require("../../controllers/post.controllers");
const { authenticateToken } = require("../../middlewares/auth.middlewares");

SocialCircleRouter.post(
  "/:socialCircleId/posts",
  authenticateToken,
  postController.createPost
);
SocialCircleRouter.get(
  "/:socialCircleId/posts",
  authenticateToken,
  postController.getPosts
);

module.exports = SocialCircleRouter;
