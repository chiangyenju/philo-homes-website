'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const caseStudies = [
  {
    id: 'bedroom-1',
    title: 'Modern Bedroom',
    image: '/images/templates/bedroom-1-template.jpg',
    stats: { timeSaved: '40+ hrs', costSaved: '$3,500' },
    quote: 'Warm neutrals meet soft textures — a sanctuary designed for rest, where every piece invites you to unwind.',
    description: 'This modern bedroom embraces a warm, earthy palette with cream upholstery and natural wood accents. The low-profile platform bed anchors the space, complemented by minimalist nightstands and ambient lighting. A plush bench at the foot of the bed adds functionality, while the accent chair creates a cozy reading nook. Thoughtful details like the decorative vase and curated wall art complete the serene atmosphere.',
    furniture: [
      { name: 'Platform Bed', image: '/images/templates/bedroom-1/bed.png', price: '$1,299' },
      { name: 'Nightstand', image: '/images/templates/bedroom-1/nightstand.png', price: '$349' },
      { name: 'Table Lamp', image: '/images/templates/bedroom-1/lamp.png', price: '$189' },
      { name: 'Wall Art', image: '/images/templates/bedroom-1/painting.png', price: '$249' },
      { name: 'Bench', image: '/images/templates/bedroom-1/bench.png', price: '$599' },
      { name: 'Accent Chair', image: '/images/templates/bedroom-1/sofa-chair.png', price: '$899' },
      { name: 'Side Stool', image: '/images/templates/bedroom-1/stool.png', price: '$179' },
      { name: 'Decorative Vase', image: '/images/templates/bedroom-1/vase.png', price: '$89' },
    ],
  },
  {
    id: 'bedroom-2',
    title: 'Classic Bedroom',
    image: '/images/templates/bedroom-2-template.png',
    stats: { timeSaved: '35+ hrs', costSaved: '$4,200' },
    quote: 'Timeless elegance in rich wood tones — where traditional craftsmanship meets modern comfort.',
    description: 'A classic bedroom that celebrates traditional design with a sophisticated dark wood dresser and warm beige tones. The upholstered bed frame provides a soft contrast to the rich cabinet, while brass hardware adds subtle luxury. Layered textiles in chocolate and cream create depth, and the landscape artwork above the dresser draws the eye upward, making the space feel both grounded and expansive.',
    furniture: [
      { name: 'Classic Bed', image: '/images/templates/bedroom-2/bed.png', price: '$1,599' },
      { name: 'Nightstand', image: '/images/templates/bedroom-2/nightstand.jpg', price: '$449' },
      { name: 'Table Lamp', image: '/images/templates/bedroom-2/lamp.png', price: '$229' },
      { name: 'Wall Art', image: '/images/templates/bedroom-2/painting.png', price: '$349' },
      { name: 'Cabinet', image: '/images/templates/bedroom-2/cabinet.png', price: '$899' },
      { name: 'Accent Chair', image: '/images/templates/bedroom-2/chair.png', price: '$749' },
    ],
  },
  {
    id: 'living-room-1',
    title: 'Contemporary Living',
    image: '/images/templates/living-room-1-template.png',
    stats: { timeSaved: '60+ hrs', costSaved: '$5,200' },
    quote: 'A curated blend of work and leisure — clean lines, natural light, and pieces that spark creativity.',
    description: 'This contemporary living space seamlessly blends productivity with relaxation. A comfortable sofa anchors the seating area, while the iconic rocking chair adds mid-century flair. The integrated workspace features a clean-lined desk illuminated by a sleek desk lamp. A statement bookshelf displays personal treasures, and strategic floor lighting creates warm pools of ambient light throughout the room.',
    furniture: [
      { name: 'Sofa', image: '/images/templates/livingroom-1/sofa.jpg', price: '$1,899' },
      { name: 'Rocking Chair', image: '/images/templates/livingroom-1/rockingchair.png', price: '$649' },
      { name: 'Accent Chair', image: '/images/templates/livingroom-1/chair.jpg', price: '$549' },
      { name: 'Bookshelf', image: '/images/templates/livingroom-1/bookshelf.png', price: '$799' },
      { name: 'Desk', image: '/images/templates/livingroom-1/desk.jpg', price: '$599' },
      { name: 'Desk Lamp', image: '/images/templates/livingroom-1/desklamp.png', price: '$179' },
      { name: 'Floor Lamp', image: '/images/templates/livingroom-1/floorlamp.jpg', price: '$299' },
    ],
  },
  {
    id: 'living-room-2',
    title: 'Cozy Living',
    image: '/images/templates/livingroom-2-template.jpg',
    stats: { timeSaved: '55+ hrs', costSaved: '$4,800' },
    quote: 'Gathered around warmth — plush seating, soft lighting, and a space made for connection.',
    description: 'Designed for gathering, this cozy living room centers around a generous sofa perfect for lounging. Multiple seating options including an accent chair and charming wood chair invite conversation from every angle. The coffee table serves as a natural focal point, while the bookshelf adds personality and storage. Layered lighting from both floor and table lamps allows for flexible ambiance from bright afternoons to intimate evenings.',
    furniture: [
      { name: 'Sofa', image: '/images/templates/livingroom-2/sofa.png', price: '$1,699' },
      { name: 'Accent Chair', image: '/images/templates/livingroom-2/chair.png', price: '$549' },
      { name: 'Wood Chair', image: '/images/templates/livingroom-2/woodchair.png', price: '$399' },
      { name: 'Coffee Table', image: '/images/templates/livingroom-2/table.jpg', price: '$449' },
      { name: 'Table Stand', image: '/images/templates/livingroom-2/tablestand.png', price: '$279' },
      { name: 'Bookshelf', image: '/images/templates/livingroom-2/bookshelf.png', price: '$699' },
      { name: 'Floor Lamp', image: '/images/templates/livingroom-2/floorlamp.png', price: '$249' },
      { name: 'Table Lamp', image: '/images/templates/livingroom-2/tablelamp.png', price: '$159' },
    ],
  },
]

export default function CaseStudy() {
  const [activeStudy, setActiveStudy] = useState(0)

  const currentStudy = caseStudies[activeStudy]

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
                Case Study
              </h1>
              <p className="text-sm text-[#4B4B4B] max-w-sm text-right leading-relaxed">
                Designs driven by our award-winning designer algorithm with furnitures purchased in one click.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Case Study Thumbnails */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 lg:gap-16 mb-14 max-w-[1000px] mx-auto px-4">
              {caseStudies.map((study, index) => (
                <div
                  key={study.id}
                  onMouseEnter={() => setActiveStudy(index)}
                  className="cursor-pointer"
                >
                  <div
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 border-4 ${
                      activeStudy === index
                        ? 'opacity-100 border-[#D1903E]'
                        : 'opacity-60 border-[#E1E1E1] hover:opacity-100 hover:border-[#D1903E]/50'
                    }`}
                  >
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className={`text-sm mt-2 text-center transition-colors ${
                    activeStudy === index ? 'text-[#101A2E]' : 'text-[#8E8E8E]'
                  }`}>
                    {study.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Active Case Study Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStudy}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Main Image */}
                <div className="bg-white rounded-2xl overflow-hidden mb-6">
                  <div className="relative aspect-[21/9]">
                    <Image
                      src={currentStudy.image}
                      alt={currentStudy.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Furniture Grid */}
                {currentStudy.furniture.length > 0 && (
                  <div>
                    <p className="text-xs text-[#8E8E8E] uppercase tracking-wider mb-4">
                      Included Furniture ({currentStudy.furniture.length})
                    </p>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                      {currentStudy.furniture.map((item, index) => (
                        <div
                          key={index}
                          className="bg-white rounded-lg overflow-hidden group hover:shadow-md transition-shadow"
                        >
                          <div className="relative aspect-square bg-[#F5F5F5]">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-2 text-center">
                            <p className="text-[10px] text-[#4B4B4B] truncate">{item.name}</p>
                            <p className="text-xs text-[#D1903E] font-medium">{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentStudy.furniture.length === 0 && (
                  <div className="text-center py-8 text-[#8E8E8E] text-sm">
                    Furniture catalogue coming soon
                  </div>
                )}

                {/* Quote Block */}
                <div className="mt-10 bg-[#101A2E] rounded-t-2xl p-8 md:p-10">
                  <div className="flex items-start gap-4">
                    <span className="text-[#D1903E] text-4xl leading-none">&ldquo;</span>
                    <p className="text-white/90 text-lg md:text-xl leading-relaxed italic font-light">
                      {currentStudy.quote}
                    </p>
                  </div>
                </div>

                {/* Description Block */}
                <div className="bg-white rounded-b-2xl p-8 md:p-10 border border-t-0 border-[#E8E8E8]">
                  <p className="text-[#4B4B4B] leading-relaxed mb-10">
                    {currentStudy.description}
                  </p>

                  {/* Stats */}
                  <div className="flex justify-center gap-16 md:gap-24 pt-8 border-t border-[#E8E8E8]">
                    <div className="text-center">
                      <p className="text-4xl md:text-5xl text-[#D1903E] font-medium mb-2">
                        {currentStudy.stats.timeSaved}
                      </p>
                      <p className="text-xs text-[#8E8E8E] uppercase tracking-widest">Time Saved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-4xl md:text-5xl text-[#D1903E] font-medium mb-2">
                        {currentStudy.stats.costSaved}
                      </p>
                      <p className="text-xs text-[#8E8E8E] uppercase tracking-widest">Cost Saved</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
