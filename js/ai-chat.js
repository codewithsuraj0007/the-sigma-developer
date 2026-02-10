// ai-chat.js - Dynamic AI Assistant for Suraj Prajapati
(function () {
  'use strict';

  const elements = {
    toggle: document.getElementById('chatToggle'),
    panel: document.getElementById('chatPanel'),
    close: document.getElementById('chatClose'),
    input: document.getElementById('chatInput'),
    send: document.getElementById('chatSend'),
    messages: document.getElementById('chatMessages')
  };

  if (!elements.toggle || !elements.panel) return;

  let context = { askedAbout: [], intent: null };

  // Knowledge base
  const knowledge = {
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'C#', 'ASP.NET Core', 'Firebase', 'AWS', 'Google Cloud', 'Vertex AI'],
    projects: ['AI Image Generator', 'MERN Full Stack App', 'Real-time Chat Platform', 'Portfolio Website'],
    experience: 'Web Developer at Seek Unique Productions, completed .NET training at Hindtech IT Solutions',
    education: 'Diploma in IT with AI/ML specialization at Government Polytechnic Lucknow',
    location: 'Lucknow, India',
    availability: 'open for opportunities'
  };

  elements.toggle.addEventListener('click', () => {
    const isActive = elements.panel.classList.toggle('active');
    elements.panel.setAttribute('aria-hidden', !isActive);
    if (isActive && elements.messages.children.length === 1) {
      setTimeout(() => addMessage("Hi! I'm Suraj's assistant. What would you like to know?", 'bot'), 300);
    }
  });

  elements.close.addEventListener('click', () => {
    elements.panel.classList.remove('active');
    elements.panel.setAttribute('aria-hidden', 'true');
  });

  function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    const content = document.createElement('div');
    content.className = 'chat-msg-content';
    content.textContent = text;
    msg.appendChild(content);
    elements.messages.appendChild(msg);
    elements.messages.scrollTop = elements.messages.scrollHeight;
  }

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot typing-indicator';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<div class="chat-msg-content"><span></span><span></span><span></span></div>';
    elements.messages.appendChild(typing);
    elements.messages.scrollTop = elements.messages.scrollHeight;
  }

  function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  // Dynamic AI response generator
  function generateResponse(msg) {
    const lower = msg.toLowerCase();
    
    // Detect intent
    if (/\b(hire|hiring|job|position|recruit|opportunity|work|employ)\b/i.test(lower)) {
      context.intent = 'hiring';
      return "Yes, Suraj is open to opportunities! He specializes in MERN stack and .NET development. What kind of role or project are you considering?";
    }
    
    if (/\b(collab|collaborate|project|build|partner|work together|freelance)\b/i.test(lower)) {
      context.intent = 'collaboration';
      return "Suraj loves working on interesting projects! He's built everything from AI tools to full-stack apps. What's your project about?";
    }
    
    if (/\b(contact|reach|email|phone|whatsapp|message|talk)\b/i.test(lower)) {
      return "The fastest way to reach Suraj is WhatsApp: https://wa.me/916387441629\n\nOr email: kingsuraj6387@gmail.com";
    }
    
    if (/\b(skill|tech|stack|technology|know|language|framework)\b/i.test(lower)) {
      context.askedAbout.push('skills');
      return `Suraj works with: ${knowledge.skills.slice(0, 6).join(', ')}, and more. He's particularly strong in React and Node.js. Need details on any specific tech?`;
    }
    
    if (/\b(project|portfolio|built|made|work|example)\b/i.test(lower)) {
      context.askedAbout.push('projects');
      return "Suraj has built some cool stuff:\n• AI Image Generator with React\n• MERN full-stack apps with authentication\n• Real-time chat with Firebase\n\nWant to know more about any of these?";
    }
    
    if (/\b(experience|worked|job|company|training)\b/i.test(lower)) {
      context.askedAbout.push('experience');
      return "Suraj is currently a Web Developer at Seek Unique Productions. He also completed intensive .NET training at Hindtech IT Solutions and industry simulations with Google Cloud, AWS, and JPMorgan.";
    }
    
    if (/\b(education|study|college|diploma|degree|student)\b/i.test(lower)) {
      return "Suraj is completing his Diploma in IT with a focus on AI/ML at Government Polytechnic, Lucknow. He's hands-on with both academics and real-world development.";
    }
    
    if (/\b(react|node|mern|javascript|mongodb)\b/i.test(lower)) {
      return "Yes! MERN is Suraj's core stack. He's built multiple production apps with React frontends, Node/Express backends, and MongoDB. He also knows .NET/C# for enterprise projects.";
    }
    
    if (/\b(ai|artificial intelligence|ml|machine learning|vertex)\b/i.test(lower)) {
      return "Suraj has worked with AI tools like Vertex AI and built an AI Image Generator. He's also studying AI/ML as part of his diploma and completed Google Cloud's GenAI training.";
    }
    
    if (/\b(available|free|busy|when|start)\b/i.test(lower)) {
      return "Suraj is open to discussing new opportunities. For serious inquiries, the best way is to message him directly on WhatsApp: https://wa.me/916387441629";
    }
    
    if (/\b(price|cost|rate|budget|pay|salary)\b/i.test(lower)) {
      return "That's something best discussed directly with Suraj based on the project scope. Want to connect with him? WhatsApp is fastest: https://wa.me/916387441629";
    }
    
    if (/\b(hello|hi|hey|greetings)\b/i.test(lower)) {
      return "Hey! Thanks for stopping by. I can tell you about Suraj's skills, projects, or experience. What interests you?";
    }
    
    if (/\b(thanks|thank you|appreciate)\b/i.test(lower)) {
      return "You're welcome! Feel free to reach out to Suraj directly if you'd like to discuss further. 😊";
    }
    
    // Follow-up based on context
    if (context.intent === 'hiring' || context.intent === 'collaboration') {
      return "That sounds interesting! To move forward, I'd recommend connecting with Suraj directly:\n\nWhatsApp: https://wa.me/916387441629\nEmail: kingsuraj6387@gmail.com\n\nHe typically responds within 24 hours.";
    }
    
    // Default intelligent response
    return "I can help you learn about Suraj's skills, projects, experience, or how to contact him. What would you like to know?";
  }

  async function handleUserMessage(text) {
    addMessage(text, 'user');
    showTyping();
    
    setTimeout(() => {
      hideTyping();
      const reply = generateResponse(text);
      addMessage(reply, 'bot');
    }, 800 + Math.random() * 400);
  }

  document.querySelectorAll('.chat-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const msgKey = btn.getAttribute('data-msg');
      const responses = {
        hiring: "I'm interested in hiring opportunities",
        collab: "I'd like to collaborate on a project",
        general: "I have a general question"
      };
      handleUserMessage(responses[msgKey] || btn.textContent.trim());
    });
  });

  function sendMessage() {
    const text = elements.input.value.trim();
    if (!text) return;
    handleUserMessage(text);
    elements.input.value = '';
  }

  elements.send.addEventListener('click', sendMessage);
  elements.input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });
})();
