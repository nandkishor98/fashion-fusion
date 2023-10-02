const Model = require("./order.model");
const { v4: uuidv4 } = require("uuid");
const productModel = require("../products/product.model");

const create = (payload) => {
  payload.id = uuidv4();
  // Decrease product count from product model
  const products = payload?.products;
  products.map(async (product) => {
    const { product: id, quantity } = product;
    const productInfo = await productModel.findOne({ _id: id });
    if (!productInfo) throw new Error("Product not found");
    await productModel.findOneAndUpdate(
      { _id: id },
      { quantity: productInfo?.quantity - quantity },
      { new: true }
    );
  });
  return Model.create(payload);
};

const list = async (limit, page, search) => {
  const pageNum = parseInt(page) || 1;
  const size = parseInt(limit) || 5;
  const { id, isArchived } = search;
  const query = [];
  if (id) {
    query.push({
      $match: {
        id: new RegExp(id, "gi"),
      },
    });
  }
  query.push(
    {
      $match: {
        isArchived: isArchived || false,
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
  return { data, total, limit: size, page: pageNum };
};

const getById = (id) => {
  return Model.findOne({ id });
};

const updateById = (id, payload) => {
  // Ignoring the quantity update
  const { products, ...rest } = payload;
  return Model.findOneAndUpdate({ id }, rest, { new: true });
};

const deleteById = async (id, payload) => {
  // get details of order
  const order = await Model.findOne({ id });
  // Increase product count from product model
  const products = order?.products;
  products.map(async (product) => {
    const { product: id, quantity } = product;
    const productInfo = await productModel.findOne({ _id: id });
    if (!productInfo) throw new Error("Product not found");
    await productModel.findOneAndUpdate(
      { _id: id },
      {
        quantity: productInfo?.quantity + quantity,
        updated_by: payload.updated_by,
        updated_at: new Date(),
      },
      { new: true }
    );
  });
  return Model.deleteOne({ id });
};

const approve = (id, payload) => {
  return Model.findOneAndUpdate({ id }, payload, { new: true });
};

module.exports = { approve, create, deleteById, getById, list, updateById };