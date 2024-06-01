const { Order } = require("../models/Order");

const { Order } = require("../models/Order");
const User = require("../models/User"); // Import the User model

async function placeOrder(req, res) {
  const { email, products, shippingAddress } = req.body;
  try {
    // Find the user by email to get the userId
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract userId from the found user
    const userId = user._id;

    // Create the order
    const order = new Order({ userId, products, shippingAddress });
    const totalPrice = products.reduce(
      (acc, product) => acc + product.price,
      0
    );
    order.totalPrice = totalPrice;
    await order.save();

    // Update user's order history
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getOrderHistory(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("orders");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  placeOrder,
  getOrderHistory,
};
