import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi'

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    category: 'Exterior',
    title: 'Hotel Exterior',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    category: 'Pool',
    title: 'Swimming Pool',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    category: 'Interior',
    title: 'Hotel Lobby',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
    category: 'Rooms',
    title: 'Deluxe Room',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
    category: 'Rooms',
    title: 'Executive Suite',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
    category: 'Dining',
    title: 'Restaurant',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1200&q=80',
    category: 'Dining',
    title: 'Fine Dining',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80',
    category: 'Spa',
    title: 'Spa & Wellness',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80',
    category: 'Spa',
    title: 'Massage Room',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80',
    category: 'Events',
    title: 'Conference Hall',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80',
    category: 'Events',
    title: 'Banquet Hall',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80',
    category: 'Rooms',
    title: 'Presidential Suite',
  },
]

const categories = ['All', 'Exterior', 'Rooms', 'Dining', 'Spa', 'Events', 'Interior', 'Pool']

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  const openLightbox = (image, index) => {
    setSelectedImage(image)
    setCurrentIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'auto'
  }

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % filteredImages.length
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setCurrentIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
  }

  return (
    <div className="min-h-screen bg-gray-50" onKeyDown={handleKeyDown}>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
          alt="Hotel Gallery"
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
                Visual Tour
              </p>
              <h1 className="heading-xl text-white max-w-2xl">
                Our Gallery
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => openLightbox(image, index)}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-gold-400 text-xs font-medium uppercase tracking-wider mb-1">
                        {image.category}
                      </p>
                      <h3 className="text-white font-semibold">{image.title}</h3>
                    </div>
                    
                    {/* Zoom Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full 
                                    flex items-center justify-center">
                        <FiZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full 
                       flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full 
                       flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Previous image"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full 
                       flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Next image"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <p className="text-gold-400 text-sm font-medium uppercase tracking-wider">
                  {selectedImage.category}
                </p>
                <h3 className="text-white text-xl font-semibold mt-1">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
