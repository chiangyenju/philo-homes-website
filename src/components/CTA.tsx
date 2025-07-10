'use client'

import { motion } from 'framer-motion'
import { Smartphone, Monitor, Mail, ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Transform
            <br />Your Space?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join thousands of designers, suppliers, and homeowners who are already 
            using Philo Homes to create beautiful, functional spaces.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <button className="group bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
            <Smartphone size={24} />
            Download App
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 transition-all transform hover:scale-105">
            <Monitor size={24} />
            Web Platform
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">10K+</h3>
              <p className="text-blue-100">Active Designers</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
              <p className="text-blue-100">Furniture Suppliers</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">50K+</h3>
              <p className="text-blue-100">Happy Homeowners</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-blue-100 mb-4">Have questions? We'd love to help!</p>
          <button className="group text-white hover:text-blue-200 font-semibold flex items-center gap-2 mx-auto transition-colors">
            <Mail size={20} />
            contact@philohomes.com
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
} 