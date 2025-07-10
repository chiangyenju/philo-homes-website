'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Smartphone, Monitor } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Philo Homes
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 font-light">
            Where Interior Design Meets Innovation
          </p>
          <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-3xl mx-auto">
            The revolutionary 3-sided marketplace connecting interior designers, furniture suppliers, 
            and homeowners through immersive 3D room design and seamless e-commerce.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
            <Smartphone size={24} />
            Download Mobile App
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-3 transition-all transform hover:scale-105">
            <Monitor size={24} />
            Try Web Demo
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <Monitor size={64} className="mx-auto mb-4" />
                <p className="text-lg">3D Room Designer Preview</p>
                <p className="text-sm">Interactive demo coming soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 