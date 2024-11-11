const express = require("express");
const CommentRouter = express.Router();
const { authenticateToken } = require("../../middlewares/auth.middlewares");
const commentController = require("../../controllers/comment.controllers");

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Endpoints for commenting and voting on comments
 */

/**
 * @swagger
 * /api/v1/comments/{commentId}/reply:
 *   post:
 *     summary: Reply to a comment
 *     tags: [Comment]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token received after logging in
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to reply to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the reply
 *           example:
 *             content: "This is a reply to the comment."
 *     responses:
 *       201:
 *         description: Reply created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

/**
 * @swagger
 * /api/v1/comments/{commentId}/vote:
 *   put:
 *     summary: Vote on a comment
 *     tags: [Comment]
 *     parameters:
 *       - in: header
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token received after logging in
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to vote on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               voteType:
 *                 type: string
 *                 enum: [upvote, downvote]
 *                 description: Type of vote
 *           example:
 *             voteType: upvote
 *     responses:
 *       200:
 *         description: Vote cast successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Invalid input or vote type
 *       401:
 *         description: Unauthorized - missing or invalid token
 */

CommentRouter.post(
  "/:commentId/reply",
  authenticateToken,
  commentController.createReply
);

CommentRouter.put(
  "/:commentId/vote",
  authenticateToken,
  commentController.voteOnComment
);

module.exports = CommentRouter;
