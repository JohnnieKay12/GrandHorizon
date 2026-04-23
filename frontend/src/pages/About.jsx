import { motion } from 'framer-motion'
import { FiAward, FiUsers, FiHeart, FiGlobe } from 'react-icons/fi'
import SectionTitle from '../components/SectionTitle'

const values = [
  {
    icon: FiHeart,
    title: 'Passion for Service',
    description: 'We pour our hearts into every interaction, ensuring each guest feels truly valued and cared for.',
  },
  {
    icon: FiAward,
    title: 'Excellence',
    description: 'We strive for perfection in every detail, from room cleanliness to dining experiences.',
  },
  {
    icon: FiUsers,
    title: 'Guest First',
    description: 'Every decision we make is centered around creating the best possible experience for our guests.',
  },
  {
    icon: FiGlobe,
    title: 'Sustainability',
    description: 'We are committed to eco-friendly practices that protect our environment for future generations.',
  },
]

const team = [
  {
    name: 'Mr. Adebayo Johnson',
    role: 'General Manager',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    bio: 'With over 20 years of hospitality experience, Adebayo leads our team with vision and dedication.',
  },
  {
    name: 'Mrs. Ngozi Okonkwo',
    role: 'Operations Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: 'Ngozi ensures that every aspect of our hotel operations runs smoothly and efficiently.',
  },
  {
    name: 'Chef Emmanuel Adeyemi',
    role: 'Executive Chef',
    image: 'https://images.unsplash.com/photo-1583394293214-28ez8ac94e4a?w=400&h=400&fit=crop',
    bio: 'Emmanuel brings culinary excellence to our kitchen, creating unforgettable dining experiences.',
  },
  {
    name: 'Miss Amara Okafor',
    role: 'Guest Relations Manager',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    bio: 'Amara and her team ensure every guest receives personalized attention and care.',
  },
]

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Hotel Exterior"
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
                About Us
              </p>
              <h1 className="heading-xl text-white max-w-2xl">
                Our Story of Excellence
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionTitle
                subtitle="Our Story"
                title="A Legacy of Hospitality"
                align="left"
              />
              <div className="prose max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  Founded in 2008, Grand Horizon Hotel began with a simple yet powerful vision: 
                  to create a sanctuary of luxury and comfort in the heart of Lagos. What started 
                  as a boutique hotel has grown into one of Nigeria's most prestigious hospitality 
                  destinations.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Over the years, we have welcomed guests from around the world – from business 
                  travelers and honeymooners to families and celebrities. Each guest has become 
                  part of our story, and their feedback has shaped our continuous pursuit of excellence.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, Grand Horizon stands as a testament to Nigerian hospitality at its finest. 
                  Our commitment to world-class service, combined with our deep respect for local 
                  culture and traditions, creates an experience that is both authentically African 
                  and internationally refined.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80"
                alt="Hotel Interior"
                className="w-full h-48 object-cover rounded-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80"
                alt="Hotel Pool"
                className="w-full h-48 object-cover rounded-xl mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80"
                alt="Hotel Restaurant"
                className="w-full h-48 object-cover rounded-xl -mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80"
                alt="Hotel Room"
                className="w-full h-48 object-cover rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-primary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold-400 text-sm font-medium tracking-wider uppercase mb-3">
              Our Values
            </p>
            <h2 className="heading-lg text-white mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our core values guide every decision we make and every interaction we have 
              with our guests and team members.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-900" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: 'Years of Excellence' },
              { number: '50+', label: 'Luxury Rooms' },
              { number: '10,000+', label: 'Happy Guests' },
              { number: '50+', label: 'Team Members' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionTitle
            subtitle="Our Team"
            title="Meet the People Behind Grand Horizon"
            description="Our dedicated team of hospitality professionals works tirelessly to ensure every guest has an unforgettable experience."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary-600 text-sm font-medium tracking-wider uppercase mb-3">
              Recognition
            </p>
            <h2 className="heading-lg text-gray-900 mb-4">
              Awards & Accolades
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              'Best Luxury Hotel 2023',
              'Travelers\' Choice Award',
              'Excellence in Service',
              'Green Hotel Certification',
            ].map((award, index) => (
              <motion.div
                key={award}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mb-4">
                  <FiAward className="w-10 h-10 text-gold-600" />
                </div>
                <p className="text-center font-medium text-gray-900">{award}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
