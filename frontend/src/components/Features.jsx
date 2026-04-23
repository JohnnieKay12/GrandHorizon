import { motion } from 'framer-motion'
import { 
  FiWifi, 
  FiCoffee, 
  FiDroplet, 
  FiMonitor,
  // FiCar,
  FiShield,
  FiWind,
  FiClock
} from 'react-icons/fi'

import { FaCar } from 'react-icons/fa'

const features = [
  {
    icon: FiWifi,
    title: 'Free High-Speed WiFi',
    description: 'Stay connected with complimentary high-speed internet throughout the hotel.',
  },
  {
    icon: FiCoffee,
    title: 'Complimentary Breakfast',
    description: 'Start your day with a delicious breakfast buffet featuring local and international cuisine.',
  },
  {
    icon: FiDroplet,
    title: 'Swimming Pool',
    description: 'Relax and unwind in our pristine outdoor swimming pool with poolside service.',
  },
  {
    icon: FiMonitor,
    title: 'Smart TV & Entertainment',
    description: 'Enjoy premium channels and streaming services on large flat-screen TVs in every room.',
  },
  {
    icon: FaCar,
    title: 'Free Parking',
    description: 'Convenient on-site parking available for all our guests at no extra charge.',
  },
  {
    icon: FiShield,
    title: '24/7 Security',
    description: 'Your safety is our priority with round-the-clock security and surveillance.',
  },
  {
    icon: FiWind,
    title: 'Air Conditioning',
    description: 'Climate-controlled rooms ensuring your comfort in any weather.',
  },
  {
    icon: FiClock,
    title: '24-Hour Room Service',
    description: 'Enjoy delicious meals and refreshments delivered to your room anytime.',
  },
]

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary-600 text-sm font-medium tracking-wider uppercase mb-3">
            Our Amenities
          </p>
          <h2 className="heading-lg text-gray-900 mb-4">
            World-Class Facilities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of premium amenities to ensure your stay is comfortable, 
            convenient, and truly memorable.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl 
                       transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center 
                            mb-4 group-hover:bg-primary-900 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary-900 group-hover:text-gold-400 transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
