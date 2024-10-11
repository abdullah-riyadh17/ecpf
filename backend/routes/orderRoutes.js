const express = require('express');
const router = express.Router();
const { createOrder, trackOrder } = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

// Route to create a new order (protected)
router.post('/', protect, createOrder);

// Route to track an order by mobile number
router.get('/track/:mobileNumber', trackOrder);

module.exports = router;
