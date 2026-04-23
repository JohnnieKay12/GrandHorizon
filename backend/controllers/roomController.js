const Room = require('../models/Room');
const Booking = require('../models/Booking');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
const getAllRooms = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice, available, search } = req.query;
  
  // Build filter object
  const filter = {};
  
  if (category && ['cheap', 'standard', 'luxury'].includes(category)) {
    filter.category = category;
  }
  
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  
  if (available === 'true') {
    filter.isAvailable = true;
  }
  
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const rooms = await Room.find(filter).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: rooms.length,
    data: rooms
  });
});

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    throw new AppError('Room not found', 404);
  }

  res.status(200).json({
    success: true,
    data: room
  });
});

// @desc    Create new room
// @route   POST /api/rooms
// @access  Admin
const createRoom = asyncHandler(async (req, res) => {
  const room = await Room.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Room created successfully',
    data: room
  });
});

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Admin
const updateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!room) {
    throw new AppError('Room not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Room updated successfully',
    data: room
  });
});

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Admin
const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findByIdAndDelete(req.params.id);

  if (!room) {
    throw new AppError('Room not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Room deleted successfully',
    data: {}
  });
});

// @desc    Get room availability
// @route   GET /api/rooms/:id/availability
// @access  Public
const getRoomAvailability = asyncHandler(async (req, res) => {
  const { checkIn, checkOut } = req.query;
  
  if (!checkIn || !checkOut) {
    throw new AppError('Please provide check-in and check-out dates', 400);
  }

  const room = await Room.findById(req.params.id);
  
  if (!room) {
    throw new AppError('Room not found', 404);
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // Find overlapping bookings
  const overlappingBookings = await Booking.find({
    roomId: req.params.id,
    paymentStatus: { $in: ['pending', 'paid'] },
    $or: [
      { checkIn: { $lte: checkOutDate }, checkOut: { $gte: checkInDate } }
    ]
  });

  const isAvailable = overlappingBookings.length === 0;

  res.status(200).json({
    success: true,
    data: {
      isAvailable,
      room,
      conflictingBookings: overlappingBookings.length
    }
  });
});

// @desc    Get featured rooms
// @route   GET /api/rooms/featured/list
// @access  Public
const getFeaturedRooms = asyncHandler(async (req, res) => {
  const featuredRooms = await Room.find({ isAvailable: true })
    .sort({ rating: -1, reviewCount: -1 })
    .limit(6);

  res.status(200).json({
    success: true,
    count: featuredRooms.length,
    data: featuredRooms
  });
});

// @desc    Get rooms by category
// @route   GET /api/rooms/category/:category
// @access  Public
const getRoomsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  if (!['cheap', 'standard', 'luxury'].includes(category)) {
    throw new AppError('Invalid category. Must be cheap, standard, or luxury', 400);
  }

  const rooms = await Room.find({ category, isAvailable: true })
    .sort({ price: 1 });

  res.status(200).json({
    success: true,
    count: rooms.length,
    data: rooms
  });
});

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomAvailability,
  getFeaturedRooms,
  getRoomsByCategory
};
