'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function BookDemo() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setIsSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or email us directly at info@philo.homes')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'GT America', sans-serif" }}>
      <Header />

      <main className="pt-28 pb-20">
        <div className="max-w-[600px] mx-auto px-6">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#8E8E8E] hover:text-[#101A2E] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
            </svg>
            Back to Home
          </Link>

          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="mb-10">
                <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-3">Get Started</p>
                <h1
                  className="text-3xl md:text-4xl text-[#101A2E] mb-4"
                  style={{ fontFamily: "'Henry Trial', serif" }}
                >
                  Book a Demo
                </h1>
                <p className="text-[#4B4B4B] leading-relaxed">
                  See how our AI can transform your interior design workflow.
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E1E1E1] rounded-lg text-[#101A2E] focus:outline-none focus:border-[#D1903E] transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E1E1E1] rounded-lg text-[#101A2E] focus:outline-none focus:border-[#D1903E] transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E1E1E1] rounded-lg text-[#101A2E] focus:outline-none focus:border-[#D1903E] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E1E1E1] rounded-lg text-[#101A2E] focus:outline-none focus:border-[#D1903E] transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E1E1E1] rounded-lg text-[#101A2E] focus:outline-none focus:border-[#D1903E] transition-colors"
                    placeholder="Your company name"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-[#E1E1E1] rounded-lg text-[#101A2E] focus:outline-none focus:border-[#D1903E] transition-colors resize-none"
                    placeholder="Tell us about your project or what you'd like to see in the demo..."
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#101A2E] text-white py-4 rounded-lg text-sm font-medium hover:bg-[#1F1F1F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Request Demo</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Contact info */}
              <div className="mt-10 pt-8 border-t border-[#E1E1E1] text-center">
                <p className="text-sm text-[#8E8E8E]">
                  Or reach us directly at{' '}
                  <a href="mailto:info@philo.homes" className="text-[#D1903E] hover:underline">
                    info@philo.homes
                  </a>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              {/* Success icon */}
              <div className="w-16 h-16 bg-[#47D981] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2
                className="text-2xl text-[#101A2E] mb-4"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                Thank you!
              </h2>
              <p className="text-[#4B4B4B] mb-8 max-w-sm mx-auto">
                Your demo request has been submitted. We&apos;ll be in touch within 24 hours to schedule your personalized demo.
              </p>

              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#101A2E] text-white px-8 py-4 text-sm tracking-wide hover:bg-[#1F1F1F] transition-colors"
              >
                <span>Back to Home</span>
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
