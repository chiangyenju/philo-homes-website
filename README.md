# Philo Homes Website

A modern, elegant website for Philo Homes featuring an AI-powered room designer that allows users to generate furnished rooms and swap furniture pieces using generative AI.

## Features

### 🏠 Core Website
- **Modern Design**: Clean, sophisticated interface with premium aesthetics
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Navigation**: Smooth animations and user-friendly navigation
- **About & Community Pages**: Information about Philo Homes and community engagement

### 🎨 AI Room Designer (NEW)
- **AI Room Generation**: Create fully furnished rooms from text prompts
- **Furniture Detection**: AI-powered identification of furniture pieces in images
- **Smart Furniture Swapping**: Replace furniture using advanced AI inpainting
- **Interactive Canvas**: Click and select furniture pieces to customize
- **Real-time Preview**: See changes instantly with smooth animations
- **Download Designs**: Save your custom room designs

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Canvas**: Fabric.js for interactive furniture selection
- **AI Integration**: Ready for OpenAI, Stability AI, or custom models
- **Database**: Supabase (configured)
- **Authentication**: Clerk (configured)

## AI Room Designer Architecture

The AI Room Designer uses a three-stage pipeline:

```
1. Text Prompt → AI Image Generation → Furnished Room
2. Room Image → Computer Vision → Furniture Detection
3. User Selection + New Furniture → AI Inpainting → Updated Room
```

### Supported AI Services
- **OpenAI**: DALL-E 3 for generation, GPT-4 Vision for detection
- **Stability AI**: SDXL for generation and inpainting
- **Replicate**: Access to various open-source models
- **Custom Models**: YOLO, SAM, and other computer vision models

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd philo-homes-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys for the AI services you want to use:
   - `OPENAI_API_KEY` - For OpenAI services
   - `STABILITY_API_KEY` - For Stability AI
   - `REPLICATE_API_TOKEN` - For Replicate
   - Additional keys as needed

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## AI Setup

The AI Room Designer is currently set up with mock APIs for development. To enable full AI functionality:

1. **Read the Setup Guide**: Check `AI_SETUP_GUIDE.md` for detailed instructions
2. **Choose AI Provider**: Select from OpenAI, Stability AI, or Replicate
3. **Configure APIs**: Replace mock implementations with real AI service calls
4. **Test Features**: Start with room generation, then add detection and swapping

### Development vs Production

- **Development**: Uses mock APIs and placeholder images for testing
- **Production**: Requires real AI service integrations and API keys

## Project Structure

```
src/
├── app/
│   ├── design/           # AI Room Designer page
│   ├── api/              # API routes for AI functionality
│   │   ├── generate-room/    # Room generation endpoint
│   │   ├── detect-furniture/ # Furniture detection endpoint
│   │   └── swap-furniture/   # Furniture swapping endpoint
│   ├── about/            # About page
│   ├── community/        # Community page
│   └── page.tsx          # Home page
├── components/
│   ├── RoomGenerator.tsx     # AI room generation component
│   ├── FurnitureSwapper.tsx  # Interactive furniture swapping
│   ├── FurnitureDatabase.tsx # Furniture catalog component
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Footer component
│   └── Hero.tsx              # Homepage hero section
└── globals.css           # Global styles and Tailwind config
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features Explained

### AI Room Generation
- Users select room type (living room, bedroom, etc.)
- Choose interior style (modern, traditional, etc.)
- Add custom details via text prompt
- AI generates a fully furnished room image

### Furniture Detection
- Computer vision analyzes the generated room
- Identifies individual furniture pieces
- Creates interactive selection areas
- Provides confidence scores for each detection

### Furniture Swapping
- Users click on detected furniture pieces
- Browse furniture database with filters
- Select replacement furniture
- AI inpainting seamlessly replaces the item
- Maintains lighting, shadows, and perspective

## Customization

### Adding New Furniture
1. Add items to the furniture database in `FurnitureDatabase.tsx`
2. Include high-quality reference images
3. Add descriptive AI prompts for each piece
4. Configure pricing and metadata

### Styling Changes
- Modify Tailwind classes in components
- Update global styles in `globals.css`
- Customize animations in Framer Motion components

### AI Model Configuration
- Adjust generation parameters in API routes
- Modify prompts for better results
- Configure detection thresholds
- Optimize for your specific use cases

## Cost Considerations

AI usage costs vary by provider and usage:
- Room Generation: ~$0.01-0.04 per image
- Furniture Detection: ~$0.01 per analysis
- Furniture Swapping: ~$0.02-0.05 per swap

For 1000 monthly users with 5 designs each:
- **Estimated monthly cost**: $300-600
- **Cost per user**: $0.30-0.60

## Performance Optimization

- **Image Caching**: Generated images are cached for reuse
- **Progressive Loading**: Low-resolution previews load first
- **Background Processing**: Heavy AI operations run asynchronously
- **Optimized Prompts**: Carefully crafted for faster, better results

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues with the AI Room Designer:
1. Check the `AI_SETUP_GUIDE.md` for common solutions
2. Review API provider documentation
3. Open an issue with detailed error information

For general website issues:
- Open an issue on GitHub
- Include steps to reproduce
- Provide browser and device information
