import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiSearch } from 'react-icons/fi'
import SectionTitle from '../../components/SectionTitle'

const faqs = [
  {
    category: 'Booking',
    questions: [
      {
        q: 'How do I make a reservation?',
        a: 'You can make a reservation directly through our website by selecting your preferred room, dates, and completing the booking form. Alternatively, you can call us at +234 801 234 5678 or email us at reservations@grandhorizon.com.',
      },
      {
        q: 'Can I modify or cancel my booking?',
        a: 'Yes, you can modify or cancel your booking up to 24 hours before your check-in date for a full refund. Cancellations made within 24 hours of check-in are subject to a charge for the first night.',
      },
      {
        q: 'Do you require a deposit?',
        a: 'We require a valid credit card to guarantee your reservation. Payment is processed at check-in, or you can choose to pay online during booking for added convenience.',
      },
    ],
  },
  {
    category: 'Check-in/Check-out',
    questions: [
      {
        q: 'What are the check-in and check-out times?',
        a: 'Check-in time is 2:00 PM and check-out time is 12:00 PM. Early check-in and late check-out can be arranged upon request, subject to availability and additional charges.',
      },
      {
        q: 'Can I request an early check-in or late check-out?',
        a: 'Yes, early check-in and late check-out requests are subject to availability. Please contact us in advance to make arrangements. Additional fees may apply.',
      },
      {
        q: 'What documents do I need for check-in?',
        a: 'Please present a valid government-issued ID (passport, driver\'s license, or national ID card) and the credit card used for booking at check-in.',
      },
    ],
  },
  {
    category: 'Amenities',
    questions: [
      {
        q: 'What amenities are included in the room rate?',
        a: 'All room rates include complimentary Wi-Fi, breakfast, access to the swimming pool and fitness center, and parking. Additional amenities vary by room category.',
      },
      {
        q: 'Is breakfast included?',
        a: 'Yes, a complimentary breakfast buffet is included with all room bookings. Breakfast is served from 6:30 AM to 10:30 AM in our main restaurant.',
      },
      {
        q: 'Do you have a swimming pool?',
        a: 'Yes, we have a beautiful outdoor swimming pool open daily from 7:00 AM to 9:00 PM. Pool towels are provided, and our poolside bar offers refreshments throughout the day.',
      },
    ],
  },
  {
    category: 'Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, bank transfers, and cash payments in Nigerian Naira. We also accept Paystack for online payments.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Absolutely. We use industry-standard SSL encryption to protect your payment information. We are PCI DSS compliant and never store your full credit card details.',
      },
      {
        q: 'Do you offer corporate rates?',
        a: 'Yes, we offer special corporate rates for business travelers and companies. Please contact our sales team at sales@grandhorizon.com for more information.',
      },
    ],
  },
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Flatten FAQs for search
  const allFAQs = faqs.flatMap(cat => 
    cat.questions.map(q => ({ ...q, category: cat.category }))
  )

  const filteredFAQs = searchQuery
    ? allFAQs.filter(faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allFAQs

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom max-w-4xl">
        <SectionTitle
          subtitle="FAQ"
          title="Frequently Asked Questions"
          description="Find answers to common questions about our hotel, services, and policies."
        />

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
        >
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-sm border border-gray-200 
                     focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </motion.div>

        {/* FAQs */}
        <div className="space-y-4">
          {searchQuery ? (
            // Search Results
            filteredFAQs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))
          ) : (
            // Categorized FAQs
            faqs.map((category, catIndex) => (
              <div key={category.category} className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.category}</h3>
                <div className="space-y-3">
                  {category.questions.map((faq, qIndex) => {
                    const globalIndex = catIndex * 100 + qIndex
                    return (
                      <FAQItem
                        key={globalIndex}
                        faq={faq}
                        isOpen={openIndex === globalIndex}
                        onToggle={() => toggleFAQ(globalIndex)}
                      />
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-primary-50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help. Contact us for personalized assistance.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-900 text-white 
                     rounded-lg font-medium hover:bg-primary-800 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  )
}

const FAQItem = ({ faq, isOpen, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-sm overflow-hidden"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
    >
      <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
      <FiChevronDown 
        className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} 
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-5 pb-5 text-gray-600 leading-relaxed">
            {faq.a}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
)

export default FAQ
