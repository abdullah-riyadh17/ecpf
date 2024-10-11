const Order = require('../models/Order');

const createOrder = async (req, res) => {
  const { customerName, mobileNumber, address, products, totalAmount } = req.body;

  try {
    const newOrder = new Order({ customerName, mobileNumber, address, products, totalAmount });
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const trackOrder = async (req, res) => {
  const { mobileNumber } = req.params;

  try {
    const orders = await Order.find({ mobileNumber }).sort({ createdAt: -1 }).limit(5); // Get last 5 orders
    res.json(orders.length > 0 ? orders : { message: 'No orders found for this mobile number' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createOrder, trackOrder };
