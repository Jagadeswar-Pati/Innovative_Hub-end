const express = require("express");
const Product = require("../models/Product.model");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

module.exports = router;
