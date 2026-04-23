const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { initializePayment, verifyPayment, createRefund } = require('../utils/paystack');
const Booking = require('../models/Booking');

// @desc    Initialize payment
// @route   POST /api/payments/initialize
// @access  Public
const initializeTransaction = asyncHandler(async (req, res) => {
  const { email, amount, metadata = {} } = req.body;

  const result = await initializePayment(email, amount, metadata);

  if (!result.success) {
    throw new AppError(result.error || 'Payment initialization failed', 400);
  }

  res.status(200).json({
    success: true,
    message: 'Payment initialized successfully',
    data: result.data
  });
});

// @desc    Verify payment
// @route   GET /api/payments/verify/:reference
// @access  Public
const verifyTransaction = asyncHandler(async (req, res) => {
  const { reference } = req.params;

  const result = await verifyPayment(reference);

  if (!result.success) {
    throw new AppError(result.error || 'Payment verification failed', 400);
  }

  res.status(200).json({
    success: true,
    message: 'Payment verified successfully',
    data: result.data
  });
});

// @desc    Process refund
// @route   POST /api/payments/refund
// @access  Admin
const processRefund = asyncHandler(async (req, res) => {
  const { bookingId, amount } = req.body;

  const booking = await Booking.findOne({ bookingId }).populate('roomId');
  
  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  if (booking.paymentStatus !== 'paid') {
    throw new AppError('Cannot refund unpaid booking', 400);
  }

  if (!booking.paystackReference) {
    throw new AppError('No payment reference found for this booking', 400);
  }

  // Create refund
  const refundResult = await createRefund(booking.paystackReference, amount);

  if (!refundResult.success) {
    throw new AppError(refundResult.error || 'Refund processing failed', 400);
  }

  // Update booking status
  booking.paymentStatus = amount && amount < booking.totalAmount ? 'partially_refunded' : 'refunded';
  await booking.save();

  res.status(200).json({
    success: true,
    message: 'Refund processed successfully',
    data: {
      booking,
      refund: refundResult.data
    }
  });
});

// @desc    Get payment status
// @route   GET /api/payments/status/:bookingId
// @access  Public
const getPaymentStatus = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findOne({ bookingId }).populate('roomId');
  
  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  res.status(200).json({
    success: true,
    data: {
      bookingId: booking.bookingId,
      paymentStatus: booking.paymentStatus,
      totalAmount: booking.totalAmount,
      paystackReference: booking.paystackReference,
      paidAt: booking.updatedAt
    }
  });
});

module.exports = {
  initializeTransaction,
  verifyTransaction,
  processRefund,
  getPaymentStatus
};
