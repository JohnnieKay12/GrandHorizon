import { motion } from 'framer-motion'
import SectionTitle from '../../components/SectionTitle'

const Refund = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container-custom max-w-4xl">
        <SectionTitle
          subtitle="Policies"
          title="Refund Policy"
          description="Our refund and cancellation policies for hotel bookings."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 md:p-12"
        >
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })}
          </p>

          {/* Policy Overview */}
          <div className="bg-primary-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Quick Overview</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Full refund for cancellations 24+ hours before check-in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 font-bold">!</span>
                <span>First night charged for cancellations within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">✗</span>
                <span>No refund for no-shows</span>
              </li>
            </ul>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Cancellation Policy</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                At Grand Horizon Hotel, we understand that plans can change. Our cancellation policy is designed 
                to be fair and transparent while allowing us to manage our room inventory effectively.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Standard Cancellation</h4>
                <p>
                  Cancellations made at least 24 hours before the scheduled check-in time (2:00 PM) 
                  are eligible for a full refund of the deposit or prepayment.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Late Cancellation</h4>
                <p>
                  Cancellations made less than 24 hours before check-in will result in a charge 
                  equivalent to one night's stay. The remaining balance will be refunded.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">No-Show Policy</h4>
                <p>
                  Guests who fail to arrive on the scheduled check-in date without prior cancellation 
                  will be charged the full reservation amount.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Refund Process</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Refunds are processed using the original payment method whenever possible. Here's what to expect:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2">
                <li>Refund request is submitted through our website or customer service</li>
                <li>Request is reviewed and approved within 24-48 hours</li>
                <li>Refund is processed to the original payment method</li>
                <li>Credit card refunds may take 5-10 business days to appear on your statement</li>
                <li>Bank transfer refunds are processed within 3-5 business days</li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Early Departure</h2>
            <p className="text-gray-600 mb-4">
              If you choose to check out earlier than your scheduled departure date, please inform the 
              front desk at least 24 hours in advance. Refunds for unused nights are subject to our 
              cancellation policy and may not be granted for early departures.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Special Circumstances</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We understand that emergencies happen. In cases of documented emergencies (medical emergencies, 
                natural disasters, flight cancellations), we may offer more flexible cancellation terms. 
                Please contact us as soon as possible to discuss your situation.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Group Bookings</h2>
            <p className="text-gray-600 mb-4">
              Group bookings (5 rooms or more) may be subject to different cancellation terms. 
              Please refer to your group booking agreement or contact our group sales team for 
              specific cancellation and refund policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Promotional Rates</h2>
            <p className="text-gray-600 mb-4">
              Reservations made at promotional or discounted rates may have different cancellation 
              policies. Please review the specific terms associated with your promotional rate at 
              the time of booking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              For questions about cancellations or refunds, please contact our reservations team:
            </p>
            <div className="text-gray-600">
              <p>Email: reservations@grandhorizon.com</p>
              <p>Phone: +234 801 234 5678</p>
              <p>Hours: 24/7</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}

export default Refund
