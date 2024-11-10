const Society = require("../models/societies.model");

const createSociety = async (data) => {
  const society = new Society(data);
  await society.save();
  return society;
};

const getAllSocieties = async () => {
  const societies = await Society.find();
  return societies;
};

module.exports = { createSociety, getAllSocieties };
