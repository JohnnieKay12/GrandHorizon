import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiArrowLeft, 
  FiUser, 
  FiMail, 
  FiPhone
} from 'react-icons/fi'
import LoadingSpinner from '../components/LoadingSpinner'
import { roomAPI, bookingAPI } from '../services/api'
import { useBooking } from '../context/BookingContext'
import { formatPrice, calculateNights, isValidEmail, isValidPhone } from '../utils/helpers'
import toast from 'react-hot-toast'

const Booking = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { bookingData, setBooking } = useBooking()
  const { isAuthenticated } = useAuth()
  
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: localStorage.getItem('userEmail') || '', // ✅ Prefill email
    phone: '',
    specialRequests: '',
  })

  const [errors, setErrors] = useState({})

  // ✅ AUTH GUARD
  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login', {
        state: { from: location.pathname }
      })
    }
  }, [isAuthenticated, navigate, location.pathname])

  // ✅ FETCH ROOM
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await roomAPI.getById(roomId)

        if (response.success) {
          setRoom(response.data)

          if (!bookingData.checkIn || !bookingData.checkOut) {
            navigate(`/rooms/${roomId}`)
            return
          }
        }
      } catch (error) {
        toast.error('Failed to load room details')
        navigate('/rooms')
      } finally {
        setLoading(false)
      }
    }

    fetchRoomDetails()
  }, [roomId, bookingData, navigate])

  // ✅ VALIDATION
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Invalid phone'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ✅ INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // ✅ SUBMIT (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fill all required fields')
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomId,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        specialRequests: formData.specialRequests,
      }

      const response = await bookingAPI.create(payload)

      if (response.success) {
        const booking = response.data.booking

        // ✅ SAVE EMAIL FOR MY BOOKINGS PAGE
        localStorage.setItem('userEmail', formData.email)

        // ✅ SAVE BOOKING
        setBooking(booking)

        toast.success('Booking successful!')

        // ✅ REDIRECT TO CONFIRMATION
        navigate(`/booking-confirmation/${booking.bookingId}`)
      }

    } catch (error) {
      toast.error(error.message || 'Booking failed')
    } finally {
      setSubmitting(false)
    }
  }

  const nights =
    bookingData.checkIn && bookingData.checkOut
      ? calculateNights(bookingData.checkIn, bookingData.checkOut)
      : 0

  const totalAmount = room ? room.price * nights : 0

  if (loading || isAuthenticated === false) {
    return <LoadingSpinner fullScreen />
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">

        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(`/rooms/${roomId}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-900"
          >
            <FiArrowLeft /> Back
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* FORM */}
          <motion.div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h1 className="text-2xl font-bold mb-6">
                Complete Your Booking
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-primary-900 text-white rounded-lg"
                >
                  {submitting ? 'Processing...' : 'Confirm Booking'}
                </button>

              </form>
            </div>
          </motion.div>

          {/* SUMMARY */}
          <motion.div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-4">Summary</h3>

              <p className="font-medium">{room.name}</p>
              <p className="text-gray-500">{nights} nights</p>

              <p className="text-xl font-bold mt-2">
                {formatPrice(totalAmount)}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Booking