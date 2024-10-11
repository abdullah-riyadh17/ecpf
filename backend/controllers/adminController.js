const Admin = require('../models/Admin');

const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createAdmin };
