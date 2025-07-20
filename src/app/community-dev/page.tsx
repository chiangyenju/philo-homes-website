'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Heart, MessageCircle, Bookmark, Plus, Search, Filter, TrendingUp, Award, Users, Sparkles } from 'lucide-react'

export default function Community() {
  const [activeTab, setActiveTab] = useState<'all' | 'layouts' | 'designers' | 'create' | 'discuss'>('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedForumCategory, setSelectedForumCategory] = useState('Room Makeovers')

  // Mock data for designs using available images
  const mockDesigns = [
    { id: 1, image: '/images/hero-1.png', title: 'Modern Minimalist Living Room', author: 'Sarah Chen', likes: 892, comments: 45, category: 'living' },
    { id: 2, image: '/images/hero-2.jpg', title: 'Cozy Scandinavian Bedroom', author: 'Mike Johnson', likes: 756, comments: 23, category: 'bedroom' },
    { id: 3, image: '/images/quote-image-2.png', title: 'Industrial Kitchen Design', author: 'Emma Wilson', likes: 634, comments: 67, category: 'kitchen' },
    { id: 4, image: '/images/about-image-1.jpg', title: 'Bohemian Home Office', author: 'Alex Rivera', likes: 512, comments: 34, category: 'office' },
    { id: 5, image: '/images/about-image-2.jpg', title: 'Luxury Master Bath', author: 'Lisa Park', likes: 423, comments: 56, category: 'bathroom' },
    { id: 6, image: '/images/quote-image-1.png', title: 'Vintage Dining Room', author: 'Tom Davis', likes: 356, comments: 41, category: 'dining' },
    { id: 7, image: '/images/quote-image-2.png', title: 'Contemporary Workspace', author: 'Jordan Kim', likes: 289, comments: 29, category: 'office' },
    { id: 8, image: '/images/community-hero.jpg', title: 'Rustic Living Space', author: 'Maria Lopez', likes: 234, comments: 33, category: 'living' },
    { id: 9, image: '/images/about-hero.png', title: 'Elegant Bedroom Suite', author: 'Chris Wang', likes: 198, comments: 18, category: 'bedroom' },
    { id: 10, image: '/images/hero-1.png', title: 'Designer Furniture Focus', author: 'Taylor Brown', likes: 167, comments: 22, category: 'living' },
  ]

  const forumCategories = [
    { 
      name: 'Room Makeovers', 
      count: 456, 
      description: 'Before & after transformations, renovation stories',
      trending: [
        'Small bathroom complete renovation under $3000',
        'From dated to modern: 1970s kitchen transformation',
        'Studio apartment makeover in 30 days'
      ]
    },
    { 
      name: 'Design Help', 
      count: 342, 
      description: 'Get advice on layouts, colors, and styling',
      trending: [
        'Help choosing paint colors for north-facing room',
        'How to make a small room look bigger?',
        'Mixing wood tones - dos and donts'
      ]
    },
    { 
      name: 'DIY Projects', 
      count: 289, 
      description: 'Tutorials, tips, and project showcases',
      trending: [
        'DIY floating shelves step-by-step guide',
        'Upcycling old furniture with chalk paint',
        'Building a custom headboard on budget'
      ]
    },
    { 
      name: 'Shopping & Deals', 
      count: 198, 
      description: 'Product reviews, deals, and shopping guides',
      trending: [
        'Best affordable rugs that look expensive',
        'IKEA hacks for small spaces',
        'Black Friday furniture deals megathread'
      ]
    },
    { 
      name: 'Style Inspiration', 
      count: 267, 
      description: 'Mood boards, trends, and style guides',
      trending: [
        'Japandi style: Complete guide for beginners',
        'Mixing vintage and modern successfully',
        '2024 color trends in interior design'
      ]
    },
    { 
      name: 'Professional Tips', 
      count: 156, 
      description: 'Advice from interior designers and experts',
      trending: [
        'Designer secrets for luxe look on budget',
        'Common design mistakes to avoid',
        'How to create a cohesive color palette'
      ]
    },
  ]

  // Mock data for designers
  const mockDesigners = [
    { id: 1, name: 'Sarah Chen', specialty: 'Minimalist Interiors', rating: 4.9, projects: 47, followers: 2341, location: 'NYC', image: '/images/hero-1.png' },
    { id: 2, name: 'Mike Johnson', specialty: 'Scandinavian Design', rating: 4.8, projects: 32, followers: 1876, location: 'LA', image: '/images/hero-2.jpg' },
    { id: 3, name: 'Emma Wilson', specialty: 'Industrial Modern', rating: 4.7, projects: 28, followers: 1543, location: 'Chicago', image: '/images/quote-image-2.png' },
    { id: 4, name: 'Alex Rivera', specialty: 'Bohemian Chic', rating: 4.9, projects: 35, followers: 2098, location: 'Austin', image: '/images/about-image-1.jpg' },
    { id: 5, name: 'Lisa Park', specialty: 'Luxury Contemporary', rating: 4.8, projects: 41, followers: 2567, location: 'Miami', image: '/images/about-image-2.jpg' },
    { id: 6, name: 'Tom Davis', specialty: 'Vintage Revival', rating: 4.6, projects: 23, followers: 1234, location: 'Seattle', image: '/images/quote-image-1.png' },
  ]

  return (
    <div className="min-h-screen bg-vintage-cream">
      <Header />
      
      <main>
        {/* Hero Section with Background Image */}
        <section className="relative min-h-screen overflow-hidden">
          <Image 
            src="/images/community-hero.jpg" 
            alt="Community Background" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Centered Title */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center text-white max-w-3xl">
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
                className="text-white/90 uppercase tracking-widest font-light mb-16"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '2px'
                }}
              >
                Design Together, Inspire Forever
              </p>

            </div>
          </div>

          {/* Tab Navigation - Vintage Elegant Design */}
          <div className="absolute bottom-20 left-0 right-0 flex justify-center px-8">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-px h-8 bg-white/30"></div>
              </div>
              
              <div className="relative bg-vintage-dark/90 backdrop-blur-md shadow-2xl border border-white/10">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vintage-gold to-transparent"></div>
                
                <div className="flex divide-x divide-white/10">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`relative px-12 py-5 transition-all group ${
                      activeTab === 'all' 
                        ? 'bg-white/10' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span 
                      className={`text-xs font-semibold tracking-[0.2em] transition-colors ${
                        activeTab === 'all' 
                          ? 'text-white' 
                          : 'text-white/80 group-hover:text-white'
                      }`}
                      style={{ fontFamily: 'GT America, sans-serif' }}
                    >
                      ALL
                    </span>
                    {activeTab === 'all' && (
                      <div className="absolute -bottom-px left-0 right-0 h-px bg-vintage-gold"></div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('layouts')}
                    className={`relative px-12 py-5 transition-all group ${
                      activeTab === 'layouts' 
                        ? 'bg-white/10' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span 
                      className={`text-xs font-semibold tracking-[0.2em] transition-colors ${
                        activeTab === 'layouts' 
                          ? 'text-white' 
                          : 'text-white/80 group-hover:text-white'
                      }`}
                      style={{ fontFamily: 'GT America, sans-serif' }}
                    >
                      LAYOUTS
                    </span>
                    {activeTab === 'layouts' && (
                      <div className="absolute -bottom-px left-0 right-0 h-px bg-vintage-gold"></div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('designers')}
                    className={`relative px-12 py-5 transition-all group ${
                      activeTab === 'designers' 
                        ? 'bg-white/10' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span 
                      className={`text-xs font-semibold tracking-[0.2em] transition-colors ${
                        activeTab === 'designers' 
                          ? 'text-white' 
                          : 'text-white/80 group-hover:text-white'
                      }`}
                      style={{ fontFamily: 'GT America, sans-serif' }}
                    >
                      DESIGNERS
                    </span>
                    {activeTab === 'designers' && (
                      <div className="absolute -bottom-px left-0 right-0 h-px bg-vintage-gold"></div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('discuss')}
                    className={`relative px-12 py-5 transition-all group ${
                      activeTab === 'discuss' 
                        ? 'bg-white/10' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span 
                      className={`text-xs font-semibold tracking-[0.2em] transition-colors ${
                        activeTab === 'discuss' 
                          ? 'text-white' 
                          : 'text-white/80 group-hover:text-white'
                      }`}
                      style={{ fontFamily: 'GT America, sans-serif' }}
                    >
                      DISCUSS
                    </span>
                    {activeTab === 'discuss' && (
                      <div className="absolute -bottom-px left-0 right-0 h-px bg-vintage-gold"></div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('create')}
                    className={`relative px-12 py-5 transition-all group ${
                      activeTab === 'create' 
                        ? 'bg-white/10' 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span 
                      className={`text-xs font-semibold tracking-[0.2em] transition-colors ${
                        activeTab === 'create' 
                          ? 'text-white' 
                          : 'text-white/80 group-hover:text-white'
                      }`}
                      style={{ fontFamily: 'GT America, sans-serif' }}
                    >
                      PHILO STUDIO
                    </span>
                    {activeTab === 'create' && (
                      <div className="absolute -bottom-px left-0 right-0 h-px bg-vintage-gold"></div>
                    )}
                  </button>
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 border-l border-t border-white/20 rotate-45"></div>
              </div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 border-r border-t border-white/20 -rotate-45"></div>
              </div>
            </div>
          </div>
        </section>

        {/* All Tab Content - Mixed Trending */}
        {activeTab === 'all' && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-vintage-dark mb-3" style={{ fontFamily: 'GT America, sans-serif' }}>Trending Today</h2>
                <div className="w-16 h-0.5 bg-vintage-gold mx-auto"></div>
              </div>
              {/* Three Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Top Design Pins Column - Pinterest Style */}
                <div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-vintage-dark mb-2" style={{ fontFamily: 'GT America, sans-serif' }}>Top Design Pins</h3>
                    <div className="w-12 h-0.5 bg-vintage-gold"></div>
                  </div>
                  <div className="space-y-3">
                    {mockDesigns.sort((a, b) => b.likes - a.likes).slice(0, 8).map((design, i) => (
                      <div key={design.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group">
                        <div className="relative">
                          <div className="aspect-[3/2] relative overflow-hidden">
                            <Image
                              src={design.image}
                              alt={design.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-1 left-1 bg-vintage-gold text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                              #{i + 1}
                            </div>
                            <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors">
                                <Bookmark size={12} className="text-vintage-gold" />
                              </button>
                            </div>
                          </div>
                          <div className="p-3">
                            <h4 className="font-medium text-xs mb-1 line-clamp-1">{design.title}</h4>
                            <p className="text-xs text-vintage-dark/70 mb-2">by {design.author}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs">
                                <span className="flex items-center gap-1">
                                  <Heart size={10} className="text-vintage-gold" />
                                  {design.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageCircle size={10} className="text-vintage-gold" />
                                  {design.comments}
                                </span>
                              </div>
                              <button className="text-xs text-vintage-gold hover:text-vintage-warm font-medium">
                                Pin
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full text-center text-sm text-vintage-gold hover:text-vintage-warm mt-4">
                    View All Pins →
                  </button>
                </div>

                {/* Hot Discussions Column */}
                <div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-vintage-dark mb-2" style={{ fontFamily: 'GT America, sans-serif' }}>Hot Discussions</h3>
                    <div className="w-12 h-0.5 bg-vintage-gold"></div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { title: 'Color theory basics for beginners', replies: 123, category: 'Guide' },
                      { title: 'DIY vs Professional: Kitchen Reno', replies: 89, category: 'Debate' },
                      { title: 'Best plants for north-facing rooms?', replies: 45, category: 'Tips' },
                      { title: '2024 Design Trends', replies: 34, category: 'Trends' },
                      { title: 'Small apartment hacks', replies: 28, category: 'Tips' },
                    ].map((discussion, i) => (
                      <div key={i} className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-vintage-gold text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">{discussion.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-vintage-warm">
                              <span className="text-vintage-dark/70">{discussion.category}</span>
                              <span className="text-vintage-dark/50">•</span>
                              <span className="text-vintage-dark/70">{discussion.replies} replies</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full text-center text-sm text-vintage-gold hover:text-vintage-warm mt-4">
                    View All Discussions →
                  </button>
                </div>

                {/* Designer Matching Column */}
                <div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-vintage-dark mb-2" style={{ fontFamily: 'GT America, sans-serif' }}>Designer Matching</h3>
                    <div className="w-12 h-0.5 bg-vintage-gold"></div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { type: 'client', name: 'Sarah M.', requirement: 'Modern living room makeover', budget: '$5,000', location: 'NYC' },
                      { type: 'designer', name: 'Alex Chen', specialty: 'Minimalist interiors', rating: 4.9, projects: 47 },
                      { type: 'client', name: 'Mike R.', requirement: 'Small apartment optimization', budget: '$2,500', location: 'LA' },
                      { type: 'designer', name: 'Emma Wilson', specialty: 'Sustainable design', rating: 4.8, projects: 32 },
                      { type: 'client', name: 'Lisa K.', requirement: 'Kitchen renovation ideas', budget: '$8,000', location: 'Miami' },
                    ].map((person, i) => (
                      <div key={i} className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-vintage-gold text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-sm">{person.name}</h4>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                person.type === 'client' 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {person.type === 'client' ? 'Looking for Designer' : 'Available Designer'}
                              </span>
                            </div>
                            {person.type === 'client' ? (
                              <div className="space-y-1">
                                <p className="text-xs text-vintage-dark/70">{person.requirement}</p>
                                <div className="flex items-center gap-3 text-xs">
                                  <span>Budget: {person.budget}</span>
                                  <span>•</span>
                                  <span>{person.location}</span>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <p className="text-xs text-vintage-dark/70">{person.specialty}</p>
                                <div className="flex items-center gap-3 text-xs">
                                  <span>Rating: {person.rating}</span>
                                  <span>•</span>
                                  <span>{person.projects} projects</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full text-center text-sm text-vintage-gold hover:text-vintage-warm mt-4">
                    View All Matches →
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Layouts Tab Content */}
        {activeTab === 'layouts' && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              {/* Room Type Filters */}
              <div className="flex flex-wrap justify-between items-center mb-8">
                <div className="flex gap-2 mb-4 md:mb-0">
                  {['all', 'living', 'bedroom', 'kitchen', 'bathroom', 'office', 'dining'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-white text-vintage-gold border-2 border-vintage-gold shadow-sm'
                          : 'bg-white text-vintage-dark border border-vintage-dark/30 hover:border-vintage-gold hover:text-vintage-gold'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="bg-white text-vintage-dark border border-vintage-dark/30 px-4 py-2 rounded-full hover:border-vintage-gold hover:text-vintage-gold transition-colors flex items-center gap-2">
                    <Search size={16} />
                    Search
                  </button>
                  <button className="bg-white text-vintage-dark border border-vintage-dark/30 px-4 py-2 rounded-full hover:border-vintage-gold hover:text-vintage-gold transition-colors flex items-center gap-2">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>

              {/* Pinterest-style Gallery - Smaller Items */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {mockDesigns.filter(design => selectedCategory === 'all' || design.category === selectedCategory).map((design) => (
                  <div key={design.id} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={design.image}
                        alt={design.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-2 left-2 right-2">
                          <h3 className="text-white font-semibold text-xs mb-0.5 line-clamp-2">{design.title}</h3>
                          <p className="text-white/80 text-xs">by {design.author}</p>
                        </div>
                        <div className="absolute top-2 right-2">
                          <button className="p-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                            <Bookmark size={12} className="text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs">
                          <button className="flex items-center gap-1 text-vintage-dark hover:text-vintage-gold transition-colors">
                            <Heart size={12} />
                            <span>{design.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-vintage-dark hover:text-vintage-gold transition-colors">
                            <MessageCircle size={12} />
                            <span>{design.comments}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="vintage-button">
                  Load More Layouts
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Designers Tab Content */}
        {activeTab === 'designers' && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
              {/* Designer Style Filters */}
              <div className="flex flex-wrap justify-between items-center mb-8">
                <div className="flex gap-2 mb-4 md:mb-0">
                  {['all', 'minimalist', 'scandinavian', 'industrial', 'bohemian', 'luxury', 'vintage'].map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedCategory(style)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === style
                          ? 'bg-white text-vintage-gold border-2 border-vintage-gold shadow-sm'
                          : 'bg-white text-vintage-dark border border-vintage-dark/30 hover:border-vintage-gold hover:text-vintage-gold'
                      }`}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="bg-white text-vintage-dark border border-vintage-dark/30 px-4 py-2 rounded-full hover:border-vintage-gold hover:text-vintage-gold transition-colors flex items-center gap-2">
                    <Search size={16} />
                    Search
                  </button>
                  <button className="bg-white text-vintage-dark border border-vintage-dark/30 px-4 py-2 rounded-full hover:border-vintage-gold hover:text-vintage-gold transition-colors flex items-center gap-2">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>

              {/* Designer Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockDesigners.map((designer) => (
                  <div key={designer.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 relative rounded-full overflow-hidden">
                          <Image
                            src={designer.image}
                            alt={designer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{designer.name}</h3>
                          <p className="text-sm text-vintage-dark/70">{designer.specialty}</p>
                          <p className="text-xs text-vintage-dark/70">{designer.location}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center mb-4">
                        <div>
                          <div className="text-lg font-semibold text-vintage-gold">{designer.rating}</div>
                          <div className="text-xs text-vintage-dark/70">Rating</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-vintage-gold">{designer.projects}</div>
                          <div className="text-xs text-vintage-dark/70">Projects</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-vintage-gold">{designer.followers}</div>
                          <div className="text-xs text-vintage-dark/70">Followers</div>
                        </div>
                      </div>

                      <div className="flex gap-2 mb-4">
                        <button className="flex-1 bg-vintage-gold text-white py-2 px-4 rounded-full hover:bg-vintage-gold/90 transition-colors">
                          Follow
                        </button>
                        <button className="flex-1 border border-vintage-gold text-vintage-gold py-2 px-4 rounded-full hover:bg-vintage-light transition-colors">
                          Message
                        </button>
                      </div>
                    </div>

                    {/* Recent Projects */}
                    <div className="border-t border-vintage-light">
                      <div className="px-6 pt-4 pb-2">
                        <h4 className="text-sm font-semibold mb-3 flex items-center justify-between">
                          Recent Projects
                          <span className="text-xs text-vintage-gold font-normal">View all →</span>
                        </h4>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="aspect-square relative overflow-hidden group cursor-pointer">
                            <Image
                              src={mockDesigns[i].image}
                              alt={`Project ${i}`}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-xs font-medium">View</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <button className="vintage-button">
                  Load More Designers
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Create Tab Content */}
        {activeTab === 'create' && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Design Studio Placeholder */}
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-vintage-light rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Sparkles size={32} className="text-vintage-gold" />
                </div>
                <p className="text-lg text-vintage-dark mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'GT America, sans-serif' }}>
                  Our powerful room designer is coming soon. Create stunning interiors with AI assistance, 
                  real furniture catalogs, and intuitive design tools.
                </p>
                
                {/* Feature Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-vintage-light rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-sm font-semibold text-vintage-gold">AI</span>
                    </div>
                    <h3 className="font-semibold mb-2" style={{ fontFamily: 'GT America, sans-serif' }}>AI Style Assistant</h3>
                    <p className="text-sm text-vintage-dark/70">Get personalized design suggestions</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-vintage-light rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-sm font-semibold text-vintage-gold">SHOP</span>
                    </div>
                    <h3 className="font-semibold mb-2" style={{ fontFamily: 'GT America, sans-serif' }}>Real Products</h3>
                    <p className="text-sm text-vintage-dark/70">Shop furniture while you design</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-vintage-light rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-sm font-semibold text-vintage-gold">3D</span>
                    </div>
                    <h3 className="font-semibold mb-2" style={{ fontFamily: 'GT America, sans-serif' }}>3D Visualization</h3>
                    <p className="text-sm text-vintage-dark/70">Walk through your designs</p>
                  </div>
                </div>

                <button className="vintage-button">
                  Get Notified When It Launches
                </button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <Plus size={32} className="text-vintage-gold mx-auto mb-4" />
                  <h3 className="font-semibold mb-2" style={{ fontFamily: 'GT America, sans-serif' }}>Upload Your Design</h3>
                  <p className="text-sm text-vintage-dark/70">Share your existing room designs</p>
                </div>
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <TrendingUp size={32} className="text-vintage-gold mx-auto mb-4" />
                  <h3 className="font-semibold mb-2" style={{ fontFamily: 'GT America, sans-serif' }}>Join Design Challenge</h3>
                  <p className="text-sm text-vintage-dark/70">Compete in weekly challenges</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Discuss Tab Content */}
        {activeTab === 'discuss' && (
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Column 1: Categories */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-lg p-4 sticky top-4">
                    <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'GT America, sans-serif' }}>Categories</h3>
                    <div className="space-y-2">
                      {forumCategories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => setSelectedForumCategory(category.name)}
                          className={`w-full text-left p-4 rounded-lg transition-all ${
                            selectedForumCategory === category.name
                              ? 'bg-vintage-gold text-white'
                              : 'hover:bg-vintage-light'
                          }`}
                        >
                          <h4 className={`font-medium text-sm mb-1 ${
                            selectedForumCategory === category.name ? 'text-white' : ''
                          }`}>
                            {category.name}
                          </h4>
                          <p className={`text-xs ${
                            selectedForumCategory === category.name ? 'text-white/80' : 'text-vintage-warm'
                          }`}>
                            {category.count} threads
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: Threads in Selected Category */}
                <div className="lg:col-span-6">
                  <div className="bg-white rounded-lg p-6">
                    {/* Header with New Discussion Button */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-semibold text-xl" style={{ fontFamily: 'GT America, sans-serif' }}>
                        {selectedForumCategory}
                      </h3>
                      <button className="bg-vintage-gold text-white px-4 py-2 rounded-full hover:bg-vintage-gold/90 transition-colors flex items-center gap-2">
                        <Plus size={16} />
                        New in {selectedForumCategory}
                      </button>
                    </div>

                    {/* Category Description */}
                    <p className="text-sm text-vintage-warm mb-6">
                      {forumCategories.find(cat => cat.name === selectedForumCategory)?.description}
                    </p>

                    {/* Threads List */}
                    <div className="space-y-4">
                      {/* Mock threads for selected category */}
                      {[
                        { title: forumCategories.find(cat => cat.name === selectedForumCategory)?.trending[0], author: 'Jessica M.', replies: 23, views: 456, lastActivity: '2 hours ago', isPinned: true },
                        { title: forumCategories.find(cat => cat.name === selectedForumCategory)?.trending[1], author: 'Mark T.', replies: 45, views: 892, lastActivity: '4 hours ago', isPinned: false },
                        { title: forumCategories.find(cat => cat.name === selectedForumCategory)?.trending[2], author: 'Sarah L.', replies: 18, views: 234, lastActivity: '6 hours ago', isPinned: false },
                        { title: 'Looking for advice on bedroom layout', author: 'David K.', replies: 34, views: 567, lastActivity: '8 hours ago', isPinned: false },
                        { title: 'Share your favorite design resources', author: 'Amy R.', replies: 12, views: 123, lastActivity: '12 hours ago', isPinned: false },
                        { title: 'Need help choosing between two options', author: 'Chris P.', replies: 27, views: 345, lastActivity: '1 day ago', isPinned: false },
                      ].map((thread, i) => (
                        <div key={i} className="border-b border-vintage-light pb-4 hover:bg-vintage-light/30 -mx-4 px-4 py-2 transition-colors cursor-pointer">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {thread.isPinned && <span className="text-vintage-gold text-xs font-semibold">PINNED</span>}
                                <h4 className="font-medium">{thread.title}</h4>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-vintage-warm">
                                <span>by {thread.author}</span>
                                <span>•</span>
                                <span>{thread.lastActivity}</span>
                                <span>•</span>
                                <span>{thread.views} views</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="flex items-center gap-1">
                                <MessageCircle size={14} className="text-vintage-gold" />
                                {thread.replies}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Load More */}
                    <button className="w-full text-center text-sm text-vintage-gold hover:text-vintage-warm mt-6">
                      Load More Threads →
                    </button>
                  </div>
                </div>

                {/* Column 3: Latest Activity */}
                <div className="lg:col-span-3 space-y-4">
                  {/* Latest Comments */}
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'GT America, sans-serif' }}>Latest Activity</h3>
                    <div className="space-y-3">
                      {[
                        { user: 'Emma W.', action: 'commented on', thread: 'Small bathroom renovation', time: '5 min ago' },
                        { user: 'Alex R.', action: 'posted', thread: 'Need help with lighting', time: '12 min ago' },
                        { user: 'Lisa P.', action: 'replied to', thread: 'Modern vs traditional', time: '25 min ago' },
                        { user: 'Tom D.', action: 'started', thread: 'Color palette advice', time: '1 hour ago' },
                        { user: 'Sarah C.', action: 'commented on', thread: 'DIY headboard ideas', time: '2 hours ago' },
                      ].map((activity, i) => (
                        <div key={i} className="text-sm border-b border-vintage-light pb-3 last:border-0">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 bg-vintage-light rounded-full flex items-center justify-center text-xs font-semibold">
                              {activity.user.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1">
                              <p>
                                <span className="font-medium">{activity.user}</span>
                                <span className="text-vintage-dark/70"> {activity.action} </span>
                                <span className="text-vintage-gold hover:underline cursor-pointer">"{activity.thread}"</span>
                              </p>
                              <p className="text-xs text-vintage-dark/60 mt-1">{activity.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Contributors This Week */}
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4" style={{ fontFamily: 'GT America, sans-serif' }}>Top Contributors</h3>
                    <div className="space-y-3">
                      {['Sarah Chen', 'Mike Johnson', 'Emma Wilson', 'Alex Rivera', 'Lisa Park'].map((name, i) => (
                        <div key={name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-vintage-light rounded-full flex items-center justify-center text-sm font-semibold">
                              {i + 1}
                            </div>
                            <span className="text-sm font-medium">{name}</span>
                          </div>
                          <span className="text-xs text-vintage-dark/70">{234 - i * 30} pts</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Community Stats */}
                  <div className="bg-vintage-light rounded-lg p-4">
                    <h3 className="font-semibold mb-3" style={{ fontFamily: 'GT America, sans-serif' }}>Today's Stats</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>New Threads</span>
                        <span className="font-semibold text-vintage-gold">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comments</span>
                        <span className="font-semibold text-vintage-gold">187</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Users</span>
                        <span className="font-semibold text-vintage-gold">456</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 min-h-[600px] flex items-center">
          <Image 
            src="/images/quote-image-2.png" 
            alt="Join Community Background" 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative max-w-4xl mx-auto text-center w-full">
            <div className="vintage-divider bg-vintage-gold mb-12"></div>
            
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
              style={{ 
                fontFamily: 'GT America, sans-serif',
                letterSpacing: '0.5px'
              }}
            >
              Start Your Design Journey
            </h2>
            
            <p 
              className="text-xl text-white/90 mb-12 max-w-2xl mx-auto"
              style={{ 
                fontFamily: 'GT America, sans-serif',
                lineHeight: '1.6'
              }}
            >
              Join thousands of designers and homeowners creating beautiful spaces together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-vintage-gold text-white px-10 py-4 rounded-none font-semibold hover:bg-vintage-gold/90 transition-colors uppercase tracking-wide"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  fontSize: '14px',
                  letterSpacing: '1px'
                }}
              >
                Join Community
              </button>
              <button 
                className="border-2 border-vintage-gold text-vintage-gold bg-white/10 backdrop-blur-sm px-10 py-4 rounded-none font-semibold hover:bg-white/20 transition-colors uppercase tracking-wide"
                style={{ 
                  fontFamily: 'GT America, sans-serif',
                  fontSize: '14px',
                  letterSpacing: '1px'
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}