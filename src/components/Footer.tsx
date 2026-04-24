'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const footerLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Case Study', href: '/case-study' },
  ]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer style={{ backgroundColor: '#10182B' }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Logo and Newsletter */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <Image
                  src="/logo/logo-gold.png"
                  alt="Philo Homes"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>

              <p className="text-white/80 mb-6 font-light leading-relaxed text-sm">
                Sign up for updates on new features and design templates.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail"
                  className="flex-1 bg-transparent border border-white/30 px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-white/60 transition-colors text-sm"
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  className="px-6 py-2 border border-white/30 border-l-0 hover:bg-white/10 transition-colors disabled:opacity-50"
                  disabled={status === 'loading'}
                >
                  <ArrowRight size={18} className="text-white" />
                </button>
              </form>
              {status === 'success' && (
                <p className="text-green-400 text-xs mt-2">Thank you for subscribing!</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
              )}
            </motion.div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-medium mb-3 text-white text-sm">Explore</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors text-xs"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-center pt-8 border-t border-white/20"
        >
          {/* Social Icons */}
          <div className="flex space-x-4 mb-6 lg:mb-0">
            <a
              href="https://instagram.com/philo.homes"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <Instagram size={18} className="text-white" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} Philo Homes, Maven Design LLC. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
