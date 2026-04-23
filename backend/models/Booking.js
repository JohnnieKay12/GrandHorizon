const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: [true, 'Booking ID is required'],
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Guest name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'Room ID is required']
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required']
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required']
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'At least 1 guest required'],
    max: [10, 'Maximum 10 guests allowed']
  },
  nights: {
    type: Number,
    required: true,
    min: [1, 'Minimum 1 night required']
  },
  totalAmount: {
    type: Number,
    required: true,
    min: [0, 'Total amount cannot be negative']
  },
  paymentStatus: {
    type: String,
    enum: {
      values: ['pending', 'paid', 'failed', 'refunded'],
      message: 'Payment status must be pending, paid, failed, or refunded'
    },
    default: 'pending'
  },
  paystackReference: {
    type: String,
    default: null
  },
  specialRequests: {
    type: String,
    default: '',
    maxlength: [500, 'Special requests cannot exceed 500 characters']
  },
  whatsappLink: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for date range queries (preventing double bookings)
bookingSchema.index({ roomId: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ paymentStatus: 1 });
bookingSchema.index({ bookingId: 1 });

// Method to check if dates overlap with another booking
bookingSchema.methods.checkOverlap = function(otherCheckIn, otherCheckOut) {
  return (
    (this.checkIn <= otherCheckOut && this.checkOut >= otherCheckIn) ||
    (otherCheckIn <= this.checkOut && otherCheckOut >= this.checkIn)
  );
};

module.exports = mongoose.model('Booking', bookingSchema);
