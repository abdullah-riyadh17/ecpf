// routes/authRoutes.js
const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

// Route for admin login
router.post('/login', login);

module.exports = router;
