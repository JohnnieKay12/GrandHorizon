import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiSearch } from 'react-icons/fi'
import Hero from '../components/Hero'
import RoomCard from '../components/RoomCard'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import GoogleMap from '../components/GoogleMap'
import LoadingSpinner from '../components/LoadingSpinner'
import { roomAPI, bookingAPI } from '../services/api'
import { getToday, getTomorrow } from '../utils/helpers'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const [featuredRooms, setFeaturedRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [checking, setChecking] = useState(false)
  const [availability, setAvailability] = useState(null)

  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const [searchData, setSearchData] = useState({
    checkIn: getToday(),
    checkOut: getTomorrow(),
    guests: 2,
  })

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await roomAPI.getFeatured()
        if (res.success) setFeaturedRooms(res.data.slice(0, 6))
      } catch {
        toast.error('Failed to load rooms')
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  // Handle inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchData((prev) => ({ ...prev, [name]: value }))
  }

  // Debounced availability check
  useEffect(() => {
    if (!featuredRooms.length) return

    const delay = setTimeout(async () => {
      try {
        setChecking(true)

        const res = await bookingAPI.checkAvailability({
          roomId: featuredRooms[0]._id,
          checkIn: searchData.checkIn,
          checkOut: searchData.checkOut,
        })

        if (res.success) setAvailability(res.data)
      } catch {
        // silent
      } finally {
        setChecking(false)
      }
    }, 800)

    return () => clearTimeout(delay)
  }, [searchData, featuredRooms])

  const handleSearch = (e) => {
    e.preventDefault()
    localStorage.setItem('searchData', JSON.stringify(searchData))
    navigate('/rooms')
  }

  // Counter Component
  const Counter = ({ end }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      let start = 0
      const duration = 1500
      const step = end / (duration / 16)

      const timer = setInterval(() => {
        start += step
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }, [end])

    return <span>{count}</span>
  }

  return (
    <div>

      {/* HERO */}
      <Hero />

      {/* SEARCH (SaaS STYLE) */}
      <section className="relative z-20 px-4 -mt-16 md:-mt-20">
        <div className="container-custom">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-8"
          >

            <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4">

              <input
                type="date"
                name="checkIn"
                value={searchData.checkIn}
                min={getToday()}
                onChange={handleChange}
                className="input-field"
              />

              <input
                type="date"
                name="checkOut"
                value={searchData.checkOut}
                min={searchData.checkIn}
                onChange={handleChange}
                className="input-field"
              />

              <select
                name="guests"
                value={searchData.guests}
                onChange={handleChange}
                className="input-field"
              >
                {[1,2,3,4,5].map(n => (
                  <option key={n} value={n}>
                    {n} Guest{n > 1 && 's'}
                  </option>
                ))}
              </select>

              {/* 🔥 NAVBAR STYLE BUTTON */}
              <button className="bg-gold-400 text-primary-900 font-semibold rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-all">
                <FiSearch /> Check Availability
              </button>

            </form>

            {/* LIVE AVAILABILITY */}
            <div className="mt-4 text-sm">
              {checking ? (
                <p className="text-gray-500 animate-pulse">
                  Checking availability...
                </p>
              ) : availability ? (
                availability.isAvailable ? (
                  <p className="text-green-600 font-medium">
                    ✅ Available • ₦{availability.totalAmount}
                  </p>
                ) : (
                  <p className="text-red-500">
                    ❌ Not available for selected dates
                  </p>
                )
              ) : null}
            </div>

          </motion.div>
        </div>
      </section>

      {/* FEATURED ROOMS */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">

          <h2 className="heading-lg text-center mb-10">
            Featured Rooms
          </h2>

          {loading ? <LoadingSpinner /> : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredRooms.map((room, i) => (
                <RoomCard key={room._id} room={room} index={i} />
              ))}
            </div>
          )}

          {/* 🔥 STRONG CTA */}
          <div className="text-center mt-12">
            <Link
              to={isAuthenticated ? "/rooms" : "/login"}
              className="bg-gold-400 text-primary-900 px-8 py-4 rounded-lg font-semibold hover:scale-105 transition inline-flex items-center gap-2 shadow-md"
            >
              Book Now <FiArrowRight />
            </Link>
          </div>

        </div>
      </section>

      {/* STATS (REAL ANIMATION) */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h2 className="text-4xl font-bold text-gold-400">
              <Counter end={500} />+
            </h2>
            <p className="text-gray-300">Happy Guests</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gold-400">
              <Counter end={50} />+
            </h2>
            <p className="text-gray-300">Rooms</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gold-400">
              <Counter end={15} />+
            </h2>
            <p className="text-gray-300">Years Experience</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gold-400">
              4.9
            </h2>
            <p className="text-gray-300">Rating</p>
          </div>

        </div>
      </section>

      <Features />
      <Testimonials />

      {/* FINAL CTA */}
      <section className="py-20 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Book Your Stay?
        </h2>

        <Link
          to="/rooms"
          className="bg-gold-400 text-primary-900 px-10 py-4 rounded-lg font-bold hover:scale-105 transition shadow-lg"
        >
          Book Your Stay
        </Link>
      </section>

      <GoogleMap />

    </div>
  )
}

export default Home