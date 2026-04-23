import { motion } from 'framer-motion'
import SectionTitle from '../../components/SectionTitle'

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom max-w-4xl">
        <SectionTitle
          subtitle="Legal"
          title="Privacy Policy"
          description="Learn how we collect, use, and protect your personal information."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 md:p-12 prose max-w-none"
        >
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Grand Horizon Hotel ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your personal information when you use our website, 
              make reservations, or stay at our hotel.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, phone number, postal address</li>
              <li><strong>Booking Information:</strong> Reservation dates, room preferences, special requests</li>
              <li><strong>Payment Information:</strong> Credit card details (processed securely through Paystack)</li>
              <li><strong>Identification:</strong> Government-issued ID for verification purposes</li>
              <li><strong>Usage Data:</strong> IP address, browser type, pages visited on our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Processing and confirming your reservations</li>
              <li>Providing customer service and support</li>
              <li>Sending booking confirmations and updates</li>
              <li>Processing payments</li>
              <li>Improving our services and website</li>
              <li>Complying with legal obligations</li>
              <li>Marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Payment processors (Paystack) for transaction processing</li>
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. Our website uses SSL encryption 
              to secure data transmission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies</h2>
            <p className="text-gray-600 mb-4">
              Our website uses cookies to enhance your browsing experience. You can control cookie settings through 
              your browser preferences. Disabling cookies may affect some website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="text-gray-600 mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
              policy, unless a longer retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="text-gray-600">
              <p>Grand Horizon Hotel</p>
              <p>123 Luxury Avenue, Victoria Island</p>
              <p>Lagos, Nigeria</p>
              <p>Email: privacy@grandhorizon.com</p>
              <p>Phone: +234 801 234 5678</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}

export default Privacy
