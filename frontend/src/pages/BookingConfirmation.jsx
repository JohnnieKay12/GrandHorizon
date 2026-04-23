import { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiCheckCircle, 
  FiCalendar, 
  FiUsers, 
  FiHome,
  FiPhone,
  FiMail,
  FiCreditCard,
  FiMessageCircle,
  FiDownload,
  FiShare2,
  FiPrinter
} from 'react-icons/fi'
import LoadingSpinner from '../components/LoadingSpinner'
import { bookingAPI } from '../services/api'
import { formatPrice, formatDate, calculateNights } from '../utils/helpers'
import toast from 'react-hot-toast'

const BookingConfirmation = () => {
  const { bookingId } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [paymentLoading, setPaymentLoading] = useState(false)

  const location = useLocation()

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const reference = query.get('reference')
  
    if (reference) {
      verifyPayment(reference)
    } else {
      fetchBookingDetails()
    }
  }, [bookingId])


  const verifyPayment = async (reference) => {
    try {
      const response = await bookingAPI.verifyPayment(reference)
  
      if (response.success) {
        toast.success('Payment successful!')
        setBooking(response.data.booking)
      }
    } catch (error) {
      toast.error('Payment verification failed')
    } finally {
      setLoading(false)
    }
  }

  const fetchBookingDetails = async () => {
    try {
      const response = await bookingAPI.getById(bookingId)
      if (response.success) {
        setBooking(response.data)
      }
    } catch (error) {
      toast.error('Failed to load booking details')
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    setPaymentLoading(true)
    try {
      const response = await bookingAPI.initializePayment(booking._id)
      if (response.success) {
        // Redirect to Paystack checkout
        window.location.href = response.data.authorization_url
      }
    } catch (error) {
      toast.error('Failed to initialize payment')
      setPaymentLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Hotel Booking',
          text: `I just booked a room at Grand Horizon Hotel! Booking ID: ${bookingId}`,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled share
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h2>
          <Link to="/rooms" className="text-primary-600 hover:text-primary-800">
            Browse Rooms
          </Link>
        </div>
      </div>
    )
  }

  const nights = calculateNights(booking.checkIn, booking.checkOut)
  const isPaid = booking.paymentStatus === 'paid'
  const isPending = booking.paymentStatus === 'pending'

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600">
              Thank you for choosing Grand Horizon Hotel. Your reservation has been received.
            </p>
          </div>

          {/* Booking Card */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 print:shadow-none">
            {/* Header */}
            <div className="bg-primary-900 text-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-gray-300 text-sm mb-1">Booking Reference</p>
                  <p className="text-2xl font-bold">{booking.bookingId}</p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  isPaid 
                    ? 'bg-green-400 text-green-900' 
                    : isPending 
                      ? 'bg-yellow-400 text-yellow-900'
                      : 'bg-red-400 text-red-900'
                }`}>
                  {booking.paymentStatus.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Room Info */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
                <img
                  src={booking.roomId.images[0]}
                  alt={booking.roomId.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {booking.roomId.name}
                  </h3>
                  <p className="text-gray-600 capitalize mb-2">{booking.roomId.category} Room</p>
                  <p className="text-primary-900 font-semibold">
                    {formatPrice(booking.roomId.price)}/night
                  </p>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Guest Info */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Guest Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <FiUsers className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-900">{booking.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiMail className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700">{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiPhone className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700">{booking.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Stay Details */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Stay Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-primary-600" />
                      <div>
                        <span className="text-gray-600">Check-in: </span>
                        <span className="text-gray-900">{formatDate(booking.checkIn)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-primary-600" />
                      <div>
                        <span className="text-gray-600">Check-out: </span>
                        <span className="text-gray-900">{formatDate(booking.checkOut)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiHome className="w-5 h-5 text-primary-600" />
                      <div>
                        <span className="text-gray-600">Duration: </span>
                        <span className="text-gray-900">{nights} night{nights > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiUsers className="w-5 h-5 text-primary-600" />
                      <div>
                        <span className="text-gray-600">Guests: </span>
                        <span className="text-gray-900">{booking.guests}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {booking.specialRequests && (
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase mb-3">Special Requests</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                    {booking.specialRequests}
                  </p>
                </div>
              )}

              {/* Price Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase mb-4">Price Summary</h4>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{formatPrice(booking.roomId.price)} x {nights} nights</span>
                    <span className="text-gray-900">{formatPrice(booking.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="text-green-600">Included</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-primary-900">{formatPrice(booking.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8 no-print">
            {/* Payment Button (if pending) */}
            {isPending && (
              <button
                onClick={handlePayment}
                disabled={paymentLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg 
                         font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                <FiCreditCard className="w-5 h-5" />
                {paymentLoading ? 'Processing...' : 'Pay Now'}
              </button>
            )}

            {/* WhatsApp Button */}
            <a
              href={booking.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg 
                       font-semibold hover:bg-green-600 transition-colors"
            >
              <FiMessageCircle className="w-5 h-5" />
              Contact on WhatsApp
            </a>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-primary-100 text-primary-900 rounded-lg 
                       font-semibold hover:bg-primary-200 transition-colors"
            >
              <FiShare2 className="w-5 h-5" />
              Share
            </button>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg 
                       font-semibold hover:bg-gray-200 transition-colors"
            >
              <FiPrinter className="w-5 h-5" />
              Print
            </button>
          </div>

          {/* Important Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 no-print">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Important Information</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Please bring a valid ID for check-in verification.</li>
              <li>• Check-in time is 2:00 PM and check-out time is 12:00 PM.</li>
              <li>• A confirmation email has been sent to {booking.email}.</li>
              <li>• For any inquiries, contact us at +234 801 234 5678.</li>
            </ul>
          </div>

          {/* Back to Home */}
          <div className="text-center no-print">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          nav, footer {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default BookingConfirmation
