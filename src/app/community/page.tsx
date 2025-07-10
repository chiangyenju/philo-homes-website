import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Community() {
  return (
    <div className="min-h-screen bg-vintage-cream">
      <Header />
      
      <main>
        {/* Hero Section - Refined Vintage Style */}
        <section className="relative min-h-screen overflow-hidden">
          <Image 
            src="/images/community-hero.jpg" 
            alt="Community Coming Soon" 
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
                  fontSize: '24px',
                  lineHeight: '1.1',
                  letterSpacing: '0.3px'
                }}
              >
                Coming Soon
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
                Share your design challenges
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section - Elegant Minimal */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-24">
              <div className="vintage-divider mb-12"></div>
              
              <h2 className="vintage-heading text-4xl md:text-5xl mb-8">
                Tell Us More
              </h2>
              
              <p className="vintage-subheading">
                Help us build better solutions
              </p>
            </div>

            {/* Refined Contact Form */}
            <div className="bg-vintage-light rounded-none p-16 mb-20">
              <form action="#" method="POST" className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="vintage-subheading block mb-4"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="vintage-input w-full"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className="vintage-subheading block mb-4"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="vintage-input w-full"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="challenge-type" 
                    className="vintage-subheading block mb-4"
                  >
                    Challenge Type
                  </label>
                  <select
                    id="challenge-type"
                    name="challenge-type"
                    className="vintage-input w-full appearance-none bg-transparent"
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0 center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Select a challenge type</option>
                    <option value="furniture-selection">Furniture Selection</option>
                    <option value="color-coordination">Color Coordination</option>
                    <option value="space-planning">Space Planning</option>
                    <option value="style-consistency">Style Consistency</option>
                    <option value="budget-constraints">Budget Constraints</option>
                    <option value="small-spaces">Small Spaces</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label 
                    htmlFor="message" 
                    className="vintage-subheading block mb-4"
                  >
                    Your Challenge
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="vintage-input w-full resize-none"
                    placeholder="Describe your interior design challenge in detail..."
                  ></textarea>
                </div>

                <div className="text-center pt-8">
                  <button 
                    type="submit"
                    className="vintage-button"
                  >
                    Submit Challenge
                  </button>
                </div>
              </form>
            </div>

            {/* Challenge Types Preview - Ultra Minimal */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="group">
                <div className="w-12 h-12 bg-vintage-light rounded-full mx-auto mb-8 flex items-center justify-center group-hover:bg-vintage-gold transition-all duration-300">
                  <span className="vintage-subheading text-vintage-gold group-hover:text-white transition-colors">
                    01
                  </span>
                </div>
                <h3 className="vintage-heading text-lg mb-4 text-vintage-gold">
                  Space Planning
                </h3>
                <p className="vintage-subheading text-vintage-warm">
                  Layout optimization
                </p>
              </div>

              <div className="group">
                <div className="w-12 h-12 bg-vintage-light rounded-full mx-auto mb-8 flex items-center justify-center group-hover:bg-vintage-gold transition-all duration-300">
                  <span className="vintage-subheading text-vintage-gold group-hover:text-white transition-colors">
                    02
                  </span>
                </div>
                <h3 className="vintage-heading text-lg mb-4 text-vintage-gold">
                  Style Harmony
                </h3>
                <p className="vintage-subheading text-vintage-warm">
                  Cohesive aesthetics
                </p>
              </div>

              <div className="group">
                <div className="w-12 h-12 bg-vintage-light rounded-full mx-auto mb-8 flex items-center justify-center group-hover:bg-vintage-gold transition-all duration-300">
                  <span className="vintage-subheading text-vintage-gold group-hover:text-white transition-colors">
                    03
                  </span>
                </div>
                <h3 className="vintage-heading text-lg mb-4 text-vintage-gold">
                  Budget Solutions
                </h3>
                <p className="vintage-subheading text-vintage-warm">
                  Smart investments
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section - Elegant */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 min-h-[600px] flex items-center">
          <Image 
            src="/images/quote-image-2.png" 
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
              &ldquo;Your design challenges inspire our innovations.&rdquo;
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
              Community Driven Design
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
} 