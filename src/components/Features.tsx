'use client'

import { motion } from 'framer-motion'
import { Box, Users, ShoppingCart, Palette, Store, Home } from 'lucide-react'

const features = [
  {
    icon: Box,
    title: '3D Room Design',
    description: 'Create stunning room layouts with our advanced 3D visualization technology powered by Babylon.js'
  },
  {
    icon: Users,
    title: '3-Sided Marketplace',
    description: 'Connect designers, suppliers, and homeowners in one seamless platform'
  },
  {
    icon: ShoppingCart,
    title: 'Instant Shopping',
    description: 'Purchase furniture directly from designs with integrated e-commerce functionality'
  },
  {
    icon: Palette,
    title: 'Design Tools',
    description: 'Professional-grade tools for interior designers to create and showcase their work'
  },
  {
    icon: Store,
    title: 'Supplier Integration',
    description: 'Furniture suppliers can manage catalogs and reach customers through designer creations'
  },
  {
    icon: Home,
    title: 'Home Inspiration',
    description: 'Homeowners discover and shop curated interior design inspirations'
  }
]

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Revolutionizing Interior Design
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform brings together cutting-edge 3D technology with a seamless marketplace 
            experience, transforming how people design, shop, and furnish their spaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <feature.icon size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 