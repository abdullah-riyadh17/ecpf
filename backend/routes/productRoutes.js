// routes/productRoutes.js
const express = require('express');
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify the folder to save uploaded files

const router = express.Router();

// Define routes
router.post('/', upload.single('image'), addProduct); // For adding a product
router.get('/', getAllProducts); // For getting all products
router.get('/:id', getProductById); // For getting a product by ID
router.put('/:id', upload.single('image'), updateProduct); // For updating a product
router.delete('/:id', deleteProduct); // For deleting a product

module.exports = router;
