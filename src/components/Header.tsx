'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Search, Heart, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
    { name: 'ABOUT US', href: '/about' },
    { name: 'COMMUNITY', href: '/community' }
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'backdrop-blur-xl border-b border-vintage-gold/20' : 'bg-transparent'
    }`} style={{
      backgroundColor: isScrolled ? 'rgba(16, 24, 43, 0.95)' : 'transparent'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:grid lg:grid-cols-3">
          {/* Left Menu Items - Hidden on Mobile */}
          <nav className="hidden lg:flex items-center space-x-12 justify-start">
            {leftMenuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-white hover:text-vintage-gold font-normal transition-all duration-300 uppercase tracking-wider group"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    fontSize: '12px',
                    letterSpacing: '1.5px'
                  }}
                >
                  {item.name}
                  <div className="h-px bg-vintage-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left mt-1"></div>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Center Logo - Always Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <Link href="/" className="group">
              <Image 
                src="/logo/logo.png" 
                alt="Philo Homes" 
                width={160} 
                height={50} 
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105" 
              />
            </Link>
          </motion.div>

          {/* Right Icons - Hidden on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex items-center space-x-6 justify-end"
          >
            <button className="text-white hover:text-vintage-gold transition-all duration-300 p-2 rounded-full hover:bg-white/5">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="text-white hover:text-vintage-gold transition-all duration-300 p-2 rounded-full hover:bg-white/5">
              <Heart size={18} strokeWidth={1.5} />
            </button>
            <button className="text-white hover:text-vintage-gold transition-all duration-300 p-2 rounded-full hover:bg-white/5">
              <ShoppingBag size={18} strokeWidth={1.5} />
            </button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-vintage-gold transition-all duration-300 rounded-full hover:bg-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:hidden py-6 border-t border-white/10 bg-vintage-navy/95 backdrop-blur-md"
          >
            <nav className="flex flex-col space-y-6">
              {leftMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-vintage-gold font-normal transition-all duration-300 uppercase tracking-wider"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    fontSize: '12px',
                    letterSpacing: '1.5px'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="flex justify-center space-x-6 pt-6 border-t border-white/10">
                <button className="text-white hover:text-vintage-gold transition-all duration-300 p-2 rounded-full hover:bg-white/5">
                  <Search size={18} strokeWidth={1.5} />
                </button>
                <button className="text-white hover:text-vintage-gold transition-all duration-300 p-2 rounded-full hover:bg-white/5">
                  <Heart size={18} strokeWidth={1.5} />
                </button>
                <button className="text-white hover:text-vintage-gold transition-all duration-300 p-2 rounded-full hover:bg-white/5">
                  <ShoppingBag size={18} strokeWidth={1.5} />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  )
} 