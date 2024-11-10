const express = require("express");
const SocietyRouter = express.Router();

const societyController = require("../../controllers/society.controllers");

SocietyRouter.post("/", societyController.createSociety);
SocietyRouter.get("/", societyController.getAllSocieties);

module.exports = SocietyRouter;
