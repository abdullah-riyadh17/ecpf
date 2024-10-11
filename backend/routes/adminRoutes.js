const express = require('express');
const router = express.Router();
const { createAdmin } = require('../controllers/adminController');

// Route to create admin (this will be expanded later)
router.post('/register', createAdmin);

module.exports = router;
