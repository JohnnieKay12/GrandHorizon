import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiUsers, FiMaximize, FiArrowRight, FiStar } from 'react-icons/fi'
import { FaBed } from 'react-icons/fa'
import { formatPrice, getCategoryColor, getCategoryLabel, truncateText } from '../utils/helpers'

const RoomCard = ({ room, index = 0 }) => {
  const {
    _id,
    name,
    price,
    images,
    description,
    amenities,
    category,
    maxGuests,
    bedType,
    roomSize,
    rating,
    reviewCount,
  } = room

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(category)}`}>
            {getCategoryLabel(category)}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-primary-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
            <span className="text-gold-400 font-bold">{formatPrice(price)}</span>
            <span className="text-xs text-gray-300">/night</span>
          </div>
        </div>

        {/* Rating */}
        {rating && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
            <FiStar className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span className="text-sm font-semibold text-gray-800">{rating}</span>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2 group-hover:text-primary-900 transition-colors">
          {name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {truncateText(description, 120)}
        </p>

        {/* Room Info */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FiUsers className="w-4 h-4" />
            <span>{maxGuests} Guests</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FaBed className="w-4 h-4" />
            <span>{bedType}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <FiMaximize className="w-4 h-4" />
            <span>{roomSize}</span>
          </div>
        </div>

        {/* Amenities Preview */}
        <div className="flex flex-wrap gap-2 mb-5">
          {amenities.slice(0, 3).map((amenity, i) => (
            <span
              key={i}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {amenity}
            </span>
          ))}
          {amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              +{amenities.length - 3} more
            </span>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to={`/rooms/${_id}`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-primary-50 text-primary-900 
                   rounded-lg font-medium hover:bg-primary-900 hover:text-white transition-all duration-300 group/btn"
        >
          View Details
          <FiArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  )
}

export default RoomCard
