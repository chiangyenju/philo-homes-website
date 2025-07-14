# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack (fast refresh enabled)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

### Common Development Tasks
- Install dependencies: `npm install`
- Type checking: TypeScript runs automatically during build
- No test runner is currently configured

## Architecture Overview

This is a Next.js 15 website for Philo Homes, a real estate company, with plans for an AI-powered room designer feature.

### Tech Stack
- **Framework**: Next.js 15.3.5 with App Router and TypeScript
- **Styling**: Tailwind CSS 4 with custom design system (vintage/elegant theme)
- **UI**: Framer Motion (animations), Headless UI (accessible components), Lucide React (icons)
- **3D Graphics**: Three.js, React Three Fiber, Drei, Babylon.js
- **AI Services**: Configured for Replicate, Hugging Face, and Google Gemini
- **Authentication**: Clerk
- **Database**: Supabase

### Code Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout with GT America and Henry Trial fonts
│   ├── page.tsx      # Homepage
│   └── globals.css   # Global styles with custom color palette
└── components/       # React components (Header, Footer, Hero)
```

### Design System
The project uses a sophisticated vintage-inspired design system:
- **Fonts**: GT America (headings), Henry Trial (accent), Inter (body)
- **Colors**: Muted vintage palette (buff, sage, terracotta, gray tones)
- **Styling**: Custom Tailwind utilities for gradients, shadows, and vintage effects

### AI Room Designer (Planned)
The documentation describes an AI room designer feature that is not yet implemented. When building this:
- Use the configured AI services (Replicate, Hugging Face, or Gemini)
- Reference images in `references-for-ai/` directory
- Leverage Fabric.js for 2D canvas interactions
- Consider Three.js/Babylon.js for 3D visualizations

### Environment Variables
Required API keys are already configured in `.env.local`:
- `GEMINI_API_KEY`
- `REPLICATE_API_TOKEN`
- `HUGGINGFACE_API_KEY`

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Target: ES2017
- Module resolution: bundler