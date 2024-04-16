const express = require("express");
const router = express.Router();
const {
  placeOrder,
  getOrderHistory,
} = require("../controllers/ordersController");

router.post("/orders", placeOrder);
router.get("/orders/:userId", getOrderHistory);

module.exports = router;
