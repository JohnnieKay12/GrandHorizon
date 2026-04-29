const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { asyncHandler, AppError } = require('../middleware/errorHandler');
const { sendAdminNotification, sendUserConfirmation } = require('../utils/email');
const { initializePayment, verifyPayment } = require('../utils/paystack');
const { generateWhatsAppLink } = require('../utils/whatsapp');
const { v4: uuidv4 } = require('uuid');

// Generate unique booking ID
const generateBookingId = () => {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `HTL-${randomNum}`;
};

// Calculate nights between two dates
const calculateNights = (checkIn, checkOut) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.round(Math.abs((end - start) / oneDay));
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = asyncHandler(async (req, res) => {
  const { name, email, phone, roomId, checkIn, checkOut, guests, specialRequests } = req.body;

  // Validate dates
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkInDate < today) {
    throw new AppError('Check-in date cannot be in the past', 400);
  }

  if (checkOutDate <= checkInDate) {
    throw new AppError('Check-out date must be after check-in date', 400);
  }

  // Find room
  const room = await Room.findById(roomId);
  if (!room) {
    throw new AppError('Room not found', 404);
  }

  // Check for overlapping bookings
  const overlappingBookings = await Booking.find({
    roomId,
    paymentStatus: { $in: ['pending', 'paid'] },
    $or: [
      { checkIn: { $lte: checkOutDate }, checkOut: { $gte: checkInDate } }
    ]
  });

  if (overlappingBookings.length > 0) {
    throw new AppError('Room is not available for the selected dates', 400);
  }

  // Calculate nights and total amount
  const nights = calculateNights(checkIn, checkOut);
  const totalAmount = room.price * nights;

  // Generate booking ID
  let bookingId = generateBookingId();
  let existingBooking = await Booking.findOne({ bookingId });
  
  // Ensure unique booking ID
  while (existingBooking) {
    bookingId = generateBookingId();
    existingBooking = await Booking.findOne({ bookingId });
  }

  // Generate WhatsApp link
  const whatsappLink = generateWhatsAppLink({
    bookingId,
    roomName: room.name,
    checkIn,
    checkOut,
    guests,
    totalAmount
  });

  // Create booking
  const booking = await Booking.create({
    bookingId,
    name,
    email,
    phone,
    roomId,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests,
    nights,
    totalAmount,
    paymentStatus: 'pending',
    specialRequests: specialRequests || '',
    whatsappLink
  });

  // Populate room details
  await booking.populate('roomId');

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: {
      booking,
      room,
      paymentInfo: {
        amount: totalAmount,
        currency: 'NGN'
      }
    }
  });
});

// @desc    Initialize payment for booking
// @route   POST /api/bookings/:id/pay
// @access  Public
const initializeBookingPayment = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('roomId');
  
  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  if (booking.paymentStatus === 'paid') {
    throw new AppError('Booking has already been paid for', 400);
  }

  // Initialize Paystack payment
  const paymentResult = await initializePayment(
    booking.email,
    booking.totalAmount,
    {
      callback_url: `${process.env.FRONTEND_URL}/payment/verify`,
      metadata: {
        booking_id: booking._id.toString(),
        bookingId: booking.bookingId,
      },
      custom_fields: [
        {
          display_name: "Booking ID",
          variable_name: "booking_id",
          value: booking.bookingId
        },
        {
          display_name: "Room",
          variable_name: "room_name",
          value: booking.roomId.name
        }
      ]
    }
  );

  if (!paymentResult.success) {
    throw new AppError(paymentResult.error || 'Payment initialization failed', 400);
  }

  // Update booking with Paystack reference
  booking.paystackReference = paymentResult.data.reference;
  await booking.save();

  res.status(200).json({
    success: true,
    message: 'Payment initialized successfully',
    data: {
      authorization_url: paymentResult.data.authorization_url,
      reference: paymentResult.data.reference,
      access_code: paymentResult.data.access_code
    }
  });
});

// @desc    Verify payment and update booking
// @route   POST /api/bookings/verify-payment
// @access  Public
const verifyBookingPayment = asyncHandler(async (req, res) => {
  const { reference } = req.body;

  console.log("🔍 Verifying payment for:", reference);

  const verificationResult = await verifyPayment(reference);

  if (!verificationResult.success) {
    throw new AppError(verificationResult.error || 'Payment verification failed', 400);
  }

  const paymentData = verificationResult.data;

  const booking = await Booking.findOne({ paystackReference: reference }).populate('roomId');

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  const isPaid =
    paymentData.status === "success" ||
    paymentData.gateway_response === "Successful";

  if (isPaid) {
    booking.paymentStatus = 'paid';
    booking.bookingStatus = 'confirmed';
    await booking.save();

    // ✅ SEND RESPONSE IMMEDIATELY (FAST UX)
    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: { booking }
    });

    // 🔥 RUN EMAILS IN BACKGROUND (NON-BLOCKING)
    sendAdminNotification({
      bookingId: booking.bookingId,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      roomName: booking.roomId.name,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      nights: booking.nights,
      totalAmount: booking.totalAmount,
      paymentStatus: booking.paymentStatus,
      specialRequests: booking.specialRequests
    }).catch(err => console.error("Admin email error:", err));

    sendUserConfirmation({
      bookingId: booking.bookingId,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      roomName: booking.roomId.name,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      nights: booking.nights,
      totalAmount: booking.totalAmount,
      paymentStatus: booking.paymentStatus,
      specialRequests: booking.specialRequests,
      whatsappLink: booking.whatsappLink
    }).catch(err => console.error("User email error:", err));

  } else {
    booking.paymentStatus = 'failed';
    await booking.save();

    throw new AppError('Payment was not successful', 400);
  }
});

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Admin
const getAllBookings = asyncHandler(async (req, res) => {
  const { status, startDate, endDate } = req.query;
  
  const filter = {};
  
  if (status && ['pending', 'paid', 'failed', 'refunded'].includes(status)) {
    filter.paymentStatus = status;
  }
  
  if (startDate || endDate) {
    filter.checkIn = {};
    if (startDate) filter.checkIn.$gte = new Date(startDate);
    if (endDate) filter.checkIn.$lte = new Date(endDate);
  }

  const bookings = await Booking.find(filter)
    .populate('roomId', 'name price images category')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Public/Admin
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findOne({ bookingId: req.params.id })
    .populate('roomId');

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Get booking by MongoDB ID
// @route   GET /api/bookings/mongo/:id
// @access  Public/Admin
const getBookingByMongoId = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('roomId');

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Admin
const updateBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('roomId');

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Booking updated successfully',
    data: booking
  });
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Admin
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);

  if (!booking) {
    throw new AppError('Booking not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Booking deleted successfully',
    data: {}
  });
});

// @desc    Get user's bookings by email
// @route   GET /api/bookings/user/:email
// @access  Public
const getUserBookings = asyncHandler(async (req, res) => {
  const { email } = req.params;
  
  const bookings = await Booking.find({ email })
    .populate('roomId', 'name price images category')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});


// @desc    Check room availability
// @route   POST /api/bookings/check-availability
// @access  Public
const checkAvailability = asyncHandler(async (req, res) => {
  const { roomId, checkIn, checkOut } = req.body;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  const room = await Room.findById(roomId);
  if (!room) {
    throw new AppError('Room not found', 404);
  }

  // Find overlapping bookings
  const overlappingBookings = await Booking.find({
    roomId,
    paymentStatus: { $in: ['pending', 'paid'] },
    $or: [
      { checkIn: { $lte: checkOutDate }, checkOut: { $gte: checkInDate } }
    ]
  });

  const isAvailable = overlappingBookings.length === 0;
  const nights = calculateNights(checkIn, checkOut);

  res.status(200).json({
    success: true,
    data: {
      isAvailable,
      room: {
        _id: room._id,
        name: room.name,
        price: room.price,
        images: room.images
      },
      nights,
      totalAmount: room.price * nights,
      conflictingBookings: overlappingBookings.length
    }
  });
});

module.exports = {
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
};
