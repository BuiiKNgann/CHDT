const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleware');

// Định nghĩa route cho việc tạo người dùng
router.post('/sign-up', UserController.createUser); // Sử dụng POST cho việc tạo mới
router.post('/sign-in', UserController.loginUser);
router.put('/update-user/:id', UserController.updateUser);
router.delete('/delete-user/:id',authMiddleWare, UserController.deleteUser);
router.get('/getAll',authMiddleWare, UserController.getAllUser);
router.get('/get-details/:id', UserController.getDetailsUser);
router.post('/refresh-token', UserController.refreshToken);
module.exports = router;
