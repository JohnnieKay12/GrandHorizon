import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCalendar, FiUsers, FiSearch } from 'react-icons/fi'
import Hero from '../components/Hero'
import RoomCard from '../components/RoomCard'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import GoogleMap from '../components/GoogleMap'
import LoadingSpinner from '../components/LoadingSpinner'
import { roomAPI } from '../services/api'
import { formatPrice, getToday, getTomorrow } from '../utils/helpers'
import toast from 'react-hot-toast'

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchData, setSearchData] = useState({
    checkIn: getToday(),
    checkOut: getTomorrow(),
    guests: 2,
  })

  useEffect(() => {
    fetchFeaturedRooms()
  }, [])

  const fetchFeaturedRooms = async () => {
    try {
      const response = await roomAPI.getFeatured()
      if (response.success) {
        setFeaturedRooms(response.data.slice(0, 6))
      }
    } catch (error) {
      toast.error('Failed to load featured rooms')
    } finally {
      setLoading(false)
    }
  }

  const handleSearchChange = (e) => {
    const { name, value } = e.target
    setSearchData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Store search data and redirect to rooms page
    localStorage.setItem('searchData', JSON.stringify(searchData))
    window.location.href = '/rooms'
  }

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Search Bar Section */}
      <section className="relative z-20 -mt-20 px-4">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Check-in Date */}
              <div>
                <label className="label flex items-center gap-2">
                  <FiCalendar className="text-primary-600" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={searchData.checkIn}
                  min={getToday()}
                  onChange={handleSearchChange}
                  className="input-field"
                  required
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label className="label flex items-center gap-2">
                  <FiCalendar className="text-primary-600" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={searchData.checkOut}
                  min={searchData.checkIn}
                  onChange={handleSearchChange}
                  className="input-field"
                  required
                />
              </div>

              {/* Guests */}
              <div>
                <label className="label flex items-center gap-2">
                  <FiUsers className="text-primary-600" />
                  Guests
                </label>
                <select
                  name="guests"
                  value={searchData.guests}
                  onChange={handleSearchChange}
                  className="input-field"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} Guest{num > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-3 bg-primary-900 text-white rounded-lg font-medium
                           hover:bg-primary-800 transition-colors flex items-center justify-center gap-2"
                >
                  <FiSearch className="w-5 h-5" />
                  Check Availability
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-primary-600 text-sm font-medium tracking-wider uppercase mb-3">
                Welcome to Grand Horizon
              </p>
              <h2 className="heading-lg text-gray-900 mb-6">
                Experience Luxury & Comfort at Its Finest
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Nestled in the heart of Lagos, Grand Horizon Hotel offers an unparalleled 
                blend of elegance, comfort, and world-class hospitality. Whether you're 
                visiting for business or leisure, our dedicated team ensures every moment 
                of your stay exceeds expectations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From our meticulously designed rooms to our exceptional dining options and 
                state-of-the-art facilities, every detail has been carefully curated to 
                provide you with an unforgettable experience. Discover why discerning 
                travelers choose Grand Horizon as their preferred destination.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-900 text-white 
                           rounded-lg font-medium hover:bg-primary-800 transition-colors"
                >
                  Learn More
                  <FiArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/rooms"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-900 
                           text-primary-900 rounded-lg font-medium hover:bg-primary-900 
                           hover:text-white transition-colors"
                >
                  View Rooms
                </Link>
              </div>
            </motion.div>

            {/* Images Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80"
                  alt="Hotel Exterior"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80"
                  alt="Hotel Pool"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80"
                  alt="Hotel Interior"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80"
                  alt="Hotel Restaurant"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Featured Rooms Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary-600 text-sm font-medium tracking-wider uppercase mb-3">
              Our Accommodations
            </p>
            <h2 className="heading-lg text-gray-900 mb-4">
              Featured Rooms
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of rooms and suites, each designed 
              to provide the perfect blend of comfort and luxury.
            </p>
          </motion.div>

          {/* Rooms Grid */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRooms.map((room, index) => (
                <RoomCard key={room._id} room={room} index={index} />
              ))}
            </div>
          )}

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-900 text-white 
                       rounded-lg font-medium hover:bg-primary-800 transition-colors"
            >
              View All Rooms
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Happy Guests' },
              { number: '50+', label: 'Luxury Rooms' },
              { number: '15+', label: 'Years Experience' },
              { number: '4.9', label: 'Average Rating' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1920&q=80"
            alt="Hotel Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-900/80" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="heading-lg text-white mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Book your stay today and enjoy exclusive offers, complimentary upgrades, 
              and unforgettable experiences at Grand Horizon Hotel.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/rooms"
                className="px-8 py-4 bg-gold-400 text-primary-900 rounded-lg font-semibold
                         hover:bg-gold-500 transition-colors"
              >
                Book Your Stay
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold
                         hover:bg-white hover:text-primary-900 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <GoogleMap />
    </div>
  )
}

export default Home
