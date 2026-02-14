// main.js
(function () {
  'use strict';

  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    if (loader) {
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 600);
    }
  });

  var navToggle = document.getElementById('navToggle');
  var navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    });

    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  var projectData = {
    'ai-image': {
      title: 'AI Image Generator',
      problem: 'Creating unique, high-quality images from text descriptions is time-consuming for designers and content creators who need rapid visual prototyping.',
      solution: 'Built an AI-powered image generation platform that converts text prompts into creative visual outputs using modern AI APIs, with real-time preview and download capability.',
      tech: ['React.js', 'AI API Integration', 'CSS3', 'JavaScript', 'REST APIs'],
      features: [
        'Text-to-image generation with customizable prompts',
        'Real-time preview and one-click image download',
        'Responsive UI with modern glassmorphism design',
        'Robust API integration with error handling and loading states',
        'Prompt history and favorites management'
      ],
      github: '#',
      demo: '#'
    },
    'portfolio': {
      title: 'Developer Portfolio Website',
      problem: 'Most developer portfolios look generic and fail to showcase skills in a memorable, professional way that stands out to recruiters and clients.',
      solution: 'Designed a premium, animated portfolio with glassmorphism UI, advanced motion design, SEO optimization, and interactive case study presentations.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Firebase Hosting', 'SEO'],
      features: [
        'Advanced glassmorphism design system with gradient glow effects',
        'Scroll-driven animations using IntersectionObserver',
        '3D tilt effects and cursor-aware interactions',
        'SEO-optimized with semantic HTML and structured data',
        'Fully responsive across all devices with 95+ Lighthouse score'
      ],
      github: '#',
      demo: '#'
    },
    'fullstack': {
      title: 'MERN Full Stack Application',
      problem: 'Businesses need scalable web applications with robust backend architecture, secure authentication, and modern responsive frontends.',
      solution: 'Developed an enterprise-grade application using the MERN stack with JWT authentication, RESTful APIs, and a React frontend with clean architecture.',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
      features: [
        'RESTful API with Express.js and proper route organization',
        'MongoDB with Mongoose ODM for data modeling',
        'JWT-based authentication and role-based authorization',
        'React.js frontend with state management and routing',
        'Input validation, error handling, and security best practices'
      ],
      github: '#',
      demo: '#'
    },
    'firebase-chat': {
      title: 'Real-time Chat Platform',
      problem: 'Teams and communities need instant, reliable messaging solutions that work seamlessly across devices without complex infrastructure setup.',
      solution: 'Created a real-time chat platform powered by Firebase Firestore with live message syncing, user presence, and cloud functions for backend logic.',
      tech: ['React.js', 'Firebase', 'Firestore', 'Cloud Functions', 'Auth'],
      features: [
        'Real-time message delivery with Firestore listeners',
        'Firebase Authentication for secure user management',
        'Cloud Functions for server-side message processing',
        'Online/offline presence indicators',
        'Responsive design optimized for mobile and desktop'
      ],
      github: '#',
      demo: '#'
    }
  };

  var projectModal = document.getElementById('projectModal');
  var modalTitle = document.getElementById('modalTitle');
  var modalProblem = document.getElementById('modalProblem');
  var modalSolution = document.getElementById('modalSolution');
  var modalTech = document.getElementById('modalTech');
  var modalFeatures = document.getElementById('modalFeatures');
  var modalGithub = document.getElementById('modalGithub');
  var modalDemo = document.getElementById('modalDemo');

  function openProjectModal(projectKey) {
    var data = projectData[projectKey];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;

    modalTech.innerHTML = '';
    data.tech.forEach(function (t) {
      var span = document.createElement('span');
      span.className = 'tag';
      span.textContent = t;
      modalTech.appendChild(span);
    });

    modalFeatures.innerHTML = '';
    data.features.forEach(function (f) {
      var li = document.createElement('li');
      li.textContent = f;
      modalFeatures.appendChild(li);
    });

    modalGithub.href = data.github;
    modalDemo.href = data.demo;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var key = card.getAttribute('data-project');
      openProjectModal(key);
    });
  });

  // Project filter
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.project-card').forEach(function (card) {
        var category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.indexOf(filter) !== -1) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Certificate Modal
  var certModal = document.getElementById('certModal');
  var certImage = document.getElementById('certImage');

  var certImages = {
    'aws': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/Screenshot-2026-02-05-230223-1770382967828.png?width=8000&height=8000&resize=contain',
    'google': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/Screenshot-2026-02-05-225646-1770382967233.png?width=8000&height=8000&resize=contain',
    'deloitte': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/Screenshot-2026-02-05-225847-1770382967489.png?width=8000&height=8000&resize=contain',
    'tata': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/Screenshot-2026-02-05-225739-1770382968055.png?width=8000&height=8000&resize=contain',
    'jpmorgan': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/Screenshot-2026-02-05-225847-1770382967489.png?width=8000&height=8000&resize=contain',
    'hindtech': 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/Screenshot-2026-02-05-232207-1770382967316.png?width=8000&height=8000&resize=contain'
  };

  document.querySelectorAll('.cert-view-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var certKey = btn.getAttribute('data-cert');
      var imgUrl = certImages[certKey];
      if (imgUrl && certModal && certImage) {
        certImage.src = imgUrl;
        certImage.alt = btn.closest('.cert-card').querySelector('h3').textContent + ' Certificate';
        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(function (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.modal-close, .modal-overlay').forEach(function (el) {
    el.addEventListener('click', closeAllModals);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllModals();
  });

  // Button ripple effect
  document.querySelectorAll('.btn-ripple').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', function () {
        ripple.remove();
      });
    });
  });

  // Cursor glow
  var cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    var glowActive = false;
    document.addEventListener('mousemove', function (e) {
      if (!glowActive) {
        cursorGlow.classList.add('active');
        glowActive = true;
      }
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', function () {
      cursorGlow.classList.remove('active');
      glowActive = false;
    });
  }

  // OS Module cursor-aware glow
  document.querySelectorAll('.os-module').forEach(function (module) {
    module.addEventListener('mousemove', function (e) {
      var rect = module.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      module.style.setProperty('--mouse-x', x + '%');
      module.style.setProperty('--mouse-y', y + '%');
    });
  });

  // Magnetic button effect
  document.querySelectorAll('.btn-magnetic, .btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      var distance = Math.sqrt(x * x + y * y);
      var maxDistance = 50;
      
      if (distance < maxDistance) {
        var strength = (maxDistance - distance) / maxDistance;
        var moveX = x * strength * 0.3;
        var moveY = y * strength * 0.3;
        btn.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
      }
    });
    
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

})();
