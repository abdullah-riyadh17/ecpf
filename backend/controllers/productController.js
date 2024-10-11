// productController.js
const Product = require('../models/Product');
const { cloudinary } = require('../config/cloudinaryConfig');

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, description, category, price, discountPrice } = req.body;

        // Check if there is an image uploaded
        let imageUrl;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url; // Get the uploaded image URL
        }

        // Create new product
        const newProduct = new Product({
            name,
            description,
            category,
            price,
            discountPrice,
            imageUrl // Save the Cloudinary image URL
        });

        const product = await newProduct.save();
        res.status(201).json({ success: true, message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add product", error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to retrieve products", error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to retrieve product", error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { name, description, category, price, discountPrice } = req.body;

        // Check if a new image is uploaded
        let updatedImageUrl;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updatedImageUrl = result.secure_url; // Get the uploaded image URL
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                category,
                price,
                discountPrice,
                imageUrl: updatedImageUrl || req.body.imageUrl // Update the image URL if a new one is uploaded
            },
            { new: true } // return the updated product
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update product", error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Optionally, you can delete the image from Cloudinary
        if (deletedProduct.imageUrl) {
            const imagePublicId = deletedProduct.imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imagePublicId);
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete product", error: error.message });
    }
};
