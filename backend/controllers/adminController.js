const { User, Booking, Room } = require('../models');
const { asyncHandler, ErrorResponse } = require('../middleware/errorHandler');

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, role } = req.query;

  // Build query
  const query = {};

  if (role) {
    query.role = role;
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  // Pagination
  const skip = (Number(page) - 1) * Number(limit);

  const users = await User.find(query)
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    count: users.length,
    total,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
    data: users,
  });
});

/**
 * @desc    Get user by ID
 * @route   GET /api/admin/users/:id
 * @access  Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password')
    .populate('bookings');

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Update user
 * @route   PUT /api/admin/users/:id
 * @access  Private/Admin
 */
const updateUser = asyncHandler(async (req, res) => {
  const { name, email, phone, role, isActive } = req.body;

  let user = await User.findById(req.params.id);

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  // Update fields
  if (name) user.name = name;
  if (email) user.email = email.toLowerCase();
  if (phone) user.phone = phone;
  if (role) user.role = role;
  if (typeof isActive !== 'undefined') user.isActive = isActive;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: user,
  });
});

/**
 * @desc    Delete user
 * @route   DELETE /api/admin/users/:id
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ErrorResponse('User not found', 404);
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: {},
  });
});

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  // User statistics
  const totalUsers = await User.countDocuments();
  const newUsersThisMonth = await User.countDocuments({
    createdAt: {
      $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    },
  });

  // Booking statistics
  const totalBookings = await Booking.countDocuments();
  const pendingBookings = await Booking.countDocuments({ paymentStatus: 'pending' });
  const confirmedBookings = await Booking.countDocuments({
    paymentStatus: 'paid',
    // bookingStatus: 'confirmed',
  });
  const completedBookings = await Booking.countDocuments({ bookingStatus: 'completed' });
  const cancelledBookings = await Booking.countDocuments({ bookingStatus: 'cancelled' });

  // Room statistics
  const totalRooms = await Room.countDocuments();
  const availableRooms = await Room.countDocuments({ isAvailable: true });
  const roomsByCategory = await Room.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ]);

  // Revenue statistics
  const revenueResult = await Booking.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);
  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

  // This month's revenue
  const thisMonthRevenueResult = await Booking.aggregate([
    {
      $match: {
        paymentStatus: 'paid',
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);
  const thisMonthRevenue =
    thisMonthRevenueResult.length > 0 ? thisMonthRevenueResult[0].total : 0;

  // Recent bookings
  const recentBookings = await Booking.find()
    .populate('roomId', 'name category')
    .sort({ createdAt: -1 })
    .limit(5);

  // Today's check-ins
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayCheckIns = await Booking.find({
    checkIn: { $gte: today, $lt: tomorrow },
    bookingStatus: { $ne: 'cancelled' },
  })
    .populate('roomId', 'name')
    .sort({ checkIn: 1 });

  // Today's check-outs
  const todayCheckOuts = await Booking.find({
    checkOut: { $gte: today, $lt: tomorrow },
    bookingStatus: { $ne: 'cancelled' },
  })
    .populate('roomId', 'name')
    .sort({ checkOut: 1 });

  res.status(200).json({
    success: true,
    data: {
      users: {
        total: totalUsers,
        newThisMonth: newUsersThisMonth,
      },
      bookings: {
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
      },
      rooms: {
        total: totalRooms,
        available: availableRooms,
        byCategory: roomsByCategory,
      },
      revenue: {
        total: totalRevenue,
        formattedTotal: `₦${totalRevenue.toLocaleString('en-NG')}`,
        thisMonth: thisMonthRevenue,
        formattedThisMonth: `₦${thisMonthRevenue.toLocaleString('en-NG')}`,
      },
      recentBookings,
      todayCheckIns,
      todayCheckOuts,
    },
  });

  // Occupancy calculation
const totalRoomCount = await Room.countDocuments();

// Get active bookings (not cancelled)
const activeBookings = await Booking.find({
  bookingStatus: { $ne: 'cancelled' },
});

// Calculate total occupied room-days
let occupiedDays = 0;

activeBookings.forEach((booking) => {
  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);

  const diffTime = checkOut - checkIn;
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  occupiedDays += days;
});

// Define time range (e.g. last 30 days)
const daysInPeriod = 30;

// Max possible occupancy
const maxOccupancy = totalRoomCount * daysInPeriod;

// Average occupancy %
const avgOccupancy =
  maxOccupancy > 0 ? ((occupiedDays / maxOccupancy) * 100).toFixed(2) : 0;
});

/**
 * @desc    Get revenue report
 * @route   GET /api/admin/reports/revenue
 * @access  Private/Admin
 */
const getRevenueReport = asyncHandler(async (req, res) => {
  const { startDate, endDate, groupBy = 'day' } = req.query;

  const matchStage = { paymentStatus: 'paid' };

  if (startDate && endDate) {
    matchStage.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  let groupStage;
  switch (groupBy) {
    case 'month':
      groupStage = {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
      };
      break;
    case 'year':
      groupStage = {
        _id: { year: { $year: '$createdAt' } },
      };
      break;
    case 'day':
    default:
      groupStage = {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' },
        },
      };
  }

  const revenue = await Booking.aggregate([
    { $match: matchStage },
    {
      $group: {
        ...groupStage,
        total: { $sum: '$totalAmount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
  ]);

  res.status(200).json({
    success: true,
    data: revenue.map((item) => ({
      period:
        groupBy === 'year'
          ? `${item._id.year}`
          : groupBy === 'month'
          ? `${item._id.year}-${String(item._id.month).padStart(2, '0')}`
          : `${item._id.year}-${String(item._id.month).padStart(2, '0')}-${String(
              item._id.day
            ).padStart(2, '0')}`,
      total: item.total,
      formattedTotal: `₦${item.total.toLocaleString('en-NG')}`,
      bookings: item.count,
    })),
  });
});

/**
 * @desc    Get occupancy report
 * @route   GET /api/admin/reports/occupancy
 * @access  Private/Admin
 */


const getOccupancyReport = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const start = startDate ? new Date(startDate) : new Date();
  const end = endDate ? new Date(endDate) : new Date();

  end.setDate(end.getDate() + 30);

  const totalRooms = await Room.countDocuments();

  const bookings = await Booking.find({
    $or: [
      { checkIn: { $gte: start, $lte: end } },
      { checkOut: { $gte: start, $lte: end } },
      { checkIn: { $lte: start }, checkOut: { $gte: end } },
    ],
    bookingStatus: { $ne: 'cancelled' },
  });

  const occupancyByDate = {};
  const currentDate = new Date(start);

  let totalOccupied = 0;
  let totalDays = 0;

  while (currentDate <= end) {
    const dateStr = currentDate.toISOString().split('T')[0];

    const occupiedRooms = bookings.filter((booking) => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      return currentDate >= checkIn && currentDate < checkOut;
    });

    occupancyByDate[dateStr] = {
      date: dateStr,
      occupiedRooms: occupiedRooms.length,
    };

    totalOccupied += occupiedRooms.length;
    totalDays++;

    currentDate.setDate(currentDate.getDate() + 1);
  }

  // ✅ AVG OCCUPANCY %
  const avgOccupancy =
    totalRooms > 0
      ? ((totalOccupied / (totalRooms * totalDays)) * 100).toFixed(2)
      : 0;

  res.status(200).json({
    success: true,
    data: Object.values(occupancyByDate),
    summary: {
      totalRooms,
      avgOccupancy,
    },
  });
});


// const getOccupancyReport = asyncHandler(async (req, res) => {
//   const { startDate, endDate } = req.query;

//   const start = startDate ? new Date(startDate) : new Date();
//   const end = endDate ? new Date(endDate) : new Date();
//   end.setDate(end.getDate() + 30); // Default to 30 days if no end date

//   // Get all bookings within date range
//   const bookings = await Booking.find({
//     $or: [
//       { checkIn: { $gte: start, $lte: end } },
//       { checkOut: { $gte: start, $lte: end } },
//       { checkIn: { $lte: start }, checkOut: { $gte: end } },
//     ],
//     bookingStatus: { $ne: 'cancelled' },
//   }).populate('roomId', 'name');

//   // Calculate occupancy by date
//   const occupancyByDate = {};
//   const currentDate = new Date(start);

//   while (currentDate <= end) {
//     const dateStr = currentDate.toISOString().split('T')[0];
//     const occupiedRooms = bookings.filter((booking) => {
//       const checkIn = new Date(booking.checkIn);
//       const checkOut = new Date(booking.checkOut);
//       return currentDate >= checkIn && currentDate < checkOut;
//     });

//     occupancyByDate[dateStr] = {
//       date: dateStr,
//       occupiedRooms: occupiedRooms.length,
//       bookings: occupiedRooms.map((b) => ({
//         bookingId: b.bookingId,
//         room: b.roomId?.name,
//         guest: b.name,
//       })),
//     };

//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   res.status(200).json({
//     success: true,
//     data: Object.values(occupancyByDate),
//   });
// });

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDashboardStats,
  getRevenueReport,
  getOccupancyReport,
};
