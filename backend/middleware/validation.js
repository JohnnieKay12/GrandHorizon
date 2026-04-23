const { body, param, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      status: 'fail',
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Room validation rules
const roomValidation = {
  create: [
    body('name')
      .trim()
      .notEmpty().withMessage('Room name is required')
      .isLength({ max: 100 }).withMessage('Room name cannot exceed 100 characters'),
    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('images')
      .isArray({ min: 1 }).withMessage('At least one image is required'),
    body('description')
      .trim()
      .notEmpty().withMessage('Description is required')
      .isLength({ max: 2000 }).withMessage('Description cannot exceed 2000 characters'),
    body('category')
      .notEmpty().withMessage('Category is required')
      .isIn(['cheap', 'standard', 'luxury']).withMessage('Category must be cheap, standard, or luxury'),
    body('maxGuests')
      .optional()
      .isInt({ min: 1, max: 10 }).withMessage('Guests must be between 1 and 10'),
    handleValidationErrors
  ],
  update: [
    param('id')
      .isMongoId().withMessage('Invalid room ID'),
    body('name')
      .optional()
      .trim()
      .notEmpty().withMessage('Room name cannot be empty')
      .isLength({ max: 100 }).withMessage('Room name cannot exceed 100 characters'),
    body('price')
      .optional()
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category')
      .optional()
      .isIn(['cheap', 'standard', 'luxury']).withMessage('Category must be cheap, standard, or luxury'),
    handleValidationErrors
  ],
  getById: [
    param('id')
      .isMongoId().withMessage('Invalid room ID'),
    handleValidationErrors
  ],
  delete: [
    param('id')
      .isMongoId().withMessage('Invalid room ID'),
    handleValidationErrors
  ]
};

// Booking validation rules
const bookingValidation = {
  create: [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email'),
    body('phone')
      .trim()
      .notEmpty().withMessage('Phone number is required'),
    body('roomId')
      .notEmpty().withMessage('Room ID is required')
      .isMongoId().withMessage('Invalid room ID'),
    body('checkIn')
      .notEmpty().withMessage('Check-in date is required')
      .isISO8601().withMessage('Invalid check-in date format'),
    body('checkOut')
      .notEmpty().withMessage('Check-out date is required')
      .isISO8601().withMessage('Invalid check-out date format'),
    body('guests')
      .notEmpty().withMessage('Number of guests is required')
      .isInt({ min: 1, max: 10 }).withMessage('Guests must be between 1 and 10'),
    body('specialRequests')
      .optional()
      .trim()
      .isLength({ max: 500 }).withMessage('Special requests cannot exceed 500 characters'),
    handleValidationErrors
  ],
  verifyPayment: [
    body('reference')
      .trim()
      .notEmpty().withMessage('Payment reference is required'),
    handleValidationErrors
  ],
  getById: [
    param('id')
      .notEmpty().withMessage('Booking ID is required'),
    handleValidationErrors
  ]
};

// Payment validation rules
const paymentValidation = {
  initialize: [
    body('email')
      .trim()
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Please provide a valid email'),
    body('amount')
      .notEmpty().withMessage('Amount is required')
      .isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
    handleValidationErrors
  ],
  verify: [
    body('reference')
      .trim()
      .notEmpty().withMessage('Payment reference is required'),
    handleValidationErrors
  ]
};

module.exports = {
  roomValidation,
  bookingValidation,
  paymentValidation,
  handleValidationErrors
};
