const express = require("express");
const router = express.Router();
const productService = require("../services/productService");

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createProduct(req, res) {
  try {
    const product = await productService.addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

router.get("/", getAllProducts);
router.post("/", createProduct);

module.exports = router;
