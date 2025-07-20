import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Community() {
  return (
    <div className="min-h-screen bg-vintage-cream">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen overflow-hidden">
          <Image 
            src="/images/community-hero.jpg" 
            alt="Community" 
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
                Community
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
                Coming Soon
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="vintage-divider mb-12"></div>
            
            <h2 className="vintage-heading text-4xl md:text-5xl mb-8">
              Join Our Design Community
            </h2>
            
            <p 
              className="text-lg leading-loose text-vintage-warm font-light mb-12"
              style={{ 
                fontFamily: 'GT America, sans-serif',
                lineHeight: '2'
              }}
            >
              We&apos;re building something special—a place where design enthusiasts, homeowners, 
              and professionals come together to share ideas, inspire each other, and create 
              beautiful spaces.
            </p>
            
            <div className="max-w-md mx-auto">
              <form className="space-y-6">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="vintage-input w-full"
                  required
                />
                <button 
                  type="submit"
                  className="vintage-button w-full"
                >
                  Get Early Access
                </button>
              </form>
              
              <p className="vintage-subheading mt-8">
                Be the first to know when we launch
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}