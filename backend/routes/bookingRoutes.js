const express = require('express');
const router = express.Router();
const {
  createBooking,
  initializeBookingPayment,
  verifyBookingPayment,
  getAllBookings,
  getBookingById,
  getBookingByMongoId,
  updateBooking,
  deleteBooking,
  getUserBookings,
  checkAvailability
} = require('../controllers/bookingController');
const { bookingValidation } = require('../middleware/validation');

// Public routes
router.post('/', bookingValidation.create, createBooking);
router.post('/check-availability', checkAvailability);
router.post('/verify-payment', bookingValidation.verifyPayment, verifyBookingPayment);
router.get('/user/:email', getUserBookings);
router.get('/mongo/:id', getBookingByMongoId);
router.get('/:id', getBookingById);

// Payment route
router.post('/:id/pay', initializeBookingPayment);

// Admin routes (can add auth middleware later)
router.get('/', getAllBookings);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

module.exports = router;
