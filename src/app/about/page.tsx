import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-vintage-cream">
      <Header />
      
      <main>
        {/* Hero Section - Refined Vintage Style */}
        <section className="relative min-h-screen overflow-hidden">
          <Image 
            src="/images/about-image.png" 
            alt="About Philo Homes" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Centered Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center text-white max-w-2xl">
              <h1 
                className="font-bold tracking-wider mb-6 uppercase"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  fontSize: '20px',
                  lineHeight: '1.1',
                  letterSpacing: '0.3px'
                }}
              >
                About
              </h1>
              
              <div className="vintage-divider bg-white/60 mx-auto mb-6"></div>
              
              <p 
                className="text-white/90 uppercase tracking-widest font-light"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '2px'
                }}
              >
                Designing homes with precision & soul
              </p>
            </div>
          </div>
        </section>

        {/* Story Section - Enhanced Minimal */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-2 lg:order-1">
                <div className="mb-16">
                  <Image 
                    src="/images/logo-icon.png" 
                    alt="Philo Homes Icon" 
                    width={48} 
                    height={48} 
                    className="w-12 h-12 object-contain opacity-60"
                  />
                </div>
                
                <div className="vintage-divider mb-12"></div>
                
                <h2 className="vintage-heading text-4xl md:text-5xl mb-16">
                  Our Story
                </h2>
                
                <p 
                  className="text-lg leading-loose text-vintage-warm font-light mb-8"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    lineHeight: '2.2'
                  }}
                >
                  Philo Homes revolutionizes home design through AI-powered FurniSelect™ Templates. Our patented algorithm merges cutting-edge technology with timeless design principles.
                </p>
                
                <p 
                  className="vintage-subheading text-vintage-warm"
                  style={{ letterSpacing: '1.5px' }}
                >
                  Est. 2024 — Crafted by renowned designers
                </p>
              </div>
              
              <div className="order-1 lg:order-2">
                                  <div className="relative h-[500px] overflow-hidden">
                    <Image 
                      src="/images/about-image-1.jpg" 
                      alt="Our Story" 
                      fill
                      className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/15"></div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section - Refined */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-vintage-light">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="order-1">
                <div className="relative h-[500px] overflow-hidden">
                  <Image 
                    src="/images/about-image-2.jpg" 
                    alt="Our Mission" 
                    fill
                    className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-black/15"></div>
                </div>
              </div>
              
              <div className="order-2">
                <div className="vintage-divider mb-12"></div>
                
                <h2 className="vintage-heading text-4xl md:text-5xl mb-16">
                  Our Mission
                </h2>
                
                <p 
                  className="text-lg leading-loose text-vintage-warm font-light mb-8"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    lineHeight: '2.2'
                  }}
                >
                  Empowering effortless home design through intelligent technology. We eliminate the overwhelm of decorating by placing professional design expertise at your fingertips.
                </p>
                
                <p 
                  className="vintage-subheading text-vintage-warm"
                  style={{ letterSpacing: '1.5px' }}
                >
                  Technology meets timeless design
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section - Ultra Minimal */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24">
              <div className="vintage-divider mb-12"></div>
              
              <h2 className="vintage-heading text-4xl md:text-5xl mb-8">
                How It Works
              </h2>
              
              <p className="vintage-subheading">
                Four key innovations
              </p>
            </div>

            {/* Elegant Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="text-center group">
                <div className="w-16 h-16 bg-vintage-gold rounded-full flex items-center justify-center mx-auto mb-12 group-hover:bg-vintage-gold-dark transition-all duration-300">
                  <span className="text-white text-lg font-medium" style={{ fontFamily: 'GT America, sans-serif' }}>
                    01
                  </span>
                </div>
                <h3 className="vintage-heading text-xl mb-6 text-vintage-gold">
                  Smart Templates
                </h3>
                <p className="vintage-subheading text-vintage-warm">
                  AI-powered customization
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-vintage-gold rounded-full flex items-center justify-center mx-auto mb-12 group-hover:bg-vintage-gold-dark transition-all duration-300">
                  <span className="text-white text-lg font-medium" style={{ fontFamily: 'GT America, sans-serif' }}>
                    02
                  </span>
                </div>
                <h3 className="vintage-heading text-xl mb-6 text-vintage-gold">
                  One-Click Purchase
                </h3>
                <p className="vintage-subheading text-vintage-warm">
                  Seamless shopping experience
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-vintage-gold rounded-full flex items-center justify-center mx-auto mb-12 group-hover:bg-vintage-gold-dark transition-all duration-300">
                  <span className="text-white text-lg font-medium" style={{ fontFamily: 'GT America, sans-serif' }}>
                    03
                  </span>
                </div>
                <h3 className="vintage-heading text-xl mb-6 text-vintage-gold">
                  Expert Curation
                </h3>
                <p className="vintage-subheading text-vintage-warm">
                  Professional design guidance
                </p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-vintage-gold rounded-full flex items-center justify-center mx-auto mb-12 group-hover:bg-vintage-gold-dark transition-all duration-300">
                  <span className="text-white text-lg font-medium" style={{ fontFamily: 'GT America, sans-serif' }}>
                    04
                  </span>
                </div>
                <h3 className="vintage-heading text-xl mb-6 text-vintage-gold">
                  Instant Vision
                </h3>
                <p className="vintage-subheading text-vintage-warm">
                  Real-time room visualization
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section - Elegant */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 min-h-[600px] flex items-center">
          <Image 
            src="/images/quote-image-1.png" 
            alt="Quote Background" 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative max-w-4xl mx-auto text-center w-full">
            <div className="vintage-divider bg-vintage-gold mb-12"></div>
            
            <blockquote 
              className="text-2xl md:text-3xl leading-relaxed font-light italic mb-12"
              style={{ 
                fontFamily: 'Henry Trial, serif',
                lineHeight: '1.6',
                color: '#ffffff'
              }}
            >
              "We believe every home should tell a story—your story."
            </blockquote>
            
            <p 
              className="uppercase tracking-widest font-light"
              style={{ 
                fontFamily: 'GT America, sans-serif',
                fontSize: '12px',
                letterSpacing: '2px',
                color: '#C9A876'
              }}
            >
              Philo Homes Philosophy
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 