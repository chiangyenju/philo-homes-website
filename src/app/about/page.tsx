'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]" style={{ fontFamily: "'GT America', sans-serif" }}>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-10 bg-white border-b border-[#E1E1E1]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h1
                className="text-5xl md:text-7xl text-[#101A2E]"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                About Us
              </h1>
              <p className="text-sm text-[#4B4B4B] max-w-sm text-right leading-relaxed">
                Decades of design expertise, now powered by AI.
              </p>
            </div>
          </div>
        </section>

        {/* Philo Homes Section */}
        <section className="py-24 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Large Title */}
              <div className="mb-12 flex justify-center">
                <Image
                  src="/logo/logo type.png"
                  alt="Philo Homes"
                  width={400}
                  height={200}
                  className="w-auto h-32 md:h-48"
                />
              </div>

              {/* Tagline */}
              <p className="text-xl md:text-2xl text-[#4B4B4B] mb-8 font-light">
                Professional design for every home.
              </p>

              {/* Description */}
              <p className="text-[#4B4B4B] leading-relaxed max-w-[600px] mx-auto mb-12">
                For decades, we&apos;ve created beautiful spaces for households around the world.
                Now, we&apos;re bringing that same expertise to everyone — making professional
                interior design accessible, affordable, and fast.
              </p>

              {/* Icon */}
              <div className="flex justify-center">
                <Image
                  src="/images/logo-icon.png"
                  alt="Philo Homes"
                  width={80}
                  height={80}
                  className="opacity-90"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-16 bg-[#FAFAFA]">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-3">The Challenge</p>
              <h2
                className="text-3xl md:text-4xl text-[#101A2E] mb-8"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                Traditional Design Takes Too Long
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <p className="text-[#4B4B4B] leading-relaxed mb-6">
                    Working with an interior designer typically takes at least a month — often longer.
                    The process involves endless back-and-forth, manual iterations, and trial and error.
                    Even then, the final result may not match what the homeowner envisioned.
                  </p>
                  <p className="text-[#4B4B4B] leading-relaxed mb-6">
                    And for most people, professional design simply isn&apos;t affordable. The cost puts
                    expert help out of reach, leaving homeowners to figure it out on their own.
                  </p>
                  <p className="text-[#4B4B4B] leading-relaxed">
                    We built Philo Homes to change that.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/mathilde-langevin-LdPzzJcrPLM-unsplash.jpg"
                    alt="Interior design process"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Solution Section */}
        <section className="py-16 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-3">Our Approach</p>
              <h2
                className="text-3xl md:text-4xl text-[#101A2E] mb-8"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                AI That Thinks Like a Designer
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/community-hero.jpg"
                    alt="AI-designed room"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="order-1 lg:order-2">
                  <p className="text-[#4B4B4B] leading-relaxed mb-6">
                    We trained our AI on the design principles we&apos;ve refined over decades.
                    When you scan your room, our algorithm creates an accurate 3D layout — capturing
                    dimensions, doors, windows, and existing elements.
                  </p>
                  <p className="text-[#4B4B4B] leading-relaxed mb-6">
                    With this spatial understanding, our AI applies professional design logic:
                    where to place the bed so it doesn&apos;t block the door, how to maximize natural
                    light, which furniture scales properly for your space.
                  </p>
                  <p className="text-[#4B4B4B] leading-relaxed">
                    The result is a complete design using furniture from our global supply chain —
                    all purchasable with one click, delivered to your door.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-[#101A2E]">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-3">Our Mission</p>
              <h2
                className="text-3xl md:text-4xl text-white mb-8"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                Design Without Limits
              </h2>
              <p className="text-white/80 leading-relaxed max-w-[700px] mx-auto mb-8">
                With Philo Homes, you can iterate on your design again and again — no extra cost,
                no waiting. Generate new options in minutes, not months. Create spaces that are
                professionally designed and ready for your home.
              </p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl text-[#D1903E] font-medium mb-2">50+</p>
                  <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider">Years Combined<br />Experience</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl text-[#D1903E] font-medium mb-2">10+</p>
                  <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider">Supply Chain<br />Partners</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl text-[#D1903E] font-medium mb-2 whitespace-nowrap">5-10 min</p>
                  <p className="text-[10px] md:text-xs text-white/60 uppercase tracking-wider">vs. 1 Month<br />Traditional</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-16 bg-[#FAFAFA]">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-3">The Team</p>
              <h2
                className="text-3xl md:text-4xl text-[#101A2E] mb-8"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                Our Founders
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                {/* Magazine Feature Image */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/Bendito_Mockup-MT-Magazine-02-1.png"
                    alt="Featured in design publications"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-[#4B4B4B] leading-relaxed mb-6">
                    Our founding team combines award-winning design expertise with cutting-edge
                    technology. Our designers have had their work featured on Times Square and
                    graduated from top design and business schools worldwide.
                  </p>
                  <p className="text-[#4B4B4B] leading-relaxed mb-6">
                    We&apos;ve built a global design team with over 50 years of combined experience,
                    along with a supply chain network that ensures quality furniture at the best prices.
                  </p>
                  <p className="text-[#4B4B4B] leading-relaxed">
                    By combining professional design knowledge with the latest in computer vision
                    and AI, we&apos;re pioneering a new way to create beautiful, functional spaces —
                    accessible to everyone.
                  </p>
                </div>
                <div className="bg-white rounded-2xl p-8 border border-[#E1E1E1]">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#D1903E]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#D1903E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#101A2E] font-medium mb-1">Award-Winning Work</p>
                        <p className="text-sm text-[#8E8E8E]">Projects featured on Times Square and beyond</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#D1903E]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#D1903E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#101A2E] font-medium mb-1">Global Network</p>
                        <p className="text-sm text-[#8E8E8E]">Design team and supply chain across continents</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Closing Icon */}
        <section className="py-20 bg-white">
          <div className="flex justify-center">
            <Image
              src="/images/icon.png"
              alt="Philo Homes"
              width={100}
              height={100}
              className="opacity-60"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
