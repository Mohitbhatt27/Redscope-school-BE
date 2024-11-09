const express = require("express");
const SchoolRouter = express.Router();
const schoolController = require("../../controllers/school.controllers");

SchoolRouter.post("/", schoolController.createSchool);
SchoolRouter.get("/", schoolController.getSchools);
SchoolRouter.post("/classes", schoolController.createClass);
SchoolRouter.get("/classses/:school_id", schoolController.getClassesBySchool);
SchoolRouter.post("/classes/sections", schoolController.createSection);
SchoolRouter.get("/classes/sections", schoolController.getSectionsByClass);

module.exports = SchoolRouter;
