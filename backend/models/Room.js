const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Room name is required'],
    trim: true,
    maxlength: [100, 'Room name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Room price is required'],
    min: [0, 'Price cannot be negative']
  },
  images: {
    type: [String],
    required: [true, 'At least one image is required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one image URL is required'
    }
  },
  description: {
    type: String,
    required: [true, 'Room description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  amenities: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: [true, 'Room category is required'],
    enum: {
      values: ['cheap', 'standard', 'luxury'],
      message: 'Category must be either cheap, standard, or luxury'
    }
  },
  maxGuests: {
    type: Number,
    required: [true, 'Maximum guests is required'],
    min: [1, 'Must allow at least 1 guest'],
    default: 2
  },
  bedType: {
    type: String,
    default: 'King Size'
  },
  roomSize: {
    type: String,
    default: '30 sqm'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot exceed 5']
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for search performance
roomSchema.index({ category: 1, price: 1 });
roomSchema.index({ isAvailable: 1 });

module.exports = mongoose.model('Room', roomSchema);
