import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiArrowLeft, 
  FiUsers, 
  // FiBed, 
  FiMaximize, 
  FiStar,
  FiCheck,
  FiCalendar,
  FiWifi,
  FiWind,
  FiDroplet,
  FiMonitor,
  FiCoffee,
  // FiCar,
  FiShield
} from 'react-icons/fi'
import { FaBed, FaCar } from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner'
import { roomAPI, bookingAPI } from '../services/api'
import { useBooking } from '../context/BookingContext'
import { formatPrice, getToday, getTomorrow, calculateNights, getMinCheckout } from '../utils/helpers'
import toast from 'react-hot-toast'

const amenityIcons = {
  "Free WiFi": FiWifi,
  "Smart TV": FiMonitor,
  "Mini Bar": FiCoffee,
  "Air Conditioning": FiWind,
  "Balcony": FiMaximize,
  "Swimming Pool": FiDroplet,
  "Breakfast": FiCoffee,
  "Parking": FaCar,
}

const RoomDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { updateBookingData } = useBooking()
  
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [bookingForm, setBookingForm] = useState({
    checkIn: getToday(),
    checkOut: getTomorrow(),
    guests: 2,
  })
  const [availability, setAvailability] = useState(null)
  const [checkingAvailability, setCheckingAvailability] = useState(false)

  useEffect(() => {
    fetchRoomDetails()
  }, [id])

  const fetchRoomDetails = async () => {
    try {
      const response = await roomAPI.getById(id)
      if (response.success) {
        setRoom(response.data)
      }
    } catch (error) {
      toast.error('Failed to load room details')
      navigate('/rooms')
    } finally {
      setLoading(false)
    }
  }

  const checkAvailability = async () => {
    setCheckingAvailability(true)
    try {
      const response = await bookingAPI.checkAvailability({
        roomId: id,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
      })
      
      if (response.success) {
        setAvailability(response.data)
        if (response.data.isAvailable) {
          toast.success('Room is available for selected dates!')
        } else {
          toast.error('Room is not available for selected dates')
        }
      }
    } catch (error) {
      toast.error('Failed to check availability')
    } finally {
      setCheckingAvailability(false)
    }
  }

  const handleBooking = () => {
    if (!availability?.isAvailable) {
      toast.error('Please check availability first')
      return
    }

    // Store booking data in context
    updateBookingData({
      roomId: id,
      checkIn: bookingForm.checkIn,
      checkOut: bookingForm.checkOut,
      guests: bookingForm.guests,
      roomName: room.name,
      roomPrice: room.price,
      totalAmount: availability.totalAmount,
      nights: availability.nights,
    })

    navigate(`/booking/${id}`)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBookingForm(prev => ({ ...prev, [name]: value }))
    setAvailability(null) // Reset availability when dates change
  }

  const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut)
  const totalPrice = room ? room.price * nights : 0

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h2>
          <Link to="/rooms" className="text-primary-600 hover:text-primary-800">
            Back to Rooms
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/rooms"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-900 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Rooms
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md"
            >
              {/* Main Image */}
              <div className="relative h-80 md:h-96">
                <img
                  src={room.images[activeImage]}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    room.category === 'luxury' ? 'bg-gold-400 text-primary-900' :
                    room.category === 'standard' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {room.category.charAt(0).toUpperCase() + room.category.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              {room.images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {room.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImage === index ? 'border-primary-900' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${room.name} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Room Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                    {room.name}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiUsers className="w-4 h-4" />
                      <span>{room.maxGuests} Guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaBed className="w-4 h-4" />
                      <span>{room.bedType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiMaximize className="w-4 h-4" />
                      <span>{room.roomSize}</span>
                    </div>
                    {room.rating && (
                      <div className="flex items-center gap-1">
                        <FiStar className="w-4 h-4 text-gold-400 fill-gold-400" />
                        <span>{room.rating} ({room.reviewCount} reviews)</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary-900">
                    {formatPrice(room.price)}
                  </p>
                  <p className="text-gray-500 text-sm">per night</p>
                </div>
              </div>

              <div className="prose max-w-none mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{room.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities?.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || FiCheck
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Book This Room</h3>
              
              <div className="space-y-4 mb-6">
                {/* Check-in */}
                <div>
                  <label className="label flex items-center gap-2">
                    <FiCalendar className="text-primary-600" />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingForm.checkIn}
                    min={getToday()}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                {/* Check-out */}
                <div>
                  <label className="label flex items-center gap-2">
                    <FiCalendar className="text-primary-600" />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingForm.checkOut}
                    min={getMinCheckout(bookingForm.checkIn)}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="label flex items-center gap-2">
                    <FiUsers className="text-primary-600" />
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={bookingForm.guests}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    {[...Array(room.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Guest{i > 0 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">{formatPrice(room.price)} x {nights} nights</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-primary-900">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              {/* Availability Status */}
              {availability && (
                <div className={`p-4 rounded-xl mb-4 ${
                  availability.isAvailable 
                    ? 'bg-green-50 text-green-800' 
                    : 'bg-red-50 text-red-800'
                }`}>
                  <p className="font-medium">
                    {availability.isAvailable 
                      ? '✓ Room is available!' 
                      : '✗ Room is not available'}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={checkAvailability}
                  disabled={checkingAvailability}
                  className="w-full py-3 border-2 border-primary-900 text-primary-900 rounded-lg 
                           font-medium hover:bg-primary-50 transition-colors disabled:opacity-50"
                >
                  {checkingAvailability ? 'Checking...' : 'Check Availability'}
                </button>
                
                <button
                  onClick={handleBooking}
                  disabled={!availability?.isAvailable}
                  className="w-full py-3 bg-primary-900 text-white rounded-lg font-medium 
                           hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Booking
                </button>
              </div>

              {/* Note */}
              <p className="text-xs text-gray-500 text-center mt-4">
                You won't be charged yet. Payment will be processed after booking confirmation.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetails
