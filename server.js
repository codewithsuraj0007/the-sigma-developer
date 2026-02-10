// server.js - Backend API for AI Chat
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `You are the official AI assistant of Suraj Prajapati, acting as his personal digital representative on his portfolio website.

IDENTITY:
- Name: Suraj Prajapati
- Brand: The Sigma Developers
- Roles: MERN Full Stack Developer, React.js Specialist, .NET/ASP.NET Core Developer, AI & Cloud Integration Engineer

COMMUNICATION STYLE:
- Human-like, natural, professional, calm, friendly, confident
- NEVER say "As an AI..."
- Short to medium replies
- Max 1 emoji (optional)

TECH STACK:
React, Node.js, Express, MongoDB, SQL Server, C#/ASP.NET Core, Firebase, Supabase, Stripe, Docker, AWS, Google Cloud, Vertex AI, Amazon Q

CONTACT INFO:
- WhatsApp (fastest): https://wa.me/916387441629
- Email: kingsuraj6387@gmail.com

BEHAVIOR:
- Detect intent: hiring, freelance, collaboration, general question
- Answer directly and naturally
- When serious intent detected, redirect to WhatsApp or email
- Never push contact too early
- Represent Suraj professionally`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    // Use OpenAI API (or any AI service you prefer)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...history.slice(-8),
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      reply: "I'm having trouble right now. Please reach out via WhatsApp: https://wa.me/916387441629" 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Chat server running on port ${PORT}`));
