# 🚀 Quick Start Guide - AI Room Designer

Get your AI Room Designer up and running in 5 minutes!

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- A text editor (VS Code recommended)

## 🎯 Step 1: Get API Keys (Choose One)

### Option A: Replicate (Recommended for Beginners)
**Why Replicate?** Easy setup, pay-per-use, great for testing.

1. **Sign up** at [replicate.com](https://replicate.com)
2. **Get $5 free credit** (enough for 100-500 generations)
3. **Go to Account > API Tokens**: https://replicate.com/account/api-tokens
4. **Copy your token**

### Option B: Hugging Face (Free Tier)
**Why Hugging Face?** Completely free for testing (with rate limits).

1. **Sign up** at [huggingface.co](https://huggingface.co)
2. **Go to Settings > Access Tokens**: https://huggingface.co/settings/tokens
3. **Create new token** with read permissions
4. **Copy your token**

### Option C: OpenAI (Premium Quality)
**Why OpenAI?** Highest quality, best for production.

1. **Sign up** at [platform.openai.com](https://platform.openai.com)
2. **Add payment method** (required for API access)
3. **Go to API Keys**: https://platform.openai.com/account/api-keys
4. **Create new secret key**

## 🔧 Step 2: Set Up Environment Variables

1. **Create `.env.local` file** in your project root:
```bash
touch .env.local
```

2. **Add your API key** (choose the service you signed up for):

```bash
# For Replicate (recommended)
REPLICATE_API_TOKEN=r8_your_token_here

# For Hugging Face (free)
HUGGINGFACE_API_KEY=hf_your_token_here

# For OpenAI (premium)
OPENAI_API_KEY=sk-your_key_here
```

## 🏃‍♂️ Step 3: Run the App

```bash
# Install dependencies (if you haven't already)
npm install

# Start the development server
npm run dev
```

Open http://localhost:3001/design in your browser!

## 🎨 Step 4: Test the AI Features

### Test Room Generation
1. Visit `/design` page
2. Select room type and style
3. Add custom details
4. Click "Generate Room"
5. Wait for AI to create your room (15-30 seconds)

### Test Furniture Detection
1. After generating a room, click "Enable Furniture Swapping"
2. Click "Detect Furniture"
3. Watch as AI identifies furniture pieces
4. Blue dashed boxes will appear around detected items

### Test Furniture Swapping
1. Click on a detected furniture piece
2. Browse the furniture database on the right
3. Click on a new furniture item
4. Watch AI replace the furniture (30-60 seconds)

## 💸 Cost Breakdown

### Replicate (Most Affordable)
- Room Generation: ~$0.02 per image
- Furniture Detection: ~$0.01 per analysis  
- Furniture Swapping: ~$0.03 per swap
- **Total per complete design**: ~$0.06

### Example Usage Costs
- **10 room designs**: ~$0.60
- **100 room designs**: ~$6.00
- **1000 room designs**: ~$60.00

### Hugging Face (Free Tier)
- **Free**: 1000 requests/month
- **Rate Limited**: ~10 requests/minute
- **Perfect for**: Testing and development

## 🛠️ Advanced Setup (Optional)

### Enable Multiple AI Providers
Add multiple API keys to use different services for different tasks:

```bash
# Use Replicate for generation, OpenAI for detection
REPLICATE_API_TOKEN=r8_your_token_here
OPENAI_API_KEY=sk_your_key_here

# Use Hugging Face for free testing
HUGGINGFACE_API_KEY=hf_your_token_here
```

### Add Image Storage
Store generated images in the cloud:

```bash
# AWS S3 (recommended for production)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your_bucket_name

# Cloudinary (easier setup)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Add User Authentication
Enable user accounts and saved designs:

```bash
# Clerk (recommended)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_secret
```

## 🔍 Troubleshooting

### "No API key found" Message
- Check that your `.env.local` file is in the project root
- Verify the API key name matches exactly (case-sensitive)
- Restart the development server after adding keys

### API Errors
- **Rate Limited**: Wait a few minutes and try again
- **Invalid Key**: Double-check your API key
- **Insufficient Credits**: Check your account balance

### Slow Generation
- **Normal**: First generation takes 15-30 seconds
- **Network**: Check your internet connection  
- **Server Load**: AI providers can be slower during peak times

### Demo Mode
If you see demo images instead of AI-generated ones:
- You're probably missing API keys
- Check the browser console for error messages
- Verify your API key is correctly set

## 📊 Monitoring Usage

### Track Your Costs
- **Replicate**: [Dashboard](https://replicate.com/account/billing)
- **OpenAI**: [Usage Dashboard](https://platform.openai.com/account/usage)
- **Hugging Face**: [Account Settings](https://huggingface.co/settings/billing)

### Set Spending Limits
- Most providers allow you to set monthly spending limits
- Start with $10-20 for testing
- Monitor usage in the first few days

## 🎯 Next Steps

1. **Test All Features**: Try different room types and furniture combinations
2. **Customize Furniture Database**: Add your own furniture pieces
3. **Implement User Accounts**: Let users save their designs
4. **Add E-commerce**: Connect to furniture suppliers
5. **Mobile Optimization**: Ensure great mobile experience

## 🆘 Need Help?

- **Check the logs**: Look at browser console and terminal
- **GitHub Issues**: Report bugs or ask questions
- **AI Provider Docs**: Each service has comprehensive documentation
- **Community**: Join developer communities for the AI services you're using

## 🎉 Success! 

You now have a fully functional AI Room Designer that can:
- ✅ Generate furnished rooms from text descriptions
- ✅ Detect furniture pieces in images
- ✅ Swap furniture using AI inpainting
- ✅ Provide a Redecor-style experience

**Happy designing!** 🏠✨ 