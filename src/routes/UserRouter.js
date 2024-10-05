const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Định nghĩa route cho việc tạo người dùng
router.post('/', UserController.createUser); // Sử dụng POST cho việc tạo mới

module.exports = router;
