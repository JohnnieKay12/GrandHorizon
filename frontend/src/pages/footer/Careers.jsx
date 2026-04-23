import { motion } from 'framer-motion'
import { FiMapPin, FiBriefcase, FiClock, FiDollarSign, FiCheck } from 'react-icons/fi'
import SectionTitle from '../../components/SectionTitle'

const benefits = [
  'Competitive salary and benefits package',
  'Health insurance coverage',
  'Professional development opportunities',
  'Staff meals and accommodation options',
  'Paid time off and holidays',
  'Employee recognition programs',
  'Training and career growth',
  'Friendly work environment',
]

const openings = [
  {
    title: 'Front Desk Agent',
    department: 'Guest Services',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦150,000 - ₦200,000/month',
    description: 'We are looking for a friendly and professional Front Desk Agent to welcome guests and handle check-in/check-out procedures.',
  },
  {
    title: 'Housekeeping Supervisor',
    department: 'Housekeeping',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦180,000 - ₦250,000/month',
    description: 'Responsible for supervising housekeeping staff and ensuring rooms meet our high cleanliness standards.',
  },
  {
    title: 'Sous Chef',
    department: 'Food & Beverage',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦300,000 - ₦400,000/month',
    description: 'Assist the Executive Chef in menu planning, food preparation, and kitchen management.',
  },
  {
    title: 'Marketing Manager',
    department: 'Sales & Marketing',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦400,000 - ₦600,000/month',
    description: 'Develop and implement marketing strategies to increase hotel visibility and drive bookings.',
  },
]

const Careers = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1920&q=80"
          alt="Careers"
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
                Join Our Team
              </p>
              <h1 className="heading-xl text-white max-w-2xl">
                Careers at Grand Horizon
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionTitle
                subtitle="Why Join Us"
                title="Be Part of Something Special"
                align="left"
              />
              <p className="text-gray-600 mb-6">
                At Grand Horizon Hotel, we believe our people are our greatest asset. We are committed 
                to creating a workplace where everyone can thrive, grow, and make a difference in the 
                lives of our guests.
              </p>
              <p className="text-gray-600 mb-8">
                Join our team of hospitality professionals and embark on a rewarding career journey 
                with one of Nigeria's premier hotels.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiCheck className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
                alt="Our Team"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-900 text-white p-6 rounded-xl">
                <p className="text-4xl font-bold text-gold-400">50+</p>
                <p className="text-sm">Team Members</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionTitle
            subtitle="Current Openings"
            title="Join Our Team"
            description="Explore our current job opportunities and find your perfect role."
          />

          <div className="space-y-6">
            {openings.map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-primary-600 font-medium">{job.department}</p>
                  </div>
                  <button className="px-6 py-2 bg-primary-900 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors">
                    Apply Now
                  </button>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FiMapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <FiBriefcase className="w-4 h-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1">
                    <FiDollarSign className="w-4 h-4" />
                    {job.salary}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-primary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-gold-400 text-sm font-medium tracking-wider uppercase mb-3">
              How to Apply
            </p>
            <h2 className="heading-lg text-white mb-4">
              Application Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Submit Application', desc: 'Send your CV and cover letter' },
              { step: '2', title: 'Initial Review', desc: 'Our HR team reviews your application' },
              { step: '3', title: 'Interview', desc: 'Meet with the hiring team' },
              { step: '4', title: 'Welcome Aboard', desc: 'Join the Grand Horizon family' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-900">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-50 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Send us your CV 
              and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:careers@grandhorizon.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-900 text-white 
                       rounded-lg font-semibold hover:bg-primary-800 transition-colors"
            >
              Send Your CV
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Careers
