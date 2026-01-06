const express = require("express");
const Order = require("../models/Order.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const orders = await Order.find()
    .populate("user")
    .populate("items.product")
    .sort({ createdAt: -1 });

  res.json(orders);
});

module.exports = router;
