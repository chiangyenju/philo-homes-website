import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function Community() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section - Consistent Style */}
        <section className="relative min-h-screen overflow-hidden">
          <Image 
            src="/images/about-image-3.png" 
            alt="Community Coming Soon" 
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
                Coming Soon
              </h1>
              
              <p 
                className="text-xs md:text-sm font-light uppercase tracking-widest opacity-80"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  letterSpacing: '3px'
                }}
              >
                Share your design challenges
              </p>
            </div>
          </div>
        </section>

        {/* Share Your Challenges Section - Simplified */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-20">
              <h2 
                className="text-5xl md:text-6xl font-normal mb-8 leading-tight"
                style={{ 
                  fontFamily: 'Henry Trial, serif',
                  color: '#10182B'
                }}
              >
                Tell Us More
              </h2>
              <p 
                className="text-xs uppercase tracking-widest text-gray-500 font-light"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  letterSpacing: '2px'
                }}
              >
                Help us build better solutions
              </p>
            </div>

            {/* Simplified Comment Form */}
            <div className="bg-gray-50 rounded-lg p-12 mb-16">
              <form action="#" method="POST" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-xs uppercase tracking-wide text-gray-600 mb-3 font-light"
                      style={{ 
                        fontFamily: 'GT America, sans-serif',
                        letterSpacing: '1px'
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:border-golden focus:ring-0 transition-colors text-lg"
                      style={{ fontFamily: 'GT America, sans-serif' }}
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-xs uppercase tracking-wide text-gray-600 mb-3 font-light"
                      style={{ 
                        fontFamily: 'GT America, sans-serif',
                        letterSpacing: '1px'
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:border-golden focus:ring-0 transition-colors text-lg"
                      style={{ fontFamily: 'GT America, sans-serif' }}
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="challenge-type" 
                    className="block text-xs uppercase tracking-wide text-gray-600 mb-3 font-light"
                    style={{ 
                      fontFamily: 'GT America, sans-serif',
                      letterSpacing: '1px'
                    }}
                  >
                    Challenge Type
                  </label>
                  <select
                    id="challenge-type"
                    name="challenge-type"
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:border-golden focus:ring-0 transition-colors text-lg"
                    style={{ fontFamily: 'GT America, sans-serif' }}
                  >
                    <option value="">Select one</option>
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
                    className="block text-xs uppercase tracking-wide text-gray-600 mb-3 font-light"
                    style={{ 
                      fontFamily: 'GT America, sans-serif',
                      letterSpacing: '1px'
                    }}
                  >
                    Your Challenge
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-0 py-4 border-0 border-b-2 border-gray-200 bg-transparent focus:border-golden focus:ring-0 transition-colors resize-none text-lg"
                    style={{ fontFamily: 'GT America, sans-serif' }}
                    placeholder="Tell us about your interior design challenge..."
                  ></textarea>
                </div>

                <div className="text-center pt-8">
                  <button 
                    type="submit"
                    className="bg-transparent border-2 text-golden border-golden hover:bg-golden hover:text-white hover:border-golden px-12 py-4 text-xs font-light transition-all duration-300 uppercase tracking-widest rounded-none"
                    style={{ 
                      fontFamily: 'GT America, sans-serif',
                      letterSpacing: '2px'
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Minimal Challenge Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span 
                    className="text-golden text-2xl font-bold"
                    style={{ fontFamily: 'GT America, sans-serif' }}
                  >
                    01
                  </span>
                </div>
                <h3 
                  className="text-lg font-normal mb-3"
                  style={{ 
                    fontFamily: 'Henry Trial, serif',
                    color: '#10182B'
                  }}
                >
                  Selection
                </h3>
                <p 
                  className="text-xs uppercase tracking-wide text-gray-500 font-light"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    letterSpacing: '1px'
                  }}
                >
                  Finding the right pieces
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span 
                    className="text-golden text-2xl font-bold"
                    style={{ fontFamily: 'GT America, sans-serif' }}
                  >
                    02
                  </span>
                </div>
                <h3 
                  className="text-lg font-normal mb-3"
                  style={{ 
                    fontFamily: 'Henry Trial, serif',
                    color: '#10182B'
                  }}
                >
                  Planning
                </h3>
                <p 
                  className="text-xs uppercase tracking-wide text-gray-500 font-light"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    letterSpacing: '1px'
                  }}
                >
                  Space optimization
                </p>
              </div>

              <div>
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span 
                    className="text-golden text-2xl font-bold"
                    style={{ fontFamily: 'GT America, sans-serif' }}
                  >
                    03
                  </span>
                </div>
                <h3 
                  className="text-lg font-normal mb-3"
                  style={{ 
                    fontFamily: 'Henry Trial, serif',
                    color: '#10182B'
                  }}
                >
                  Cohesion
                </h3>
                <p 
                  className="text-xs uppercase tracking-wide text-gray-500 font-light"
                  style={{ 
                    fontFamily: 'GT America, sans-serif',
                    letterSpacing: '1px'
                  }}
                >
                  Style consistency
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