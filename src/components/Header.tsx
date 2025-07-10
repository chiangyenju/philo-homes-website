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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:grid lg:grid-cols-3">
          {/* Left Menu Items - Hidden on Mobile */}
          <nav className="hidden lg:flex items-center space-x-8 justify-start">
            {leftMenuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-200 font-medium transition-colors uppercase"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    fontSize: '14px',
                    letterSpacing: '0.3px',
                    lineHeight: '24px'
                  }}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Center Logo - Always Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <Link href="/">
              <Image src="/logo/logo.png" alt="Philo Homes" width={160} height={50} className="h-12 w-auto" />
            </Link>
          </motion.div>

          {/* Right Icons - Hidden on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex items-center space-x-4 justify-end"
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
              {leftMenuItems.map((item) => (
                <Link
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
                </Link>
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