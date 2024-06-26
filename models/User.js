const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: { type: String, unique: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
