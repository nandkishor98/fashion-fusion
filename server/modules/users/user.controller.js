const bcrypt = require("bcrypt");

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

const updateById = async (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const changePassword = async (id, oldPassword, newPassword) => {
  // check if user exists
  const user = await Model.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  // check if old password hash matches to existing
  const isValidPw = await bcrypt.compare(oldPassword, user?.password);
  if (!isValidPw) throw new Error("Password invalid");
  // Create new password hash
  const newPass = await bcrypt.hash(newPassword, +process.env.SALT_ROUND);
  //update the user password
  return Model.findOneAndUpdate(
    { _id: user?._id },
    { password: newPass },
    { new: true }
  );
};

const resetPassword = async (id, payload) => {
  // check if user exists
  const user = await Model.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  // Create new password hash
  const newPass = await bcrypt.hash(payload.password, +process.env.SALT_ROUND);
  //update the user password
  return Model.findOneAndUpdate(
    { _id: user?._id },
    { ...payload, password: newPass },
    { new: true }
  );
};

const block = async (id, payload) => {
  // check if user exists
  const user = await Model.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const archive = async (id, payload) => {
  // check if user exists
  const user = await Model.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

module.exports = {
  archive,
  block,
  changePassword,
  create,
  getById,
  list,
  resetPassword,
  updateById,
};