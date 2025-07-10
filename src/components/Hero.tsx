'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex">
      {/* Three Images */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3">
        {/* Image 1 - LEFT AREA with text content */}
        <div className="relative">
          <Image 
            src="/images/hero-1.png" 
            alt="Living Room Design" 
            width={600} 
            height={800} 
            className="w-full h-screen md:h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black/65"></div>
          
          {/* Text Content - LEFT AREA */}
          <div className="absolute inset-0 flex items-center">
            <div className="text-left text-white px-8 md:px-16 max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 
                  className="text-white mb-8 leading-tight font-bold uppercase"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    fontSize: '24px',
                    lineHeight: '1.1',
                    letterSpacing: '0.3px'
                  }}
                >
                  COMING<br/>SOON
                </h1>
                
                <div className="vintage-divider bg-white/60 mb-8"></div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <p 
                  className="text-white/90 uppercase tracking-widest font-light mb-12"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    fontSize: '12px',
                    letterSpacing: '2px'
                  }}
                >
                  Your design journey starts here
                </p>
                
                <button className="vintage-button text-white border-white hover:bg-white hover:text-vintage-navy">
                  Join Community
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Image 2 */}
        <div className="relative">
          <Image 
            src="/images/hero-2.jpg" 
            alt="Bedroom Inspiration" 
            width={600} 
            height={800} 
            className="w-full h-screen md:h-screen object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/25"></div>
        </div>

        {/* Image 3 */}
        <div className="relative">
          <Image 
            src="/images/hero-3.jpg" 
            alt="Kitchen & Dining" 
            width={600} 
            height={800} 
            className="w-full h-screen md:h-screen object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/25"></div>
        </div>
      </div>
    </section>
  )
} 