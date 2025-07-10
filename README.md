# Philo Homes Website

A modern, responsive marketing website for Philo Homes - the revolutionary 3-sided marketplace connecting interior designers, furniture suppliers, and homeowners through immersive 3D room design.

## 🚀 Overview

This website serves as the primary marketing and web platform for Philo Homes, showcasing the mobile app's capabilities and providing a gateway for users to discover and engage with the platform.

## ✨ Features

### Marketing Pages
- **Hero Section**: Compelling headline with app download CTAs
- **Features Showcase**: Highlighting key platform benefits
- **User Types**: Dedicated sections for Designers, Suppliers, and Homeowners
- **3D Demo Section**: Interactive preview capabilities (placeholder for Babylon.js integration)
- **Call-to-Action**: Download buttons and contact information

### Technical Features
- **Modern Design**: Beautiful gradient backgrounds and animations
- **Responsive**: Mobile-first design with Tailwind CSS
- **Animations**: Smooth scroll animations with Framer Motion
- **Performance**: Fast loading with Next.js 14
- **3D Ready**: Babylon.js dependencies installed for future integration

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **3D Engine**: Babylon.js (ready for integration)
- **Language**: TypeScript

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Components

### Core Components
- `Header.tsx` - Navigation with mobile menu
- `Hero.tsx` - Main landing section
- `Features.tsx` - Platform benefits grid
- `UserTypes.tsx` - Three user type showcase
- `Demo3D.tsx` - 3D capabilities preview
- `CTA.tsx` - Final call-to-action section

### Design System
- **Colors**: Blue and purple gradient theme
- **Typography**: Modern font stack with gradient text effects
- **Spacing**: Consistent 24px section padding
- **Shadows**: Subtle elevation with hover effects

## 🔮 Future Enhancements

### Phase 1 - 3D Integration
- [ ] Integrate actual Babylon.js 3D room designer
- [ ] Add furniture model loading from mobile app assets
- [ ] Implement interactive 3D demo

### Phase 2 - Web App Features
- [ ] User authentication system
- [ ] Basic room designer for web
- [ ] Furniture catalog browsing
- [ ] Shopping cart functionality

### Phase 3 - Advanced Features
- [ ] Real-time collaboration tools
- [ ] Advanced user dashboards
- [ ] Payment processing
- [ ] Analytics integration

## 🚀 Deployment

The website is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Traditional hosting**

### Environment Variables
Create a `.env.local` file for:
```
NEXT_PUBLIC_APP_DOWNLOAD_URL=your-app-store-url
NEXT_PUBLIC_CONTACT_EMAIL=contact@philohomes.com
```

## 📱 Mobile App Integration

This website complements the React Native mobile app by:
- Driving app downloads through strategic CTAs
- Providing web-based previews of mobile features
- Serving as a landing page for marketing campaigns
- Offering web-based tools for users who prefer desktop

## 🎯 SEO & Performance

- **Meta Tags**: Properly configured for social sharing
- **Performance**: Optimized images and lazy loading
- **Mobile First**: Responsive design for all devices
- **Analytics Ready**: Google Analytics integration ready

## 📞 Support & Contact

For questions about the website development:
- Email: contact@philohomes.com
- Project Repository: [Mobile App](../README.md)

---

Built with ❤️ using Next.js, Tailwind CSS, and modern web technologies.
