const Model = require("./product.model");
const { ObjectId } = require("mongoose").Types;

const create = (payload) => {
  return Model.create(payload);
};

const list = async (limit, page, search) => {
  const pageNum = parseInt(page) || 1;
  const size = parseInt(limit) || 20;
  const { name, isArchived } = search;
  const query = [];
  if (name) {
    query.push({
      $match: {
        name: new RegExp(name, "gi"),
      },
    });
  }
  query.push(
    {
      $match: {
        isArchived: Boolean(isArchived) || false,
      },
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
            $skip: (pageNum - 1) * size,
          },
          {
            $limit: size,
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
    }
  );
  const response = await Model.aggregate(query).allowDiskUse(true);
  const newData = response[0];
  let { data, total } = newData;
  total = total || 0;
  return { data, total, limit, pageNum };
};

const getById = async (id) => {
  const result = await Model.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category_name",
      },
    },
    {
      $unwind: {
        path: "$category_name",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $addFields: {
        category_name: "$category_name.name",
      },
    },
  ]);
  if (result?.length === 0) return {};
  return result[0];
};

const updateById = (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const deleteById = (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

module.exports = { create, list, getById, updateById, deleteById };