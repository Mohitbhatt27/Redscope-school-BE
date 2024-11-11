const express = require("express");
const SocialCircleRouter = express.Router();
const postController = require("../../controllers/post.controllers");
const socialCircleController = require("../../controllers/socialCircle.controllers");
const { authenticateToken } = require("../../middlewares/auth.middlewares");

/**
 * @swagger
 * tags:
 *   name: Social Circles
 *   description: Endpoints for managing social circles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SocialCircle:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the social circle
 *         type:
 *           type: string
 *           enum: [school, class, section, society, custom]
 *           description: The type of the social circle
 *         parent:
 *           type: string
 *           description: The ID of the parent entity (e.g., School, Class, etc.)
 *         parentModel:
 *           type: string
 *           enum: [School, Class, Section, Society, null]
 *           description: The model referenced by the parent field
 *         members:
 *           type: array
 *           items:
 *             type: string
 *             description: IDs of members in the social circle
 *       required:
 *         - name
 *         - type
 *       example:
 *         name: "Brigade Society Bus No. 92"
 *         type: "custom"
 *         parent: "60b8a0c1e79e1d3f9c8d4a31"
 *         parentModel: "Society"
 *         members: ["60b8a0c1e79e1d3f9c8d4a31", "60b8a0c1e79e1d3f9c8d4a32"]

 *     Post:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: Content of the post
 *       required:
 *         - content
 *       example:
 *         content: "Kids getting sick after eating lunch again"
 */

/**
 * @swagger
 * /api/v1/social-circles/parent-initiated-circles:
 *   post:
 *     summary: Create a parent-initiated social circle
 *     tags: [Social Circles]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the social circle
 *               customAttributes:
 *                 type: object
 *                 properties:
 *                   busNumber:
 *                     type: integer
 *                     description: Number of the bus
 *                   route:
 *                     type: string
 *                     description: Route description
 *             required:
 *               - name
 *               - customAttributes
 *             example:
 *               name: "Brigade Society Bus No. 92"
 *               customAttributes:
 *                 busNumber: 92
 *                 route: "Main Road"
 *     responses:
 *       201:
 *         description: Social circle created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/social-circles/{socialCircleId}/join:
 *   post:
 *     summary: Join a social circle
 *     tags: [Social Circles]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: socialCircleId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the social circle to join
 *     responses:
 *       200:
 *         description: Successfully joined the social circle
 *       404:
 *         description: Social circle not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/social-circles/{socialCircleId}/posts:
 *   post:
 *     summary: Create a post in a social circle
 *     tags: [Social Circles]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: socialCircleId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the social circle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post created successfully
 *       404:
 *         description: Social circle not found
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all posts in a social circle
 *     tags: [Social Circles]
 *     security:
 *       - tokenAuth: []
 *     parameters:
 *       - in: path
 *         name: socialCircleId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the social circle
 *     responses:
 *       200:
 *         description: A list of posts in the social circle
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: Social circle not found
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

SocialCircleRouter.post(
  "/parent-initiated-circles",
  authenticateToken,
  socialCircleController.createParentInitiatedCircle
);
SocialCircleRouter.post(
  "/:socialCircleId/join",
  authenticateToken,
  socialCircleController.joinSocialCircle
);
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
