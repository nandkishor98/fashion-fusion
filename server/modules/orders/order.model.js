const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const { commonSchema } = require("../../utils/commonSchema");

const orderSchema = new Schema({
  id: { type: String, required: true, index: { unique: true } },
  amount: { type: Number, required: true },
  products: [
    {
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      amount: { type: Number, required: true },
      product: { type: ObjectId, ref: "Product", required: true },
    },
  ],
  paymentMethod: {
    type: String,
    enum: ["COD", "CC", "Paypal"],
    default: "COD",
    required: true,
  },
  payment: { type: String, default: "COD" },
  address: { type: String },
  buyer: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  ...commonSchema,
});

module.exports = model("Order", orderSchema);