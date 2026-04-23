import { motion } from 'framer-motion'
import { FiCalendar, FiUser, FiArrowRight, FiClock } from 'react-icons/fi'
import SectionTitle from '../../components/SectionTitle'

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Things to Do in Lagos',
    excerpt: 'Discover the best attractions, restaurants, and experiences that Lagos has to offer during your stay.',
    image: 'https://images.unsplash.com/photo-1523206485979-ba935d463714?w=800&q=80',
    author: 'Amara Okafor',
    date: 'Dec 15, 2023',
    readTime: '5 min read',
    category: 'Travel Guide',
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Nigerian Cuisine',
    excerpt: 'Explore the rich flavors and diverse dishes that make Nigerian food a culinary adventure.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    author: 'Chef Emmanuel',
    date: 'Dec 10, 2023',
    readTime: '7 min read',
    category: 'Food & Dining',
  },
  {
    id: 3,
    title: 'Why Victoria Island is the Perfect Location',
    excerpt: 'Learn why our location in Victoria Island offers the best of Lagos business and leisure.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    author: 'Ngozi Okonkwo',
    date: 'Dec 5, 2023',
    readTime: '4 min read',
    category: 'Hotel News',
  },
  {
    id: 4,
    title: 'Planning the Perfect Business Trip',
    excerpt: 'Tips and tricks for making your business travel efficient, productive, and enjoyable.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    author: 'Adebayo Johnson',
    date: 'Nov 28, 2023',
    readTime: '6 min read',
    category: 'Business Travel',
  },
  {
    id: 5,
    title: 'Wellness Tips for Travelers',
    excerpt: 'How to maintain your health and wellness routine while traveling for work or leisure.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    author: 'Spa Team',
    date: 'Nov 20, 2023',
    readTime: '5 min read',
    category: 'Wellness',
  },
  {
    id: 6,
    title: 'Hosting Successful Events at Grand Horizon',
    excerpt: 'Everything you need to know about planning and executing memorable events at our hotel.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
    author: 'Events Team',
    date: 'Nov 15, 2023',
    readTime: '8 min read',
    category: 'Events',
  },
]

const categories = ['All', 'Travel Guide', 'Food & Dining', 'Hotel News', 'Business Travel', 'Wellness', 'Events']

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&q=80"
          alt="Blog"
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
                Latest Updates
              </p>
              <h1 className="heading-xl text-white max-w-2xl">
                Our Blog
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionTitle
            subtitle="Stories & Insights"
            title="From Our Blog"
            description="Discover travel tips, local insights, and stories from the Grand Horizon team."
          />

          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-primary-600 text-sm font-medium mb-3">
                    {blogPosts[0].category}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-4">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <FiUser className="w-4 h-4" />
                      {blogPosts[0].author}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      {blogPosts[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-800 transition-colors">
                    Read More
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-primary-600 text-xs font-medium uppercase tracking-wider">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-primary-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="heading-lg text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-300 mb-8">
              Get the latest travel tips, hotel news, and exclusive offers delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold-400 text-primary-900 rounded-lg font-semibold hover:bg-gold-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Blog
