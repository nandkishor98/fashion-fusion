const Model = require("./user.model");

const create = (payload) => {
  return Model.create(payload);
};

const list = () => {
  return Model.find();
};

const getById = (id) => {
  return Model.findOne({ _id: id });
};

module.exports = { create, getById, list };