const express = require('express');
const router = express.Router();
const { createOrder, trackOrder } = require('../controllers/orderController');

// Route to create a new order
router.post('/', createOrder);

// Route to track an order by mobile number
router.get('/track/:mobileNumber', trackOrder);

module.exports = router;
