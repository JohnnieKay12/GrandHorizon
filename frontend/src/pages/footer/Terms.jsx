import { motion } from 'framer-motion'
import SectionTitle from '../../components/SectionTitle'

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom max-w-4xl">
        <SectionTitle
          subtitle="Legal"
          title="Terms of Service"
          description="Please read these terms carefully before using our services."
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing and using the Grand Horizon Hotel website and services, you agree to be bound by these 
              Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Reservations and Bookings</h2>
            <p className="text-gray-600 mb-4">
              All reservations are subject to availability and confirmation. A valid credit card is required to 
              guarantee your reservation. Rates are quoted in Nigerian Naira (₦) and are subject to applicable taxes.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Check-in time: 2:00 PM</li>
              <li>Check-out time: 12:00 PM</li>
              <li>Early check-in and late check-out are subject to availability</li>
              <li>Valid ID is required at check-in</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cancellation Policy</h2>
            <p className="text-gray-600 mb-4">
              Cancellations made at least 24 hours before the scheduled check-in date will receive a full refund. 
              Cancellations made within 24 hours of check-in will be charged for the first night's stay. 
              No-shows will be charged the full reservation amount.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
            <p className="text-gray-600 mb-4">
              We accept major credit cards, debit cards, and cash payments in Nigerian Naira. All charges must be 
              settled at check-out unless otherwise arranged. Additional charges incurred during your stay must be 
              paid before departure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Guest Responsibilities</h2>
            <p className="text-gray-600 mb-4">
              Guests are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Maintaining the room in good condition</li>
              <li>Reporting any damages or issues immediately</li>
              <li>Following hotel policies and guidelines</li>
              <li>Being respectful of other guests and staff</li>
              <li>Ensuring the safety of personal belongings</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Liability</h2>
            <p className="text-gray-600 mb-4">
              Grand Horizon Hotel is not liable for any loss, damage, or theft of personal property. We recommend 
              guests use the in-room safe for valuables. The hotel reserves the right to charge for any damages 
              caused by guests to hotel property.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, 
              use, and protect your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Modifications to Terms</h2>
            <p className="text-gray-600 mb-4">
              Grand Horizon Hotel reserves the right to modify these terms at any time. Changes will be effective 
              immediately upon posting to the website. Continued use of our services constitutes acceptance of the 
              modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 text-gray-600">
              <p>Grand Horizon Hotel</p>
              <p>123 Luxury Avenue, Victoria Island</p>
              <p>Lagos, Nigeria</p>
              <p>Email: legal@grandhorizon.com</p>
              <p>Phone: +234 801 234 5678</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}

export default Terms
