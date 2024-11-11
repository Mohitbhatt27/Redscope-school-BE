const express = require("express");
const PostsRouter = express.Router();
const postController = require("../../controllers/post.controllers");
const commentController = require("../../controllers/comment.controllers");
const { authenticateToken } = require("../../middlewares/auth.middlewares");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints for managing posts and comments on posts
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the post
 *         parent_id:
 *           type: string
 *           description: The ID of the parent who created the post
 *         social_circle_id:
 *           type: string
 *           description: The ID of the social circle the post belongs to
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *           description: List of comment IDs associated with the post
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: List of parent IDs who liked the post
 *         dislikes:
 *           type: array
 *           items:
 *             type: string
 *           description: List of parent IDs who disliked the post
 *       example:
 *         content: "This is a sample post content"
 *         parent_id: "60c72b2f5f1b2c001cf7b456"
 *         social_circle_id: "60c72b2f5f1b2c001cf7b451"
 *         comments: ["60c72b2f5f1b2c001cf7b452", "60c72b2f5f1b2c001cf7b453"]
 *         likes: ["60c72b2f5f1b2c001cf7b457"]
 *         dislikes: ["60c72b2f5f1b2c001cf7b458"]
 */

/**
 * @swagger
 * /api/v1/posts/{postID}/comments:
 *   post:
 *     summary: Create a comment on a specific post
 *     tags: [Posts]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to comment on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *             example:
 *               content: "This is a sample comment"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get comments on a specific post
 *     tags: [Posts]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: postID
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve comments for
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   commentID:
 *                     type: string
 *                   content:
 *                     type: string
 *                   parent_id:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                 example:
 *                   commentID: "60c72b2f5f1b2c001cf7b452"
 *                   content: "This is a sample comment"
 *                   parent_id: "60c72b2f5f1b2c001cf7b456"
 *                   createdAt: "2024-01-01T12:00:00Z"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/posts/{postId}/vote:
 *   put:
 *     summary: Vote on a post (like or dislike)
 *     tags: [Posts]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to vote on
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               voteType:
 *                 type: string
 *                 enum: [like, dislike]
 *                 description: Type of vote to apply to the post
 *             example:
 *               voteType: "like"
 *     responses:
 *       200:
 *         description: Vote registered successfully
 *       400:
 *         description: Invalid vote type
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     tokenAuth:
 *       type: apiKey
 *       in: header
 *       name: token
 */

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
