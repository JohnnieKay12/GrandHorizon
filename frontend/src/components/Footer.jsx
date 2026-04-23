import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiFacebook, 
  FiInstagram, 
  FiTwitter,
  FiLinkedin,
  FiSend
} from 'react-icons/fi'
import { useState } from 'react'
import toast from 'react-hot-toast'

const Footer = () => {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      toast.success('Thank you for subscribing!')
      setEmail('')
    }
  }

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms', path: '/rooms' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ]

  const supportLinks = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Refund Policy', path: '/refund' },
    { name: 'Support', path: '/support' },
  ]

  const companyLinks = [
    { name: 'Our Services', path: '/services' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
  ]

  const socialLinks = [
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-block mb-6">
              <div className="text-2xl font-serif font-bold">
                Grand<span className="text-gold-400">Horizon</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience luxury and comfort at its finest. Our hotel offers world-class 
              amenities and exceptional service for an unforgettable stay.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center 
                           hover:bg-gold-400 hover:text-primary-900 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-gold-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-gold-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support & Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-gold-400">Support</h3>
            <ul className="space-y-3 mb-8">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-gold-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mb-4 text-gold-400">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-gold-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-6 text-gold-400">Contact Us</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  123 Luxury Avenue, Victoria Island,<br />
                  Lagos, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href="tel:+2348012345678" className="text-gray-300 hover:text-gold-400 transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href="mailto:info@grandhorizon.com" className="text-gray-300 hover:text-gold-400 transition-colors">
                  info@grandhorizon.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gold-400">Newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                           text-white placeholder-gray-400 focus:outline-none focus:border-gold-400"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gold-400 text-primary-900 rounded-lg 
                           hover:bg-gold-500 transition-colors"
                  aria-label="Subscribe"
                >
                  <FiSend className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Grand Horizon Hotel. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="text-gray-400 hover:text-gold-400 transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-gold-400 transition-colors">
                Privacy
              </Link>
              <Link to="/refund" className="text-gray-400 hover:text-gold-400 transition-colors">
                Refund
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer