// Format price in Nigerian Naira
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price).replace('NGN', '₦')
}

// Format date
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  return new Date(date).toLocaleDateString('en-NG', defaultOptions)
}

// Format short date
export const formatShortDate = (date) => {
  return new Date(date).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Calculate nights between two dates
export const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Calculate total price
export const calculateTotal = (pricePerNight, nights) => {
  return pricePerNight * nights
}

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (Nigerian format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[0-9\s-]{10,}$/
  return phoneRegex.test(phone)
}

// Get today's date in YYYY-MM-DD format
export const getToday = () => {
  return new Date().toISOString().split('T')[0]
}

// Get tomorrow's date in YYYY-MM-DD format
export const getTomorrow = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

// Get minimum check-out date (day after check-in)
export const getMinCheckout = (checkIn) => {
  if (!checkIn) return getTomorrow()
  const minCheckout = new Date(checkIn)
  minCheckout.setDate(minCheckout.getDate() + 1)
  return minCheckout.toISOString().split('T')[0]
}

// Generate WhatsApp link
export const generateWhatsAppLink = (phone, message) => {
  const cleanPhone = phone.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

// Scroll to top
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Get category color
export const getCategoryColor = (category) => {
  const colors = {
    cheap: 'bg-green-100 text-green-800',
    standard: 'bg-blue-100 text-blue-800',
    luxury: 'bg-gold-100 text-gold-800',
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

// Get category label
export const getCategoryLabel = (category) => {
  const labels = {
    cheap: 'Budget Friendly',
    standard: 'Standard',
    luxury: 'Luxury',
  }
  return labels[category] || category
}

// Animation variants for Framer Motion
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
}
