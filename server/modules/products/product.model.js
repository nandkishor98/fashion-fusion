const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const { commonSchema } = require("../../utils/commonSchema");

const productSchema = new Schema({
  name: { type: String, required: true },
  alias: [{ type: String, required: true, unique: true }],
  description: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: ObjectId, ref: "Category" },
  images: [{ type: String }],
  ...commonSchema,
});

module.exports = model("Product", productSchema);