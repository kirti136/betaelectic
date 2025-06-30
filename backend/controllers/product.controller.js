const Product = require("../models/product.model.js");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price are required." });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(409).json({ message: "Product already exists." });
    }

    const newProduct = await Product.create({ name, price });

    res
      .status(201)
      .json({ message: "Product created successfully.", product: newProduct });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllProducts, createProduct };
