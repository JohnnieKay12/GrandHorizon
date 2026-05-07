import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiPhone } from 'react-icons/fi'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  const handleExploreRooms = () => {
    setIsMobileMenuOpen(false)
    navigate('/rooms')
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHomePage
            ? isScrolled
              ? 'bg-white shadow-lg py-3'
              : 'bg-transparent py-5'
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
              <a
                href="tel:+2348012345678"
                className="flex items-center gap-1 hover:text-gold-400"
              >
                <FiPhone className="w-4 h-4" />
                <span>+234 801 234 5678</span>
              </a>

              <span className="hidden md:block">
                Book your perfect stay today
              </span>
            </div>
          </motion.div>
        )}

        <div className="container-custom">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="text-2xl md:text-3xl font-bold">
              <span
                className={
                  isHomePage && !isScrolled
                    ? 'text-white'
                    : 'text-primary-900'
                }
              >
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
                    isHomePage && !isScrolled
                      ? 'text-white'
                      : 'text-gray-700'
                  } ${
                    isActive(link.path) ? 'text-gold-400' : ''
                  }`}
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

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-4">

              <button
                onClick={handleExploreRooms}
                className="px-6 py-2.5 bg-primary-900 text-white rounded-lg"
              >
                Explore Rooms
              </button>

              <button
                onClick={handleExploreRooms}
                className="px-6 py-2.5 bg-gold-400 text-primary-900 rounded-lg"
              >
                Book Now
              </button>

            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden ${
                isHomePage && !isScrolled
                  ? 'text-white'
                  : 'text-primary-900'
              }`}
            >
              {isMobileMenuOpen ? (
                <FiX size={24} />
              ) : (
                <FiMenu size={24} />
              )}
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
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <div className="absolute right-0 w-80 h-full bg-white p-6 pt-20">

              {/* Mobile Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block py-3 text-lg"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Buttons */}
              <button
                onClick={handleExploreRooms}
                className="mt-6 w-full py-3 bg-primary-900 text-white rounded-lg"
              >
                Explore Rooms
              </button>

              <button
                onClick={handleExploreRooms}
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