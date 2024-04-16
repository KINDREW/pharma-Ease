const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  totalPrice: Number,
  shippingAddress: String,
  status: { type: String, default: "Pending" },
  paymentStatus: { type: String, default: "Pending" },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order };
