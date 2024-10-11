const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res) => {
  const { name, mobileNumber, address, products } = req.body;

  if (!name || !mobileNumber || !address || !products || products.length === 0) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOrder = new Order({
      name,
      mobileNumber,
      address,
      products,
      status: 'pending', // Default order status is 'pending'
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track orders by mobile number (for customers)
const trackOrderByMobile = async (req, res) => {
  const { mobileNumber } = req.params;

  try {
    const orders = await Order.find({
      mobileNumber,
      createdAt: { $gte: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) }, // Last 15 days
    });

    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: 'No orders found for this mobile number' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order delivery status (for admin)
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'accepted', 'sent for delivery', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders within a date range and export to Excel (for admin)
const getOrdersByDateRange = async (req, res) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start and end date are required' });
  }

  try {
    const orders = await Order.find({
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    if (orders.length > 0) {
      // TODO: Add Excel generation logic here
      res.status(200).json(orders);
    } else {
      res.status(404).json({ message: 'No orders found for the selected date range' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order (for admin)
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (deletedOrder) {
      res.status(200).json({ message: 'Order deleted successfully' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  trackOrderByMobile,
  updateOrderStatus,
  getOrdersByDateRange,
  deleteOrder,
};
