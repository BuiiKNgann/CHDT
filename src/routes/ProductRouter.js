const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require('../middleware/authMiddleware');
 

// Định nghĩa route cho việc tạo người dùng
router.post('/create', ProductController.createProduct); // Sử dụng POST cho việc tạo mới
router.put('/update/:id',authMiddleWare, ProductController.updateProduct); 
router.get('/get-details/:id',ProductController.getDetailsProduct); 
router.delete('/delete/:id',authMiddleWare,ProductController.deleteProduct); 
router.get('/get-all',ProductController.getAllProduct); 
router.delete('/delete-many',authMiddleWare,ProductController.deleteMany); 
router.get('/get-all-type',ProductController.getAllType); 

module.exports = router;
