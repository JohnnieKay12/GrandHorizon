const express = require('express');
const router = express.Router();
const { adminController } = require('../controllers');

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// User management
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Reports
router.get('/reports/revenue', adminController.getRevenueReport);
router.get('/reports/occupancy', adminController.getOccupancyReport);

module.exports = router;
