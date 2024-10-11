const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price, category, discountPrice, imageUrl } = req.body;

  try {
    const newProduct = new Product({ name, description, price, category, discountPrice, imageUrl });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllProducts, createProduct };
