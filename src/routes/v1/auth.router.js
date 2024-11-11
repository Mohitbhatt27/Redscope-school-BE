const express = require("express");
const Authrouter = express.Router();
const authController = require("../../controllers/auth.controllers");
const authValidator = require("../../middlewares/auth.middlewares");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints for parent registration and login
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new parent
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the parent
 *               email:
 *                 type: string
 *                 description: Email of the parent
 *               password:
 *                 type: string
 *                 description: Password for the parent account
 *               school:
 *                 type: string
 *                 description: Name of the kid's school
 *               clasS:
 *                 type: string
 *                 description: Class of the kid
 *               section:
 *                 type: string
 *                 description: Section of the kid's class
 *               society:
 *                 type: string
 *                 description: Society name where the parent resides
 *           example:
 *             name: Parent22
 *             email: Parent22@gmail.com
 *             password: Parent22
 *             school: KV
 *             clasS: V
 *             section: B
 *             society: Vikas Nagar
 *     responses:
 *       201:
 *         description: Parent registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a parent
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the parent
 *               password:
 *                 type: string
 *                 description: Password of the parent
 *           example:
 *             email: Parent15@gmail.com
 *             password: Parent15
 *     responses:
 *       200:
 *         description: Parent logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated access
 *       400:
 *         description: Invalid email or password
 */

Authrouter.post(
  "/register",
  authValidator.registerParentValidator,
  authController.registerParent
);
Authrouter.post(
  "/login",
  authValidator.loginParentValidator,
  authController.loginParent
);

module.exports = Authrouter;
