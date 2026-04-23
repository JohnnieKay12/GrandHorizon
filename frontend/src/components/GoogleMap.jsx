import { motion } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'

const GoogleMap = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary-600 text-sm font-medium tracking-wider uppercase mb-3">
            Find Us
          </p>
          <h2 className="heading-lg text-gray-900 mb-4">
            Our Location
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conveniently located in the heart of Lagos, our hotel offers easy access to 
            major attractions, business districts, and transportation hubs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg h-[400px] lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.728627382!2d3.4245983147705!3d6.428055095346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53280e7648d%3A0x4d5e6f7a8b9c0d1e!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Location"
              />
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Address Card */}
            <div className="bg-primary-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMapPin className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                  <p className="text-gray-600">
                    123 Luxury Avenue<br />
                    Victoria Island<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-primary-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiPhone className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a href="tel:+2348012345678" className="text-gray-600 hover:text-primary-900 transition-colors">
                    +234 801 234 5678
                  </a>
                  <br />
                  <a href="tel:+2348098765432" className="text-gray-600 hover:text-primary-900 transition-colors">
                    +234 809 876 5432
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-primary-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiMail className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:info@grandhorizon.com" className="text-gray-600 hover:text-primary-900 transition-colors">
                    info@grandhorizon.com
                  </a>
                  <br />
                  <a href="mailto:reservations@grandhorizon.com" className="text-gray-600 hover:text-primary-900 transition-colors">
                    reservations@grandhorizon.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-primary-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FiClock className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Reception Hours</h3>
                  <p className="text-gray-600">
                    Open 24/7<br />
                    Check-in: 2:00 PM<br />
                    Check-out: 12:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GoogleMap
