import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section - Consistent Style */}
        <section className="relative min-h-screen overflow-hidden">
          <Image 
            src="/images/about-image.png" 
            alt="About Philo Homes" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          
          {/* Centered Content */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center text-white max-w-3xl">
              <h1 
                className="text-6xl md:text-8xl font-bold tracking-wider mb-8 uppercase"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  letterSpacing: '2px'
                }}
              >
                About
              </h1>
              
              <p 
                className="text-xs md:text-sm font-light uppercase tracking-widest opacity-80"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  letterSpacing: '3px'
                }}
              >
                Designing your dream home with precision
              </p>
            </div>
          </div>
        </section>

        {/* About Section - Minimal */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="mb-12">
                  <Image 
                    src="/images/logo-icon.png" 
                    alt="Philo Homes Icon" 
                    width={60} 
                    height={60} 
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <h2 
                  className="text-5xl md:text-6xl font-normal mb-12 leading-tight"
                  style={{ 
                    fontFamily: 'Henry Trial, serif',
                    color: '#10182B'
                  }}
                >
                  Our Story
                </h2>
                <p 
                  className="text-lg leading-relaxed text-gray-600 font-light"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    lineHeight: '1.9'
                  }}
                >
                  Philo Homes revolutionizes home design with AI-powered FurniSelect™ Templates. Our patented algorithm, crafted by renowned designers, creates personalized spaces with one-click furniture purchasing.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/about-image-2.png" 
                    alt="Our Story" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-1">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/about-image-3.png" 
                    alt="Our Mission" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="order-2">
                <h2 
                  className="text-5xl md:text-6xl font-normal mb-12 leading-tight"
                  style={{ 
                    fontFamily: 'Henry Trial, serif',
                    color: '#10182B'
                  }}
                >
                  Our Mission
                </h2>
                <p 
                  className="text-lg leading-relaxed text-gray-600 font-light"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    lineHeight: '1.9'
                  }}
                >
                  Empowering effortless home design through intelligent technology. We eliminate the overwhelm of decorating by placing professional design expertise at your fingertips.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section - Streamlined */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 
                className="text-5xl md:text-6xl font-normal mb-8 leading-tight"
                style={{ 
                  fontFamily: 'Henry Trial, serif',
                  color: '#10182B'
                }}
              >
                How It Works
              </h2>
              <p 
                className="text-xs uppercase tracking-widest text-gray-500 font-light"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  letterSpacing: '2px'
                }}
              >
                Four key innovations
              </p>
            </div>

            {/* Simplified Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="text-center">
                <div className="w-20 h-20 bg-golden rounded-full flex items-center justify-center mx-auto mb-8">
                  <span 
                    className="text-white text-2xl font-bold"
                    style={{ fontFamily: 'GT America, sans-serif' }}
                  >
                    01
                  </span>
                </div>
                <h3 
                  className="text-2xl font-normal mb-6"
                  style={{ 
                    fontFamily: 'Henry Trial, serif',
                    color: '#D8A559'
                  }}
                >
                  Smart Templates
                </h3>
                <p 
                  className="text-xs uppercase tracking-wide text-gray-500 font-light"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    letterSpacing: '1px'
                  }}
                >
                  AI-powered customization
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-golden rounded-full flex items-center justify-center mx-auto mb-8">
                  <span 
                    className="text-white text-2xl font-bold"
                    style={{ fontFamily: 'GT America, sans-serif' }}
                  >
                    02
                  </span>
                </div>
                <h3 
                  className="text-2xl font-normal mb-6"
                  style={{ 
                    fontFamily: 'Henry Trial, serif',
                    color: '#D8A559'
                  }}
                >
                  One-Click Purchase
                </h3>
                <p 
                  className="text-xs uppercase tracking-wide text-gray-500 font-light"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    letterSpacing: '1px'
                  }}
                >
                  Seamless shopping
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-golden rounded-full flex items-center justify-center mx-auto mb-8">
                  <span 
                    className="text-white text-2xl font-bold"
                    style={{ fontFamily: 'GT America, sans-serif' }}
                  >
                    03
                  </span>
                </div>
                <h3 
                  className="text-2xl font-normal mb-6"
                  style={{ 
                    fontFamily: 'Henry Trial, serif',
                    color: '#D8A559'
                  }}
                >
                  Instant Results
                </h3>
                <p 
                  className="text-xs uppercase tracking-wide text-gray-500 font-light"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    letterSpacing: '1px'
                  }}
                >
                  No more searching
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-golden rounded-full flex items-center justify-center mx-auto mb-8">
                  <span 
                    className="text-white text-2xl font-bold"
                    style={{ fontFamily: 'GT America, sans-serif' }}
                  >
                    04
                  </span>
                </div>
                <h3 
                  className="text-2xl font-normal mb-6"
                  style={{ 
                    fontFamily: 'Henry Trial, serif',
                    color: '#D8A559'
                  }}
                >
                  Perfect Harmony
                </h3>
                <p 
                  className="text-xs uppercase tracking-wide text-gray-500 font-light"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    letterSpacing: '1px'
                  }}
                >
                  Curated consistency
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  )
} 