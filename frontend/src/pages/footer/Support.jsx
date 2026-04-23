import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMessageCircle, FiHelpCircle, FiFileText, FiShield } from 'react-icons/fi'
import SectionTitle from '../../components/SectionTitle'

const supportOptions = [
  {
    icon: FiPhone,
    title: 'Phone Support',
    description: 'Speak directly with our customer service team',
    contact: '+234 801 234 5678',
    link: 'tel:+2348012345678',
    availability: '24/7',
  },
  {
    icon: FiMail,
    title: 'Email Support',
    description: 'Send us an email and we will respond within 24 hours',
    contact: 'support@grandhorizon.com',
    link: 'mailto:support@grandhorizon.com',
    availability: '24/7',
  },
  {
    icon: FiMessageCircle,
    title: 'WhatsApp Chat',
    description: 'Chat with us on WhatsApp for quick assistance',
    contact: '+234 801 234 5678',
    link: 'https://wa.me/2348012345678',
    availability: '24/7',
  },
]

const quickLinks = [
  {
    icon: FiHelpCircle,
    title: 'FAQ',
    description: 'Find answers to common questions',
    link: '/faq',
  },
  {
    icon: FiFileText,
    title: 'Terms of Service',
    description: 'Read our terms and conditions',
    link: '/terms',
  },
  {
    icon: FiShield,
    title: 'Privacy Policy',
    description: 'Learn how we protect your data',
    link: '/privacy',
  },
]

const Support = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=1920&q=80"
          alt="Support"
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
                We're Here to Help
              </p>
              <h1 className="heading-xl text-white max-w-2xl">
                Customer Support
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle
            subtitle="Get in Touch"
            title="How Can We Help You?"
            description="Our support team is available 24/7 to assist you with any questions or concerns."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <motion.a
                key={option.title}
                href={option.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <option.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <p className="text-primary-600 font-medium mb-2">{option.contact}</p>
                <p className="text-sm text-gray-500">Available: {option.availability}</p>
              </motion.a>
            ))}
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md p-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Quick Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <a
                  key={link.title}
                  href={link.link}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <link.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{link.title}</h3>
                    <p className="text-gray-600 text-sm">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Send Us a Message
            </h2>
            <p className="text-gray-600">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Full Name *</label>
                <input type="text" className="input-field" placeholder="Your name" required />
              </div>
              <div>
                <label className="label">Email Address *</label>
                <input type="email" className="input-field" placeholder="your@email.com" required />
              </div>
            </div>
            <div>
              <label className="label">Subject *</label>
              <input type="text" className="input-field" placeholder="How can we help?" required />
            </div>
            <div>
              <label className="label">Message *</label>
              <textarea className="input-field resize-none" rows={5} placeholder="Describe your issue or question..." required />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-primary-900 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="section-padding bg-primary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="heading-lg text-white mb-4">
              Emergency Contact
            </h2>
            <p className="text-gray-300 mb-8">
              For urgent matters during your stay, please contact our front desk immediately.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+2348012345678"
                className="px-8 py-4 bg-gold-400 text-primary-900 rounded-lg font-semibold hover:bg-gold-500 transition-colors"
              >
                Call Front Desk
              </a>
              <a
                href="https://wa.me/2348012345678"
                className="px-8 py-4 bg-white text-primary-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Support
