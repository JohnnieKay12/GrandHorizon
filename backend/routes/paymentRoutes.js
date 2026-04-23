const express = require('express');
const router = express.Router();
const {
  initializeTransaction,
  verifyTransaction,
  processRefund,
  getPaymentStatus
} = require('../controllers/paymentController');
const { paymentValidation } = require('../middleware/validation');

// Public routes
router.post('/initialize', paymentValidation.initialize, initializeTransaction);
router.get('/verify/:reference', verifyTransaction);
router.get('/status/:bookingId', getPaymentStatus);

// Admin routes
router.post('/refund', processRefund);

module.exports = router;
