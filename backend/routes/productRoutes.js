const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct } = require('../controllers/productController');

// Route to get all products
router.get('/', getAllProducts);

// Route to create a new product
router.post('/', createProduct);

module.exports = router;
