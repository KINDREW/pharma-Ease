const { Product } = require("../models/Product");

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function createProduct(req, res) {
  try {
    const { name, description, price, quantity, category } = req.body;
    const product = new Product({
      name,
      description,
      price,
      quantity,
      category,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getAllProducts,
  createProduct,
};
