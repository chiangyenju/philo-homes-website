'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const footerLinks = {
    About: [
      { name: 'About Us', href: '#about' },
      { name: 'Trade Program', href: '#trade' },
      { name: 'TCL Magazine', href: '#magazine' },
      { name: 'Stock With Us', href: '#stock' }
    ],
    Contact: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'Help Center', href: '#help' },
      { name: 'Shipping Policy', href: '#shipping' },
      { name: 'Refund Policy', href: '#refund' },
      { name: 'Terms and Conditions', href: '#terms' },
      { name: 'Privacy Policy', href: '#privacy' }
    ]
  }

  const paymentMethods = [
    'amex', 'apple-pay', 'google-pay', 'maestro', 'mastercard', 'paypal', 'shopify', 'unionpay', 'visa'
  ]

  const socialLinks = [
    { icon: Facebook, href: '#facebook' },
    { icon: Instagram, href: '#instagram' },
    { icon: Twitter, href: '#twitter' },
    { icon: Youtube, href: '#youtube' }
  ]

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
              
              <p 
                className="text-white/80 mb-6 italic font-light leading-relaxed"
                style={{ 
                  fontFamily: 'Henry Trial, serif',
                  fontSize: '16px',
                  lineHeight: '24px'
                }}
              >
                Sign up to hear about our exclusive offers, product launches and updates.
              </p>
              
              <div className="flex">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="flex-1 bg-transparent border border-white/30 px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:border-white/60 transition-colors text-sm"
                />
                <button className="px-6 py-2 border border-white/30 border-l-0 hover:bg-white/10 transition-colors">
                  <ArrowRight size={18} className="text-white" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {Object.entries(footerLinks).map(([title, links], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                >
                  <h3 className="font-medium mb-3 text-white text-sm">{title} Us</h3>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-white/70 hover:text-white transition-colors text-xs"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-right"
            >
              <p 
                className="text-white/80 italic font-light leading-relaxed"
                style={{ 
                  fontFamily: 'Henry Trial, serif',
                  fontSize: '14px',
                  lineHeight: '20px'
                }}
              >
                &ldquo;Curating a world of inspiration, we&apos;ll help you design a home where you feel at your best and thrive.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-8 border-t border-white/20"
        >
          {/* Social Icons */}
          <div className="flex space-x-4 mb-6 lg:mb-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <social.icon size={18} className="text-white" />
              </a>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((method) => (
              <div
                key={method}
                className="w-12 h-8 bg-white/10 rounded flex items-center justify-center"
              >
                <span className="text-xs text-white/60 font-medium uppercase">
                  {method === 'apple-pay' ? 'PAY' : 
                   method === 'google-pay' ? 'GPay' :
                   method === 'paypal' ? 'PP' :
                   method === 'mastercard' ? 'MC' :
                   method === 'amex' ? 'AE' :
                   method === 'visa' ? 'VISA' :
                   method === 'shopify' ? 'SHOP' :
                   method === 'unionpay' ? 'UP' :
                   method === 'maestro' ? 'M' : method.slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 