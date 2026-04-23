import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiFilter, FiX, FiSearch, FiSliders } from 'react-icons/fi'
import RoomCard from '../components/RoomCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { roomAPI } from '../services/api'
import { formatPrice } from '../utils/helpers'
import toast from 'react-hot-toast'

const categories = [
  { id: 'all', name: 'All Rooms', count: 0 },
  { id: 'cheap', name: 'Budget Friendly', count: 0 },
  { id: 'standard', name: 'Standard', count: 0 },
  { id: 'luxury', name: 'Luxury', count: 0 },
]

const Rooms = () => {
  const [rooms, setRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [categoryCounts, setCategoryCounts] = useState(categories)

  useEffect(() => {
    fetchRooms()
  }, [])

  useEffect(() => {
    filterRooms()
  }, [activeCategory, searchQuery, priceRange, rooms])

  const fetchRooms = async () => {
    try {
      const response = await roomAPI.getAll()
      if (response.success) {
        setRooms(response.data)
        setFilteredRooms(response.data)
        
        // Calculate category counts
        const counts = {
          all: response.data.length,
          cheap: response.data.filter(r => r.category === 'cheap').length,
          standard: response.data.filter(r => r.category === 'standard').length,
          luxury: response.data.filter(r => r.category === 'luxury').length,
        }
        
        setCategoryCounts(categories.map(cat => ({
          ...cat,
          count: counts[cat.id]
        })))
      }
    } catch (error) {
      toast.error('Failed to load rooms')
    } finally {
      setLoading(false)
    }
  }

  const filterRooms = () => {
    let filtered = [...rooms]

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(room => room.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(room =>
        room.name.toLowerCase().includes(query) ||
        room.description.toLowerCase().includes(query) ||
        room.amenities.some(amenity => amenity.toLowerCase().includes(query))
      )
    }

    // Filter by price range
    if (priceRange.min) {
      filtered = filtered.filter(room => room.price >= Number(priceRange.min))
    }
    if (priceRange.max) {
      filtered = filtered.filter(room => room.price <= Number(priceRange.max))
    }

    setFilteredRooms(filtered)
  }

  const clearFilters = () => {
    setActiveCategory('all')
    setSearchQuery('')
    setPriceRange({ min: '', max: '' })
  }

  const hasActiveFilters = activeCategory !== 'all' || searchQuery || priceRange.min || priceRange.max

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-primary-900 py-20 pt-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-gold-400 text-sm font-medium tracking-wider uppercase mb-3">
              Our Accommodations
            </p>
            <h1 className="heading-xl text-white mb-4">
              Explore Our Rooms
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose from our selection of carefully designed rooms and suites, 
              each offering unique features and exceptional comfort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-20 z-30 bg-white shadow-md">
        <div className="container-custom py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {categoryCounts.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-primary-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeCategory === category.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search & Filter Toggle */}
            <div className="flex gap-3 w-full lg:w-auto">
              {/* Search Input */}
              <div className="relative flex-1 lg:w-64">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showFilters
                    ? 'bg-primary-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FiSliders className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex flex-wrap gap-6 items-end">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (₦)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium"
                  >
                    <FiX className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <LoadingSpinner />
          ) : filteredRooms.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-900">{filteredRooms.length}</span> rooms
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRooms.map((room, index) => (
                  <RoomCard key={room._id} room={room} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiFilter className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No rooms found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-primary-900 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Rooms
