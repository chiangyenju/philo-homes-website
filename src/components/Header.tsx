'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Search, Heart, ShoppingBag } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const leftMenuItems = [
    { name: 'SHOP', href: '#shop' },
    { name: 'STYLE QUIZ', href: '#style-quiz' },
    { name: 'SALES', href: '#sales' },
    { name: 'INSPIRATION', href: '#inspiration' }
  ]

  const rightMenuItems = [
    { name: 'STORY', href: '#story' },
    { name: 'ABOUT US', href: '#about' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Menu Items */}
          <nav className="hidden lg:flex items-center space-x-8">
            {leftMenuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-white hover:text-gray-200 font-medium transition-colors uppercase"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  fontSize: '14px',
                  letterSpacing: '0.3px',
                  lineHeight: '24px'
                }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Center Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center flex-1 lg:flex-none"
          >
            <Image src="/logo/logo.png" alt="Philo Homes" width={120} height={40} className="h-8 w-auto" />
          </motion.div>

          {/* Right Menu Items & CTA */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {rightMenuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (leftMenuItems.length + index) * 0.1 }}
                  className="text-white hover:text-gray-200 font-medium transition-colors uppercase"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    fontSize: '14px',
                    letterSpacing: '0.3px',
                    lineHeight: '24px'
                  }}
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>
            
                         <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.5 }}
               className="flex items-center space-x-4"
             >
               <button className="text-white hover:text-gray-200 transition-colors p-2">
                 <Search size={20} />
               </button>
               <button className="text-white hover:text-gray-200 transition-colors p-2">
                 <Heart size={20} />
               </button>
               <button className="text-white hover:text-gray-200 transition-colors p-2">
                 <ShoppingBag size={20} />
               </button>
             </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-gray-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden py-4 border-t border-white/20 bg-black/80 backdrop-blur-sm"
          >
            <nav className="flex flex-col space-y-4">
              {[...leftMenuItems, ...rightMenuItems].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-gray-200 font-medium transition-colors uppercase"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    fontSize: '14px',
                    letterSpacing: '0.3px',
                    lineHeight: '24px'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex justify-center space-x-4 pt-4 border-t border-white/20">
                <button className="text-white hover:text-gray-200 transition-colors p-2">
                  <Search size={20} />
                </button>
                <button className="text-white hover:text-gray-200 transition-colors p-2">
                  <Heart size={20} />
                </button>
                <button className="text-white hover:text-gray-200 transition-colors p-2">
                  <ShoppingBag size={20} />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
} 