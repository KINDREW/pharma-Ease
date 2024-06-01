const redisClient = require("../redisClient");
const Product = require("../models/Product");
const PRODUCT_CACHE_KEY = "all_products";

async function getAllProducts() {
  try {
    // Check if products are cached
    const cachedProducts = await redisClient.get(PRODUCT_CACHE_KEY);
    if (cachedProducts) {
      console.log("Fetching products from cache");
      return JSON.parse(cachedProducts);
    }

    // If not cached, fetch from database
    console.log("Fetching products from database");
    const products = await Product.find();

    // Cache the products
    await redisClient.set(
      PRODUCT_CACHE_KEY,
      JSON.stringify(products),
      "EX",
      3600
    ); // Cache for 1 hour

    return products;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
}

async function addProduct(productDto) {
  try {
    // Add product to the database
    const product = new Product(productDto);
    await product.save();

    // Invalidate the cache
    await redisClient.del(PRODUCT_CACHE_KEY);

    return product;
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
  addProduct,
};
