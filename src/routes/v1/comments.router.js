const express = require("express");
const CommentRouter = express.Router();
const { authenticateToken } = require("../../middlewares/auth.middlewares");
const commentController = require("../../controllers/comment.controllers");

CommentRouter.post(
  ":/commentId/reply",
  authenticateToken,
  commentController.createReply
);
CommentRouter.get(
  ":/commentId/vote",
  authenticateToken,
  commentController.voteOnComment
);

module.exports = CommentRouter;
