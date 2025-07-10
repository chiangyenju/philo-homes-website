'use client'

import { motion } from 'framer-motion'
import { Play, RotateCcw, Move3D, Zap } from 'lucide-react'

export default function Demo3D() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience Design in
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 3D</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Our cutting-edge 3D engine, powered by Babylon.js, brings your interior 
              design visions to life. Place furniture, adjust lighting, and walk through 
              your space before making any commitments.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Move3D size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Drag & Drop Furniture</h3>
                  <p className="text-gray-600">Intuitive placement with real-time positioning</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <RotateCcw size={20} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">360° Room Views</h3>
                  <p className="text-gray-600">Explore designs from every angle</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Real-time Rendering</h3>
                  <p className="text-gray-600">Instant visual feedback as you design</p>
                </div>
              </div>
            </div>
            
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 hover:shadow-lg transition-all transform hover:scale-105">
              <Play size={20} />
              Watch Demo
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 shadow-2xl">
              {/* 3D Demo Placeholder */}
              <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Move3D size={48} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">3D Room Designer</h3>
                  <p className="text-gray-500">Interactive demo will load here</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">3D Engine Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <RotateCcw size={16} className="text-gray-600" />
                    </button>
                    <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Move3D size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Live Preview
            </div>
            <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
              Real-time 3D
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 