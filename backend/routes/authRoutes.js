const express = require('express');
const router = express.Router();

const {
  register,
  login,
  googleLogin,
  getMe,
  logout,
  createAdmin,
  updateProfile
} = require('../controllers/authController');

const { authMiddleware } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/create-admin', createAdmin);

// Protected routes
router.get('/me', authMiddleware, getMe);
router.post('/logout', authMiddleware, logout);

// ✅ UPDATE PROFILE ROUTE
router.put('/update-profile', authMiddleware, updateProfile);

module.exports = router;