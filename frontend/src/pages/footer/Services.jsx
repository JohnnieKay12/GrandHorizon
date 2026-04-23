import { motion } from 'framer-motion'
import { 
  FiWifi, 
  FiCoffee, 
  FiDroplet, 
  FiMonitor, 
  // FiCar, 
  FiShield,
  FiWind,
  FiClock,
  FiBriefcase,
  FiUsers,
  FiHeart,
  // FiUtensils
} from 'react-icons/fi'
import { FaCar, FaUtensils } from 'react-icons/fa'
import SectionTitle from '../../components/SectionTitle'

const services = [
  {
    icon: FiWifi,
    title: 'Free High-Speed WiFi',
    description: 'Stay connected with complimentary high-speed internet access throughout the hotel premises.',
  },
  {
    icon: FiCoffee,
    title: 'Complimentary Breakfast',
    description: 'Start your day with our delicious breakfast buffet featuring local and international cuisine.',
  },
  {
    icon: FiDroplet,
    title: 'Swimming Pool',
    description: 'Relax and unwind in our pristine outdoor swimming pool with poolside bar service.',
  },
  {
    icon: FiMonitor,
    title: 'Business Center',
    description: 'Fully equipped business center with computers, printers, and meeting facilities.',
  },
  {
    icon: FaCar,
    title: 'Airport Transfer',
    description: 'Convenient airport pickup and drop-off services available upon request.',
  },
  {
    icon: FiShield,
    title: '24/7 Security',
    description: 'Round-the-clock security personnel and surveillance for your peace of mind.',
  },
  {
    icon: FiWind,
    title: 'Fitness Center',
    description: 'State-of-the-art gym equipment available for guests to maintain their fitness routine.',
  },
  {
    icon: FiClock,
    title: 'Room Service',
    description: 'Enjoy delicious meals and refreshments delivered to your room anytime, day or night.',
  },
  {
    icon: FiBriefcase,
    title: 'Conference Facilities',
    description: 'Professional meeting and conference rooms equipped with modern AV technology.',
  },
  {
    icon: FiUsers,
    title: 'Event Planning',
    description: 'Expert event planning services for weddings, corporate events, and special occasions.',
  },
  {
    icon: FiHeart,
    title: 'Spa & Wellness',
    description: 'Rejuvenate your body and mind with our range of spa treatments and wellness services.',
  },
  {
    icon: FaUtensils,
    title: 'Fine Dining',
    description: 'Experience culinary excellence at our on-site restaurants serving gourmet dishes.',
  },
]

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Hotel Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-900/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gold-400 text-sm font-medium tracking-wider uppercase mb-3">
                What We Offer
              </p>
              <h1 className="heading-xl text-white max-w-2xl">
                Our Services
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle
            subtitle="Amenities & Services"
            title="World-Class Facilities"
            description="We offer a comprehensive range of services designed to make your stay comfortable, convenient, and memorable."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Services CTA */}
      <section className="py-20 bg-primary-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-gold-400 text-sm font-medium tracking-wider uppercase mb-3">
                Premium Services
              </p>
              <h2 className="heading-lg text-white mb-6">
                Experience Luxury at Its Finest
              </h2>
              <p className="text-gray-300 mb-6">
                Our dedicated concierge team is available 24/7 to assist with any request, 
                from restaurant reservations to transportation arrangements. We go above and 
                beyond to ensure your stay exceeds expectations.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold-400 rounded-full" />
                  Personal concierge services
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold-400 rounded-full" />
                  VIP treatment and amenities
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold-400 rounded-full" />
                  Customized experiences
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gold-400 rounded-full" />
                  Exclusive access to events
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80"
                alt="Premium Services"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gold-400 text-primary-900 p-6 rounded-xl">
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm font-medium">Concierge Service</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg text-gray-900 mb-4">
              Ready to Experience Our Services?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Book your stay today and enjoy all the amenities and services Grand Horizon Hotel has to offer.
            </p>
            <a
              href="/rooms"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-900 text-white 
                       rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              Book Your Stay
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
