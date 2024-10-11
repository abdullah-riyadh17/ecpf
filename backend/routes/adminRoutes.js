const express = require('express');
const router = express.Router();
const { createAdmin, loginAdmin } = require('../controllers/adminController');

// Route to create admin
router.post('/register', createAdmin);

// Route to login admin
router.post('/login', loginAdmin);

module.exports = router;
