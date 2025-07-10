'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Smartphone, Monitor } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex">
      {/* Three Images */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3">
        {/* Image 1 - LEFT AREA with text content */}
        <div className="relative">
          <Image 
            src="/images/hero-1.jpg" 
            alt="Living Room Design" 
            width={600} 
            height={800} 
            className="w-full h-screen md:h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Text Content - LEFT AREA */}
          <div className="absolute inset-0 flex items-center">
            <div className="text-left text-white px-8 md:px-12 max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 
                  className="text-white mb-8 leading-tight font-normal"
                  style={{ 
                    fontFamily: 'Henry Trial, serif',
                    fontSize: '32px',
                    lineHeight: '48px',
                    letterSpacing: '0.2px'
                  }}
                >
                  SHOP BEST SELLERS UP TO{' '}
                  <span className="block">45% OFF!</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <button 
                  className="bg-transparent border-2 hover:bg-white hover:text-black px-8 py-3 text-sm font-medium transition-all duration-300 uppercase tracking-wide"
                  style={{ 
                    color: '#D8A559',
                    borderColor: '#D8A559'
                  }}
                >
                  SHOP SALE
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Image 2 */}
        <div className="relative">
          <Image 
            src="/images/hero-2.jpeg" 
            alt="Bedroom Inspiration" 
            width={600} 
            height={800} 
            className="w-full h-screen md:h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Image 3 */}
        <div className="relative">
          <Image 
            src="/images/hero-3.jpg" 
            alt="Kitchen & Dining" 
            width={600} 
            height={800} 
            className="w-full h-screen md:h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </div>
    </section>
  )
} 