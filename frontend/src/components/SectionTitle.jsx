import { motion } from 'framer-motion'

const SectionTitle = ({ 
  subtitle, 
  title, 
  description, 
  align = 'center',
  light = false 
}) => {
  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${alignClasses[align]} mb-12`}
    >
      {subtitle && (
        <p className={`text-sm font-medium tracking-wider uppercase mb-3 ${
          light ? 'text-gold-400' : 'text-primary-600'
        }`}>
          {subtitle}
        </p>
      )}
      <h2 className={`heading-lg mb-4 ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl mx-auto text-lg ${
          light ? 'text-gray-300' : 'text-gray-600'
        } ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
      
      {/* Decorative Line */}
      <div className={`mt-6 flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className={`w-12 h-1 rounded-full ${light ? 'bg-gold-400' : 'bg-primary-900'}`} />
        <div className={`w-3 h-3 rounded-full ${light ? 'bg-gold-400' : 'bg-gold-500'}`} />
        <div className={`w-12 h-1 rounded-full ${light ? 'bg-gold-400' : 'bg-primary-900'}`} />
      </div>
    </motion.div>
  )
}

export default SectionTitle
