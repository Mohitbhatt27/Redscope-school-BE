const express = require("express");
const SocialCircleRouter = express.Router();
const postController = require("../../controllers/post.controllers");
const socialCircleController = require("../../controllers/socialCircle.controllers");
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
SocialCircleRouter.post(
  "/parent-initiated-circles",
  authenticateToken,
  socialCircleController.createParentInitiatedCircle
);

module.exports = SocialCircleRouter;
