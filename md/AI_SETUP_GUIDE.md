# AI Room Designer Setup Guide

This guide will help you set up the AI-powered furniture swapping system for your Philo Homes website.

## Overview

The system consists of three main AI components:

1. **Room Generation**: Creates fully furnished room images from text prompts
2. **Furniture Detection**: Identifies and segments furniture pieces in images  
3. **Furniture Swapping**: Uses AI inpainting to replace furniture pieces

## Architecture

```
User Input → AI Room Generation → Furniture Detection → User Selection → AI Inpainting → Final Result
```

## Required AI Services

### Option 1: OpenAI (Recommended for Simplicity)

**Advantages**: Easy to set up, good quality, handles both generation and vision
**Cost**: ~$0.040 per image generation, ~$0.01 per vision analysis

```bash
npm install openai
```

**Setup**:
1. Get API key from [OpenAI Platform](https://platform.openai.com)
2. Add to `.env.local`: `OPENAI_API_KEY=your_key_here`

**Usage in code**:
- Room Generation: DALL-E 3
- Furniture Detection: GPT-4 Vision
- Furniture Swapping: Custom inpainting (OpenAI discontinued editing)

### Option 2: Stability AI (Best for Advanced Control)

**Advantages**: High quality, specialized for image generation, more control
**Cost**: ~$0.01-0.05 per generation depending on model

```bash
npm install stability-ai-js
```

**Setup**:
1. Get API key from [Stability AI](https://platform.stability.ai)
2. Add to `.env.local`: `STABILITY_API_KEY=your_key_here`

**Usage in code**:
- Room Generation: SDXL
- Furniture Swapping: SDXL Inpainting
- Need separate service for furniture detection

### Option 3: Replicate (Good Balance)

**Advantages**: Access to many models, pay-per-use, good documentation
**Cost**: Varies by model, typically $0.01-0.10 per run

```bash
npm install replicate
```

**Setup**:
1. Get API token from [Replicate](https://replicate.com)
2. Add to `.env.local`: `REPLICATE_API_TOKEN=your_token_here`

## Implementation Steps

### 1. Set Up Room Generation

Replace the mock API in `src/app/api/generate-room/route.ts`:

#### Using OpenAI DALL-E 3:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: prompt,
  n: 1,
  size: "1024x1024",
  quality: "hd",
  style: "natural"
});

const imageUrl = response.data[0].url;
```

#### Using Stability AI:
```typescript
const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
  },
  body: JSON.stringify({
    text_prompts: [{ text: prompt, weight: 1 }],
    cfg_scale: 7,
    height: 768,
    width: 1024,
    steps: 50,
    samples: 1,
  }),
});
```

### 2. Set Up Furniture Detection

Replace the mock API in `src/app/api/detect-furniture/route.ts`:

#### Using OpenAI GPT-4 Vision:
```typescript
const response = await openai.chat.completions.create({
  model: "gpt-4-vision-preview",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Analyze this room image and identify furniture pieces. Return JSON array with: type, bounding box (x,y,width,height), and confidence."
        },
        {
          type: "image_url",
          image_url: { url: imageUrl },
        },
      ],
    },
  ],
});
```

#### Using Custom Object Detection:
Consider using pre-trained models like:
- **YOLOv8** with furniture classes
- **Segment Anything Model (SAM)** for segmentation
- **Roboflow Universe** furniture detection models

### 3. Set Up Furniture Swapping

Replace the mock API in `src/app/api/swap-furniture/route.ts`:

#### Using Stability AI Inpainting:
```typescript
// Generate mask from bounding box
const maskCanvas = createMaskCanvas(region.bounds, imageWidth, imageHeight);

// Call inpainting API
const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/image-to-image/masking', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
  },
  body: formData // image + mask + prompt
});
```

## Advanced Features

### 1. Style Consistency
- Train custom LoRA models for consistent interior styles
- Use ControlNet for better furniture placement
- Implement style transfer for seamless blending

### 2. Perspective Matching
- Use depth estimation models to match furniture perspective
- Implement shadow generation for realistic lighting
- Add reflection effects for glossy surfaces

### 3. Real-time Preview
- Use lightweight models for quick previews
- Implement WebGL shaders for basic transformations
- Cache common furniture variations

## Database Schema

For furniture catalog, consider this Supabase schema:

```sql
-- Furniture items table
CREATE TABLE furniture_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL, -- 'sofa', 'coffee-table', 'lamp', etc.
  style VARCHAR NOT NULL, -- 'modern', 'traditional', etc.
  description TEXT,
  price DECIMAL(10,2),
  image_url VARCHAR,
  model_3d_url VARCHAR, -- Optional 3D model
  ai_prompt TEXT, -- Prompt for AI generation
  created_at TIMESTAMP DEFAULT NOW()
);

-- User designs table
CREATE TABLE user_designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR NOT NULL,
  base_image_url VARCHAR NOT NULL,
  current_image_url VARCHAR NOT NULL,
  furniture_items JSON, -- Array of swapped furniture
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Performance Optimization

1. **Image Caching**: Store generated images in CDN
2. **Progressive Loading**: Show low-res previews first
3. **Background Processing**: Queue heavy AI operations
4. **Model Optimization**: Use quantized models for faster inference

## Cost Estimation

For 1000 users/month generating 5 designs each:
- Room Generation: 5,000 × $0.04 = $200
- Furniture Detection: 5,000 × $0.01 = $50  
- Furniture Swapping: 10,000 × $0.03 = $300
- **Total**: ~$550/month

## Testing

1. Start with mock APIs (already implemented)
2. Test one service at a time
3. Use development quotas initially
4. Monitor API costs and usage

## Deployment

1. Set environment variables in production
2. Configure image storage (S3, Cloudinary, etc.)
3. Set up error monitoring (Sentry, LogRocket)
4. Implement rate limiting for API endpoints

## Next Steps

1. Choose your AI service provider
2. Set up API keys and test basic generation
3. Implement furniture detection
4. Build the inpainting pipeline
5. Add furniture database with real items
6. Test and optimize for your specific use cases

For questions or advanced implementation help, consider consulting with AI/ML specialists or the provider's support teams. 