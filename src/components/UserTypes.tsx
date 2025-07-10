'use client'

import { motion } from 'framer-motion'
import { Palette, Store, Home, ArrowRight } from 'lucide-react'

const userTypes = [
  {
    icon: Palette,
    title: 'Interior Designers',
    description: 'Create stunning 3D room designs and showcase your talent',
    benefits: [
      'Advanced 3D design tools',
      'Extensive furniture catalog',
      'Client presentation features',
      'Earn commissions on sales'
    ],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    icon: Store,
    title: 'Furniture Suppliers',
    description: 'Showcase your products and reach customers through designs',
    benefits: [
      'Comprehensive catalog management',
      'Designer collaboration tools',
      'Real-time inventory updates',
      'Analytics and insights'
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: Home,
    title: 'Homeowners',
    description: 'Discover amazing designs and shop furniture seamlessly',
    benefits: [
      'Curated design inspiration',
      'Interactive 3D room tours',
      'One-click furniture shopping',
      'Design customization options'
    ],
    color: 'from-green-500 to-teal-500',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  }
]

export default function UserTypes() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Built for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a creative designer, furniture supplier, or homeowner looking for inspiration, 
            Philo Homes has the perfect solution for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <motion.div
              key={userType.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className={`h-full p-8 rounded-3xl ${userType.bgColor} border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-lg mb-6">
                  <userType.icon size={32} className={userType.iconColor} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {userType.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {userType.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {userType.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-current rounded-full mr-3 opacity-60"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <button className={`group/btn w-full bg-gradient-to-r ${userType.color} text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all`}>
                  Get Started
                  <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 