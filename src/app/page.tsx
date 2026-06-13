'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const Room3DViewer = dynamic(() => import('@/components/Room3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#FAFAFA]">
      <div className="w-5 h-5 border-2 border-[#E1E1E1] border-t-[#101A2E] rounded-full animate-spin"></div>
    </div>
  ),
})

// Before/After showcase data
const showcaseData = [
  {
    before: '/ai-flow/before.png',
    after: '/ai-flow/after.png',
  },
  {
    before: '/ai-flow/before-2.png',
    after: '/ai-flow/after-2.png',
  },
]

// Layout templates (from case studies)
const layoutTemplates = [
  {
    id: 1,
    image: '/images/templates/bedroom-1-template.jpg',
    style: 'Modern Bedroom',
    room: 'Bedroom',
  },
  {
    id: 2,
    image: '/images/templates/bedroom-2-template.png',
    style: 'Classic Bedroom',
    room: 'Bedroom',
  },
]

// Design flow steps
const flowSteps = [
  {
    num: 1,
    title: 'Professional-grade AI',
    description: 'Trained on principles from award-winning interior designers',
    image: '/ai-flow/step-1-removebg.png',
  },
  {
    num: 2,
    title: 'Curated templates',
    description: 'Select from designs crafted by professional stylists',
    image: '/ai-flow/step-2-removebg.png',
  },
  {
    num: 3,
    title: 'Shop the look',
    description: 'Purchase every piece directly, delivered to your door',
    image: '/ai-flow/step-3-removebg.png',
  },
]

// Room types (with images like app)
const roomTypes = [
  { id: 'bedroom', name: 'Bedroom', image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=400&fit=crop' },
  { id: 'living-room', name: 'Living Room', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=400&fit=crop' },
  { id: 'dining-room', name: 'Dining Room', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop' },
  { id: 'office', name: 'Office', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop' },
]

// Design styles (with Unsplash commercial-free images)
const designStyles = [
  { id: 'traditional', name: 'Traditional', image: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&h=400&fit=crop' },
  { id: 'modern', name: 'Modern', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop' },
]

// Gallery images for results (only 2) with furniture from actual demos
const galleryImages = [
  {
    src: '/ai-flow/covers/modern-cover.png',
    style: 'Modern',
    room: 'Bedroom',
    furniture: [
      { name: 'Platform Bed', image: '/images/templates/bedroom-1/bed.png', price: '$1,299' },
      { name: 'Nightstand', image: '/images/templates/bedroom-1/nightstand.png', price: '$349' },
      { name: 'Table Lamp', image: '/images/templates/bedroom-1/lamp.png', price: '$189' },
      { name: 'Wall Art', image: '/images/templates/bedroom-1/painting.png', price: '$249' },
    ]
  },
  {
    src: '/ai-flow/covers/traditional-cover.jpg',
    style: 'Traditional',
    room: 'Bedroom',
    furniture: [
      { name: 'Classic Bed', image: '/images/templates/bedroom-2/bed.png', price: '$1,599' },
      { name: 'Nightstand', image: '/images/templates/bedroom-2/nightstand.jpg', price: '$449' },
      { name: 'Table Lamp', image: '/images/templates/bedroom-2/lamp.png', price: '$229' },
      { name: 'Cabinet', image: '/images/templates/bedroom-2/cabinet.png', price: '$899' },
    ]
  },
]

// Supporters / backers logos
const supporters = [
  { name: 'Zhejiang Lab', logo: '/images/supporters/zli_logo_t.png' },
  { name: 'Desai Accelerator', logo: '/images/supporters/desai_accelerator_logo.jpg' },
  { name: 'Spark', logo: '/images/supporters/spark_logo.png' },
]

// Animated prompt text
const promptText = "A cozy bedroom with warm lighting, natural wood furniture, soft textiles, and a reading corner by the window..."

export default function Home() {
  const [currentShowcase, setCurrentShowcase] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  // Auto-progressing demo state
  const [demoStep, setDemoStep] = useState(0) // 0: capture, 1: style, 2: 3d, 3: results
  const [selectedRoom, setSelectedRoom] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('')
  const [animatedPrompt, setAnimatedPrompt] = useState('')
  const [currentResultImage, setCurrentResultImage] = useState(0)

  const sliderRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-progress through demo steps
  useEffect(() => {
    const timings = [6000, 9000, 8000, 6000] // Duration for each step (longer)

    const timer = setTimeout(() => {
      setDemoStep((prev) => (prev + 1) % 4)
    }, timings[demoStep])

    return () => clearTimeout(timer)
  }, [demoStep])

  // Animate selections in style step
  useEffect(() => {
    if (demoStep === 1) {
      // Reset selections
      setSelectedRoom('')
      setSelectedStyle('')
      setAnimatedPrompt('')

      // Animate room selection
      const roomTimer = setTimeout(() => {
        setSelectedRoom('bedroom')
      }, 800)

      // Animate style selection
      const styleTimer = setTimeout(() => {
        setSelectedStyle('modern')
      }, 1600)

      // Animate prompt typing
      const promptTimer = setTimeout(() => {
        let index = 0
        const typeInterval = setInterval(() => {
          if (index <= promptText.length) {
            setAnimatedPrompt(promptText.slice(0, index))
            index++
          } else {
            clearInterval(typeInterval)
          }
        }, 30)
        return () => clearInterval(typeInterval)
      }, 2200)

      return () => {
        clearTimeout(roomTimer)
        clearTimeout(styleTimer)
        clearTimeout(promptTimer)
      }
    }
  }, [demoStep])

  // Cycle through result images
  useEffect(() => {
    if (demoStep === 3) {
      const interval = setInterval(() => {
        setCurrentResultImage((prev) => (prev + 1) % galleryImages.length)
      }, 3500)
      return () => clearInterval(interval)
    }
  }, [demoStep])

  // Before/After slider drag handling
  const handleSliderDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current || !isDragging) return
    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const position = ((clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, position)))
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'GT America', sans-serif" }}>
      <Header />

      <main className="pt-20">
        {/* Section 0: Try It Now - QR Code */}
        <section className="py-16 bg-[#101A2E]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
              {/* QR Code */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-44 h-44 rounded-2xl border-2 border-[#D1903E] p-2 shadow-2xl">
                  <div className="w-full h-full rounded-xl overflow-hidden">
                    <Image
                      src="/images/qr-code.png"
                      alt="Scan to try Philo Homes"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="text-center md:text-left max-w-md">
                <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-3">Start Designing</p>
                <h2
                  className="text-2xl md:text-3xl text-white mb-3 leading-tight"
                  style={{ fontFamily: "'Henry Trial', serif" }}
                >
                  Scan to Begin
                </h2>
                <p className="text-[#8E8E8E] text-sm leading-relaxed mb-4">
                  Open the app, capture your room, and let our AI curate a design tailored to your style.
                </p>

                {/* Instagram Follow */}
                <a
                  href="https://instagram.com/philo.homes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-3 transition-colors"
                >
                  <svg className="w-5 h-5 text-[#D1903E]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <div>
                    <p className="text-white text-sm font-medium">@philo.homes</p>
                    <p className="text-white/60 text-xs">Follow for designs, news, and launches</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Transform any room (Hero) */}
        <section className="py-20 bg-[#FAFAFA]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Before/After Slider */}
              <div className="order-2 lg:order-1">
                <div
                  ref={sliderRef}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none"
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                  onMouseMove={handleSliderDrag}
                  onTouchStart={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                  onTouchMove={handleSliderDrag}
                >
                  {/* After Image (background) */}
                  <Image
                    src={showcaseData[currentShowcase].after}
                    alt="After"
                    fill
                    className="object-cover"
                  />

                  {/* Before Image (clipped) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <Image
                      src={showcaseData[currentShowcase].before}
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Slider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#101A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded">
                    Before
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#D1903E] text-white text-xs px-3 py-1.5 rounded">
                    After
                  </div>
                </div>

                {/* Pagination dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {showcaseData.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentShowcase(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === currentShowcase ? 'bg-[#D1903E]' : 'bg-[#E1E1E1]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-4">AI Interior Design</p>
                <h1
                  className="text-3xl md:text-5xl text-[#101A2E] mb-6 leading-tight"
                  style={{ fontFamily: "'Henry Trial', serif" }}
                >
                  AI-powered<br />interior design
                </h1>
                <p className="text-[#4B4B4B] leading-relaxed mb-8">
                  Capture your space, select a style, and receive a professionally curated design — complete with furniture you can purchase directly.
                </p>

                {/* Stats */}
                <div className="flex gap-8 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-[#D1903E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-2xl text-[#101A2E] font-medium">$3,500</span>
                    </div>
                    <p className="text-xs text-[#8E8E8E]">Avg. savings vs designer</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-[#D1903E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-2xl text-[#101A2E] font-medium">1,200h</span>
                    </div>
                    <p className="text-xs text-[#8E8E8E]">Time saved for users</p>
                  </div>
                </div>

                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-3 bg-[#101A2E] text-white px-8 py-4 text-sm tracking-wide hover:bg-[#1F1F1F] transition-colors"
                >
                  <span>Book for Demo</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Experience AI Design - Auto-progressing */}
        <section id="ai-demo" className="py-20 bg-[#101A2E]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-4">How It Works</p>
              <h2
                className="text-3xl md:text-4xl text-white mb-4"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                Your Room, Reimagined
              </h2>
              <p className="text-[#8E8E8E]">
                Capture, customize, and create — in under a minute
              </p>
            </div>

            {/* Step Progress - Clickable */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
              {['Capture', 'Style', '3D View', 'Results'].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setDemoStep(i)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500 group-hover:scale-110 ${
                    demoStep >= i ? 'bg-[#D1903E] text-white' : 'bg-[#2A3444] text-[#8E8E8E] group-hover:bg-[#3A4454]'
                  }`}>
                    {demoStep > i ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span className={`text-xs mt-2 transition-colors ${demoStep >= i ? 'text-white' : 'text-[#8E8E8E]'}`}>
                    {label}
                  </span>
                </button>
              ))}
            </div>

            {/* Demo Content - Fixed size container */}
            <div className="max-w-2xl mx-auto h-[480px] md:h-[520px]">
              <AnimatePresence mode="wait">
                {/* Step 0: Video Recording */}
                {demoStep === 0 && (
                  <motion.div
                    key="capture"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col items-center justify-center"
                  >
                    {/* Phone mockup */}
                    <div className="relative w-[200px] aspect-[9/19] mb-4">
                      <div className="absolute inset-0 bg-[#0A0A0A] rounded-[2.5rem] shadow-2xl" />
                      <div className="absolute inset-[3px] bg-[#0A0A0A] rounded-[2.3rem] overflow-hidden">
                        <div className="absolute inset-2 rounded-[2rem] overflow-hidden">
                          <video
                            ref={videoRef}
                            src="/videos/bedroom-1-square-compressed.mp4"
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        </div>
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-[#0A0A0A] rounded-full" />
                      </div>

                      {/* Recording indicator */}
                      <div className="absolute top-6 right-5 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-white text-[10px]">REC</span>
                      </div>
                    </div>

                    <p className="text-white/60 text-sm">Recording your room...</p>
                  </motion.div>
                )}

                {/* Step 1: Style Selection (App-like design) */}
                {demoStep === 1 && (
                  <motion.div
                    key="style"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full bg-[#1A2436] rounded-2xl p-5 flex flex-col"
                  >
                    {/* Header */}
                    <div className="text-center mb-4">
                      <h3 className="text-lg text-white mb-1" style={{ fontFamily: "'Henry Trial', serif" }}>
                        Select Your Preferences
                      </h3>
                      <p className="text-[10px] text-[#D1903E] uppercase tracking-wider">Customize Your Space</p>
                    </div>

                    {/* Room Type - Horizontal scroll circles */}
                    <div className="mb-4">
                      <p className="text-[10px] text-white/60 uppercase tracking-wider mb-3">Room Type</p>
                      <div className="flex gap-3 md:gap-4 justify-center py-1 px-1 overflow-x-auto">
                        {roomTypes.map((room) => (
                          <div key={room.id} className="flex flex-col items-center flex-shrink-0">
                            <div
                              className={`relative w-14 h-14 rounded-full overflow-hidden transition-all duration-300 ${
                                selectedRoom === room.id ? 'ring-2 ring-[#D1903E] ring-offset-2 ring-offset-[#1A2436]' : 'ring-1 ring-white/20'
                              }`}
                            >
                              <Image src={room.image} alt={room.name} fill className="object-cover" />
                              {selectedRoom === room.id && (
                                <div className="absolute inset-0 bg-[#D1903E]/20 flex items-center justify-center">
                                  <div className="w-5 h-5 bg-[#D1903E] rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                            <span className={`text-[10px] mt-1.5 transition-colors ${selectedRoom === room.id ? 'text-[#D1903E]' : 'text-white/60'}`}>
                              {room.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Design Style - Grid cards */}
                    <div className="flex-1 flex flex-col mb-3">
                      <p className="text-[10px] text-white/60 uppercase tracking-wider mb-3">Design Style</p>
                      <div className="grid grid-cols-2 gap-3 flex-1">
                        {designStyles.map((style) => (
                          <div
                            key={style.id}
                            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                              selectedStyle === style.id ? 'ring-2 ring-[#D1903E] ring-offset-2 ring-offset-[#1A2436]' : 'ring-1 ring-white/20'
                            }`}
                          >
                            <Image src={style.image} alt={style.name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <p className="absolute bottom-2 left-3 text-white text-sm">{style.name}</p>
                            {selectedStyle === style.id && (
                              <div className="absolute top-2 right-2 w-5 h-5 bg-[#D1903E] rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Custom Prompt - Animated typing */}
                    <div className="bg-[#2A3444] rounded-xl p-3">
                      <p className="text-white/80 text-xs leading-relaxed">
                        {animatedPrompt}
                        <span className="inline-block w-0.5 h-3 bg-[#D1903E] ml-0.5 animate-pulse" />
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: 3D Viewer */}
                {demoStep === 2 && (
                  <motion.div
                    key="3d-viewer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full"
                  >
                    <div className="h-full w-full rounded-xl overflow-hidden relative">
                      <Room3DViewer className="w-full h-full" />

                      {/* Room dimensions badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
                        <p className="text-[9px] text-[#8E8E8E] uppercase tracking-wider">Room Size</p>
                        <p className="text-sm text-[#101A2E] font-medium">5.2m × 3.15m × 2.6m</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Results - Cycling through gallery */}
                {demoStep === 3 && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full flex flex-col md:flex-row gap-4 md:gap-5"
                  >
                    {/* Left side - Result Image with thumbnails */}
                    <div className="flex-1 flex flex-col min-h-0">
                      {/* Main Result Image */}
                      <div className="flex-1 rounded-xl overflow-hidden relative">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentResultImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={galleryImages[currentResultImage].src}
                              alt={galleryImages[currentResultImage].style}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Style tag */}
                        <div className="absolute bottom-3 left-3 flex gap-2">
                          <span className="bg-white/90 backdrop-blur-sm text-[#101A2E] px-2.5 py-1 rounded-full text-xs font-medium">
                            {galleryImages[currentResultImage].style}
                          </span>
                          <span className="bg-white/90 backdrop-blur-sm text-[#101A2E] px-2.5 py-1 rounded-full text-xs font-medium">
                            {galleryImages[currentResultImage].room}
                          </span>
                        </div>
                      </div>

                      {/* Thumbnail strip - below image */}
                      <div className="flex gap-2 mt-3">
                        {galleryImages.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentResultImage(i)}
                            className={`relative w-16 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                              i === currentResultImage ? 'ring-2 ring-[#D1903E] ring-offset-2 ring-offset-[#101A2E]' : 'opacity-50 hover:opacity-80'
                            }`}
                          >
                            <Image src={img.src} alt={img.style} fill className="object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <span className="text-white text-[9px] font-medium">{img.style}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right side - Furniture panel */}
                    <div className="w-full md:w-[180px] bg-[#1A2436] rounded-xl p-4 flex flex-col max-h-[200px] md:max-h-none overflow-y-auto">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-white font-medium">Furniture Used</p>
                        <span className="text-[10px] text-[#D1903E]">{galleryImages[currentResultImage].furniture.length} items</span>
                      </div>
                      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                        {galleryImages[currentResultImage].furniture.map((item, i) => (
                          <div
                            key={i}
                            className="bg-[#0F1520] rounded-lg p-2.5 flex items-center gap-3"
                          >
                            <div className="relative w-12 h-12 flex-shrink-0 bg-white/5 rounded-md">
                              <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-[10px] leading-tight mb-0.5">{item.name}</p>
                              <p className="text-[#D1903E] text-sm font-medium">{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="mt-3 w-full bg-[#D1903E] text-white text-xs py-2.5 rounded-lg hover:bg-[#B8792F] transition-colors">
                        Shop All Items
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* Section 3: Design in three simple steps */}
        <section className="py-20 bg-[#FAFAFA]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-2">The Process</p>
              <h2
                className="text-3xl text-[#101A2E]"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                From Vision to Reality
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {flowSteps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center"
                >
                  {/* Step Image */}
                  <div className="relative h-48 mb-6">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Numbered Circle */}
                  <div className="w-8 h-8 rounded-full bg-[#D1903E] text-white flex items-center justify-center text-sm font-medium mx-auto mb-4">
                    {step.num}
                  </div>

                  <h4 className="text-[#101A2E] font-medium mb-2">{step.title}</h4>
                  <p className="text-[#8E8E8E] text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Ready-made layouts */}
        <section className="py-20 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="mb-10">
              <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-2">Curated Designs</p>
              <h2
                className="text-3xl text-[#101A2E]"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                Designer Templates
              </h2>
            </div>

            {/* Template Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {layoutTemplates.map((template, i) => (
                <Link key={template.id} href="/case-study">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                      <Image
                        src={template.image}
                        alt={template.style}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Arrow button */}
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4 text-[#101A2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-[#101A2E] font-medium">{template.style}</p>
                    <p className="text-[#8E8E8E] text-sm">{template.room}</p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Supporters */}
        <section className="py-20 bg-[#0E284B]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <p className="text-[10px] text-[#D1903E] uppercase tracking-[0.2em] mb-2">Backed By</p>
              <h2
                className="text-3xl text-white"
                style={{ fontFamily: "'Henry Trial', serif" }}
              >
                Our Supporters
              </h2>
            </div>

            {/* Logos */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {supporters.map((supporter) => (
                <div key={supporter.name} className="relative h-20 w-44 md:h-28 md:w-64">
                  <Image
                    src={supporter.logo}
                    alt={supporter.name}
                    fill
                    className="supporter-logo object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
