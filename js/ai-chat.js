(function () {
  'use strict';

  const elements = {
    widget: document.getElementById('chatWidget'),
    toggle: document.getElementById('chatToggle'),
    panel: document.getElementById('chatPanel'),
    close: document.getElementById('chatClose'),
    input: document.getElementById('chatInput'),
    send: document.getElementById('chatSend'),
    messages: document.getElementById('chatMessages')
  };

  if (!elements.toggle || !elements.panel || !elements.input || !elements.send || !elements.messages) {
    return;
  }

  const context = {
    askedAbout: new Set(),
    intent: null
  };

  function setPanelState(open) {
    elements.panel.classList.toggle('active', open);
    elements.panel.setAttribute('aria-hidden', String(!open));
    if (elements.widget) {
      elements.widget.classList.toggle('chat-open', open);
    }
    if (open) {
      elements.input.focus();
    }
  }

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

  function generateResponse(input) {
    const msg = input.toLowerCase();

    if (/\b(hire|hiring|job|position|opportunity|recruit)\b/.test(msg)) {
      context.intent = 'hiring';
      context.askedAbout.add('hiring');
      return 'Great. Suraj is open to opportunities as a MERN full stack developer and AI integration engineer. Share your role details, and connect directly at kingsuraj6387@gmail.com.';
    }

    if (/\b(collab|collaborate|partner|freelance|project)\b/.test(msg)) {
      context.intent = 'collaboration';
      context.askedAbout.add('collaboration');
      return 'Sounds good. Suraj is open to collaboration on web apps and AI features. Please send scope and timeline to kingsuraj6387@gmail.com.';
    }

    if (/\b(contact|email|phone|whatsapp|reach|connect)\b/.test(msg)) {
      return 'Best contact options: WhatsApp https://wa.me/916387441629, Email kingsuraj6387@gmail.com, LinkedIn linkedin.com/in/suraj-prajapati-0904b92b9. Typical response time is within 24 hours.';
    }

    if (/\b(skill|stack|technology|tech|framework|tools?)\b/.test(msg)) {
      context.askedAbout.add('skills');
      return 'Tech stack: React.js, JavaScript, Node.js, Express, MongoDB, ASP.NET Core, C#, Firebase, AWS, Google Cloud, Supabase, Docker, Git, and API integration.';
    }

    if (/\b(project|portfolio|built|work sample|demo)\b/.test(msg)) {
      context.askedAbout.add('projects');
      return 'Featured work includes AI Image Generator, MERN applications, real-time chat projects, and this portfolio. Open project cards on the page for live demos and details.';
    }

    if (/\b(experience|background|worked|company|training)\b/.test(msg)) {
      context.askedAbout.add('experience');
      return 'Suraj has worked as a web developer and completed full-stack .NET training. He builds production-focused apps with performance and reliability in mind.';
    }

    if (/\b(education|college|diploma|degree|student)\b/.test(msg)) {
      return 'Suraj is pursuing a Diploma in Information Technology with AI/ML specialization at Government Polytechnic, Lucknow.';
    }

    if (/\b(price|cost|rate|budget|salary|compensation)\b/.test(msg)) {
      return 'Pricing depends on scope, timeline, and deliverables. Share your requirements directly at kingsuraj6387@gmail.com for an accurate quote.';
    }

    if (/\b(hello|hi|hey)\b/.test(msg)) {
      return 'Hi. I can help with Suraj\'s skills, projects, experience, and contact details. What do you want to know?';
    }

    if (/\b(thanks|thank you)\b/.test(msg)) {
      return 'You are welcome. If you want to continue, share your requirement and I will guide you to the right contact path.';
    }

    if (context.intent === 'hiring' || context.intent === 'collaboration') {
      return 'To move forward quickly, message Suraj on WhatsApp https://wa.me/916387441629 or email kingsuraj6387@gmail.com with your project or role details.';
    }

    return 'I can help with skills, projects, experience, and contact options. Tell me what you need and I will answer directly.';
  }

  function handleUserMessage(text) {
    addMessage(text, 'user');
    showTyping();

    window.setTimeout(function () {
      hideTyping();
      addMessage(generateResponse(text), 'bot');
    }, 700);
  }

  function sendMessage() {
    const text = elements.input.value.trim();
    if (!text) return;

    handleUserMessage(text);
    elements.input.value = '';
  }

  elements.toggle.addEventListener('click', function () {
    const shouldOpen = !elements.panel.classList.contains('active');
    setPanelState(shouldOpen);
  });

  if (elements.close) {
    elements.close.addEventListener('click', function () {
      setPanelState(false);
    });
  }

  document.querySelectorAll('.chat-quick-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const msgKey = btn.getAttribute('data-msg');
      const quickMap = {
        hiring: 'I am interested in hiring opportunities',
        collab: 'I want to collaborate on a project',
        general: 'I have a general question'
      };

      handleUserMessage(quickMap[msgKey] || btn.textContent.trim());
    });
  });

  elements.send.addEventListener('click', sendMessage);
  elements.input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  });
})();
