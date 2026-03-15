# AI Chatbot Setup Guide

## Overview
Your portfolio now has an intelligent AI assistant that represents you professionally and helps visitors with inquiries.

## Features
- Natural, human-like conversations
- Intent detection (hiring, collaboration, general questions)
- Automatic contact redirection for serious inquiries
- Typing indicators and smooth UX
- Conversation history context

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key

### 3. Configure Environment
```bash
# Copy the example file
copy .env.example .env

# Edit .env and add your API key
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3000
```

### 4. Run the Server
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

### 5. Update Frontend API Endpoint
In `js/ai-chat.js`, update the API endpoint:
```javascript
const API_ENDPOINT = 'http://localhost:3000/api/chat'; // Local development
// or
const API_ENDPOINT = 'https://your-backend-url.com/api/chat'; // Production
```

## Deployment Options

### Option 1: Deploy Backend to Render/Railway/Heroku
1. Push your code to GitHub
2. Connect to Render/Railway/Heroku
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy
5. Update `API_ENDPOINT` in frontend

### Option 2: Use Firebase Functions
Convert `server.js` to Firebase Cloud Function

### Option 3: Use Netlify Functions
Convert to serverless function in `netlify/functions/`

## Alternative: Use Client-Side Only (Not Recommended)
If you want to avoid backend setup, you can call OpenAI directly from the frontend, but this exposes your API key. Only do this for testing.

## Customization
Edit the `SYSTEM_PROMPT` in `server.js` to adjust the AI's personality and behavior.

## Cost
OpenAI API costs approximately:
- GPT-3.5-turbo: ~$0.002 per conversation
- Very affordable for portfolio usage

## Support
For issues, check:
- OpenAI API status
- Server logs
- Browser console errors
