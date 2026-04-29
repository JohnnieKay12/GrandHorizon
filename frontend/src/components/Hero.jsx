import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi'
import { ChevronRight, Star, ArrowRight } from 'lucide-react';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
    title: 'Welcome to Grand Horizon',
    subtitle: 'Experience Luxury Like Never Before',
    description: 'Indulge in world-class hospitality and create unforgettable memories at our prestigious hotel.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80',
    title: 'Elegant Accommodations',
    subtitle: 'Your Comfort is Our Priority',
    description: 'Discover our beautifully appointed rooms and suites designed for the ultimate relaxation.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80',
    title: 'World-Class Amenities',
    subtitle: 'Luxury at Every Corner',
    description: 'From our spa to fine dining, experience excellence in every aspect of your stay.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80',
    title: 'Unforgettable Moments',
    subtitle: 'Create Lasting Memories',
    description: 'Let us make your special occasions truly extraordinary with our exceptional service.',
  },
]

const Hero = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate('/rooms')
    } else {
      navigate('/login?redirect=rooms')
    }
  }
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  // Auto-slide
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  const slideVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: 'easeOut',
      },
    }),
  }

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="max-w-2xl"
            >
              {/* Subtitle */}
              <motion.p
                custom={0}
                variants={textVariants}
                className="text-gold-400 text-sm md:text-base font-medium tracking-wider uppercase mb-4"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>

              {/* Title */}
              <motion.h1
                custom={1}
                variants={textVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight"
              >
                {heroSlides[currentSlide].title}
              </motion.h1>

              {/* Description */}
              <motion.p
                custom={2}
                variants={textVariants}
                className="text-gray-200 text-lg md:text-xl mb-8 leading-relaxed"
              >
                {heroSlides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                custom={3}
                variants={textVariants}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={handleBookNow}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gold-400 text-primary-900 
                          rounded-lg font-semibold hover:bg-gold-500 transition-all duration-300 
                          hover:shadow-lg hover:-translate-y-1"
                >
                  Book Now
                  <FiArrowRight className="w-5 h-5" />
                </button>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white 
                           rounded-lg font-semibold hover:bg-white hover:text-primary-900 
                           transition-all duration-300"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 z-20 flex justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center
                    text-white hover:bg-gold-400 hover:text-primary-900 transition-all duration-300
                    pointer-events-auto"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center
                    text-white hover:bg-gold-400 hover:text-primary-900 transition-all duration-300
                    pointer-events-auto"
          aria-label="Next slide"
        >
          <FiChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-10 bg-gold-400' : 'w-2 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide && (
              <motion.div
                layoutId="activeSlide"
                className="absolute inset-0 bg-gold-400 rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 right-8 z-20 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs tracking-wider uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero