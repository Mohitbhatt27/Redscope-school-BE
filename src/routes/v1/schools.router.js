const express = require("express");
const SchoolRouter = express.Router();
const schoolController = require("../../controllers/school.controllers");

/**
 * @swagger
 * tags:
 *   name: Schools
 *   description: School management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     School:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the school
 *         address:
 *           type: string
 *           description: The address of the school
 *       example:
 *         name: "KVS School"
 *         address: "123 Main St, City, Country"
 *     Class:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the class
 *         school_id:
 *           type: string
 *           description: The ID of the school the class belongs to
 *       example:
 *         name: "V"
 *         school_id: "60c72b2f5f1b2c001cf7b456"
 *     Section:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the section
 *         class_id:
 *           type: string
 *           description: The ID of the class the section belongs to
 *       example:
 *         name: "B"
 *         class_id: "60c72b2f5f1b2c001cf7b457"
 */

/**
 * @swagger
 * /api/v1/schools:
 *   post:
 *     summary: Create a new school
 *     tags: [Schools]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/School'
 *     responses:
 *       201:
 *         description: School created successfully
 *       400:
 *         description: Invalid input
 *
 *   get:
 *     summary: Get a list of schools
 *     tags: [Schools]
 *     responses:
 *       200:
 *         description: A list of schools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/schools/classes:
 *   post:
 *     summary: Create a new class
 *     tags: [Schools]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: Class created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/v1/schools/classes/{school_id}:
 *   get:
 *     summary: Get classes by school ID
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: school_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the school to retrieve classes for
 *     responses:
 *       200:
 *         description: A list of classes for the specified school
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 *       404:
 *         description: School not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/schools/classes/sections:
 *   post:
 *     summary: Create a new section
 *     tags: [Schools]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Section'
 *     responses:
 *       201:
 *         description: Section created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/v1/schools/classes/sections:
 *   get:
 *     summary: Get sections by class ID
 *     tags: [Schools]
 *     parameters:
 *       - in: query
 *         name: class_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the class to retrieve sections for
 *     responses:
 *       200:
 *         description: A list of sections for the specified class
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Section'
 *       404:
 *         description: Class not found
 *       500:
 *         description: Server error
 */

SchoolRouter.post("/", schoolController.createSchool);
SchoolRouter.get("/", schoolController.getSchools);
SchoolRouter.post("/classes", schoolController.createClass);
SchoolRouter.get("/classses/:school_id", schoolController.getClassesBySchool);
SchoolRouter.post("/classes/sections", schoolController.createSection);
SchoolRouter.get("/classes/sections", schoolController.getSectionsByClass);

module.exports = SchoolRouter;
