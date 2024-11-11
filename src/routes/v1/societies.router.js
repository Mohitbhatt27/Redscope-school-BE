const express = require("express");
const SocietyRouter = express.Router();

const societyController = require("../../controllers/society.controllers");
/**
 * @swagger
 * tags:
 *   name: Societies
 *   description: Endpoints for managing societies
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Society:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the society
 *       required:
 *         - name
 *       example:
 *         name: "Green Valley Society"
 */

/**
 * @swagger
 * /api/v1/societies:
 *   post:
 *     summary: Create a new society
 *     tags: [Societies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Society'
 *     responses:
 *       201:
 *         description: Society created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get a list of all societies
 *     tags: [Societies]
 *     responses:
 *       200:
 *         description: A list of societies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Society'
 *       500:
 *         description: Server error
 */

SocietyRouter.post("/", societyController.createSociety);
SocietyRouter.get("/", societyController.getAllSocieties);

module.exports = SocietyRouter;
