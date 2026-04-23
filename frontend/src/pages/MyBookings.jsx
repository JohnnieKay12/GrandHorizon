import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { bookingAPI } from "../services/api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiUsers,
  FiCreditCard,
  FiArrowRight,
} from "react-icons/fi";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatDate, formatPrice } from "../utils/helpers";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
  
    if (!email) {
      setLoading(false);
      return;
    }
  
    fetchBookings(email);
  }, []);
  
  const fetchBookings = async (email) => {
    try {
      const res = await bookingAPI.getUserBookings(email);
  
      if (res.success) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container-custom max-w-6xl mx-auto">

        <h1 className="text-3xl font-serif font-bold mb-8">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <p className="text-gray-600 mb-4">
              You have no bookings yet.
            </p>
            <Link
              to="/rooms"
              className="px-6 py-3 bg-primary-900 text-white rounded-lg"
            >
              Book a Room
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((booking) => {
              const isPaid = booking.paymentStatus === "paid";

              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  {/* Image */}
                  <img
                    src={booking.roomId.images[0]}
                    alt={booking.roomId.name}
                    className="h-48 w-full object-cover"
                  />

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-lg font-semibold">
                      {booking.roomId.name}
                    </h2>

                    <p className="text-sm text-gray-500 mb-3">
                      Booking ID: {booking.bookingId}
                    </p>

                    {/* Dates */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <FiCalendar />
                      {formatDate(booking.checkIn)} -{" "}
                      {formatDate(booking.checkOut)}
                    </div>

                    {/* Guests */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <FiUsers />
                      {booking.guests} Guests
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <FiCreditCard />
                      {formatPrice(booking.totalAmount)}
                    </div>

                    {/* Status */}
                    <div
                      className={`inline-block px-3 py-1 text-xs rounded-full mb-4 ${
                        isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.paymentStatus}
                    </div>

                    {/* Action */}
                    <Link
                      to={`/booking-confirmation/${booking.bookingId}`}
                      className="flex items-center justify-between text-primary-900 font-medium"
                    >
                      View Details
                      <FiArrowRight />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;