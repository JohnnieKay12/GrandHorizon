const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomAvailability,
  getFeaturedRooms,
  getRoomsByCategory
} = require('../controllers/roomController');
const { roomValidation } = require('../middleware/validation');

// Public routes
router.get('/', getAllRooms);
router.get('/featured/list', getFeaturedRooms);
router.get('/category/:category', getRoomsByCategory);
router.get('/:id/availability', getRoomAvailability);
router.get('/:id', roomValidation.getById, getRoomById);

// Admin routes (can add auth middleware later)
router.post('/', roomValidation.create, createRoom);
router.put('/:id', roomValidation.update, updateRoom);
router.delete('/:id', roomValidation.delete, deleteRoom);

module.exports = router;
