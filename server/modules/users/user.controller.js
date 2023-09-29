const bcrypt = require("bcrypt");

const Model = require("./user.model");

const create = (payload) => {
  return Model.create(payload);
};

const list = async (size, page, search) => {
  /*
  Basic pagination Implementation
  return Model.find().skip().limit();
   */
  const pageNum = parseInt(page) || 1;
  const limit = parseInt(size) || 5;
  const { name, role } = search;
  const query = {};
  if (name) {
    query.name = new RegExp(name, "gi");
  }
  if (role) {
    query.roles = [role];
  }
  const response = await Model.aggregate([
    {
      $match: query,
    },
    {
      $sort: {
        created_at: 1,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (pageNum - 1) * limit,
          },
          {
            $limit: limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        data: 1,
        total: 1,
      },
    },
    {
      $project: {
        "data.password": 0,
      },
    },
  ]).allowDiskUse(true);
  const newData = response[0];
  let { data, total } = newData;
  total = total || 0;
  return { data, total, limit, pageNum };
};

const getById = (id) => {
  return Model.findOne({ _id: id });
};

const updateById = async (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const changePassword = async (id, oldPassword, newPassword) => {
  // check if user exists
  const user = await Model.findOne({ _id: id }).select("+password");
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