const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require('../middleware/authMiddleware');
 

// Định nghĩa route cho việc tạo người dùng
router.post('/create', ProductController.createProduct); // Sử dụng POST cho việc tạo mới
router.put('/update/:id',authMiddleWare, ProductController.updateProduct); 
router.get('/get-details/:id',ProductController.getDetailsProduct); 
router.delete('/delete/:id',ProductController.deleteProduct); 
router.get('/get-all',ProductController.getAllProduct); 
module.exports = router;
