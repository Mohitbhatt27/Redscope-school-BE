const express = require("express");
const { authenticateToken } = require("../../middlewares/auth.middlewares");
const ParentRouter = express.Router();
const parentController = require("../../controllers/parent.controllers");

ParentRouter.patch(
  "/update",
  authenticateToken,
  parentController.updateParentDetails
);

ParentRouter.get("/", parentController.getAllParents);

ParentRouter.get("/:parentId", parentController.getParentById);

module.exports = ParentRouter;
