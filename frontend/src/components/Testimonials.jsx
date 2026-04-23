import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    id: 1,
    name: 'Chinedu Okonkwo',
    role: 'Business Traveler',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 5,
    text: 'Absolutely fantastic experience! The staff went above and beyond to make my business trip comfortable. The room was immaculate and the amenities were top-notch. Will definitely be returning!',
  },
  {
    id: 2,
    name: 'Amara Okafor',
    role: 'Honeymoon Guest',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 5,
    text: 'We stayed here for our honeymoon and it was magical! The honeymoon suite exceeded our expectations. The romantic setup, the view, and the exceptional service made our stay unforgettable.',
  },
  {
    id: 3,
    name: 'Emmanuel Adeyemi',
    role: 'Family Vacation',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    rating: 5,
    text: 'Perfect for families! The kids loved the pool and the family suite was spacious and comfortable. The restaurant had great options for everyone. Highly recommend for family getaways!',
  },
  {
    id: 4,
    name: 'Ngozi Ibrahim',
    role: 'Event Planner',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    rating: 5,
    text: 'I organized a corporate event here and the team was incredibly professional. The conference facilities were excellent and the catering was superb. Our clients were very impressed!',
  },
  {
    id: 5,
    name: 'Olumide Johnson',
    role: 'Leisure Traveler',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    rating: 5,
    text: 'The attention to detail is remarkable. From the moment I checked in, I felt like royalty. The spa treatments were divine and the restaurant serves the best cuisine in Lagos!',
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-primary-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold-400 text-sm font-medium tracking-wider uppercase mb-3">
            Testimonials
          </p>
          <h2 className="heading-lg text-white mb-4">
            What Our Guests Say
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued guests have to say about their experience.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12"
              >
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center">
                    <FaQuoteLeft className="w-8 h-8 text-primary-900" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FiStar key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-white text-lg md:text-xl text-center leading-relaxed mb-8">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div className="flex flex-col items-center">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-gold-400 mb-4"
                  />
                  <h4 className="text-white font-semibold text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center
                         text-white hover:bg-gold-400 hover:text-primary-900 transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center
                         text-white hover:bg-gold-400 hover:text-primary-900 transition-all duration-300"
                aria-label="Next testimonial"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'w-8 bg-gold-400' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
