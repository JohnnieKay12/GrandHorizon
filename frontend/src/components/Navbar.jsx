import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiPhone } from 'react-icons/fi'

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const profileRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()

  const isHomePage = location.pathname === '/'

  // ✅ FIXED click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsProfileOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  const handleGetStarted = () => {
    setIsMobileMenuOpen(false) // 👈 close menu first
  
    if (isAuthenticated) {
      navigate('/rooms')
    } else {
      navigate('/login?redirect=rooms')
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHomePage
            ? (isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5')
            : 'bg-white shadow-lg py-3'
        }`}
      >
        {/* Top Bar */}
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-primary-900 text-white py-2"
          >
            <div className="container-custom flex justify-between items-center text-sm">
              <a href="tel:+2348012345678" className="flex items-center gap-1 hover:text-gold-400">
                <FiPhone className="w-4 h-4" />
                <span>+234 801 234 5678</span>
              </a>
              <span className="hidden md:block">Book your perfect stay today</span>
            </div>
          </motion.div>
        )}

        <div className="container-custom">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="text-2xl md:text-3xl font-bold">
              <span className={isHomePage && !isScrolled ? 'text-white' : 'text-primary-900'}>
                Grand<span className="text-gold-400">Horizon</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative ${
                    isHomePage && !isScrolled ? 'text-white' : 'text-gray-700'
                  } ${isActive(link.path) ? 'text-gold-400' : ''}`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-400"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Right */}
            <div className="hidden lg:flex items-center gap-4">

              {!isAuthenticated ? (
                <button
                  onClick={handleGetStarted}
                  className="px-6 py-2.5 bg-primary-900 text-white rounded-lg"
                >
                  Get Started
                </button>
              ) : (
                <div className="relative" ref={profileRef}>

                  {/* Avatar */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsProfileOpen(!isProfileOpen)
                    }}
                    className="w-10 h-10 rounded-full bg-gold-400 text-primary-900 flex items-center justify-center cursor-pointer font-bold shadow-md hover:scale-105 transition"
                  >
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl p-4 z-50"
                      >
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm text-gray-500 mb-3">{user?.email}</p>

                        <div className="border-t pt-2 space-y-2">
                          <button onClick={() => navigate('/my-bookings')} className="w-full text-left py-2 hover:bg-gray-100 rounded">
                            My Bookings
                          </button>
                          <button onClick={() => navigate('/profile')} className="w-full text-left py-2 hover:bg-gray-100 rounded">
                            Manage Account
                          </button>
                          <button onClick={logout} className="w-full text-left py-2 text-red-500 hover:bg-red-50 rounded">
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <button
                onClick={handleGetStarted}
                className="px-6 py-2.5 bg-gold-400 text-primary-900 rounded-lg"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden ${isScrolled ? 'text-primary-900' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />

            <div className="absolute right-0 w-80 h-full bg-white p-6 pt-20">

              {/* Links */}
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="block py-3 text-lg">
                  {link.name}
                </Link>
              ))}

              {/* ✅ Mobile User Section */}
              {isAuthenticated ? (
                <div className="mt-6 border-t pt-4">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-500 mb-3">{user?.email}</p>

                  <button onClick={() => navigate('/my-bookings')}>
                    My Bookings
                  </button>

                  <button onClick={() => navigate('/profile')} className="block w-full text-left py-2">
                    Manage Account
                  </button>

                  <button onClick={logout} className="block w-full text-left py-2 text-red-500">
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleGetStarted}
                  className="mt-6 w-full py-3 bg-primary-900 text-white rounded-lg"
                >
                  Get Started
                </button>
              )}

              <button
                onClick={handleGetStarted}
                className="mt-4 w-full py-3 bg-gold-400 rounded-lg"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar