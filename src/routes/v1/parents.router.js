const express = require("express");
const { authenticateToken } = require("../../middlewares/auth.middlewares");
const ParentRouter = express.Router();
const parentController = require("../../controllers/parent.controllers");

/**
 * @swagger
 * tags:
 *   name: Parents
 *   description: Parent management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Parent:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the parent
 *         email:
 *           type: string
 *           description: The email of the parent
 *         password:
 *           type: string
 *           description: The password of the parent
 *         kid_school_id:
 *           type: string
 *           description: The ID of the child's school
 *         kid_class_id:
 *           type: string
 *           description: The ID of the child's class
 *         kid_section_id:
 *           type: string
 *           description: The ID of the child's section
 *         society_id:
 *           type: string
 *           description: The ID of the parent's society
 *         social_circles:
 *           type: array
 *           items:
 *             type: string
 *           description: List of IDs for social circles the parent belongs to
 *       example:
 *         name: "Parent16"
 *         email: "Parent16@gmail.com"
 *         password: "Parent16Password"
 *         kid_school_id: "60c72b2f5f1b2c001cf7b456"
 *         kid_class_id: "60c72b2f5f1b2c001cf7b457"
 *         kid_section_id: "60c72b2f5f1b2c001cf7b458"
 *         society_id: "60c72b2f5f1b2c001cf7b459"
 *         social_circles: ["60c72b2f5f1b2c001cf7b450", "60c72b2f5f1b2c001cf7b451"]
 */

/**
 * @swagger
 * /api/v1/parents/update:
 *   patch:
 *     summary: Update parent details when the child is promoted to a new class
 *     tags: [Parents]
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clasS:
 *                 type: string
 *                 description: The new class of the child
 *             example:
 *               clasS: "IX"
 *     responses:
 *       200:
 *         description: Parent details updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/parents:
 *   get:
 *     summary: Get a list of all parents
 *     tags: [Parents]
 *     responses:
 *       200:
 *         description: A list of parents
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Parent'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/parents/{parentId}:
 *   get:
 *     summary: Get parent details by parent ID
 *     tags: [Parents]
 *     parameters:
 *       - in: path
 *         name: parentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the parent to retrieve details for
 *     responses:
 *       200:
 *         description: Parent details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parent'
 *       404:
 *         description: Parent not found
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

ParentRouter.patch(
  "/update",
  authenticateToken,
  parentController.updateParentDetails
);

ParentRouter.get("/", parentController.getAllParents);

ParentRouter.get("/:parentId", parentController.getParentById);

module.exports = ParentRouter;
