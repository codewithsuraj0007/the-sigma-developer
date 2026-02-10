// animations.js
/* ==========================================
   ANIMATIONS.JS - IntersectionObserver & Scroll
   ========================================== */

(function () {
  'use strict';

  // Scroll reveal using IntersectionObserver
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars when visible
        var fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(function (fill) {
          var width = fill.getAttribute('data-width');
          if (width) {
            fill.style.setProperty('--fill-width', width + '%');
            fill.classList.add('animated');
            fill.style.width = width + '%';
          }
        });

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  // Observe all animate-on-scroll elements
  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    observer.observe(el);
  });

  // Navbar show/hide on scroll
  var navbar = document.getElementById('navbar');
  var lastScrollY = 0;
  var ticking = false;

  function updateNavbar() {
    var currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
    } else {
      navbar.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  // Hero card 3D tilt effect
  var heroCard = document.getElementById('heroCard');
  if (heroCard) {
    heroCard.addEventListener('mousemove', function (e) {
      var rect = heroCard.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      heroCard.style.transform = 'perspective(800px) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg)';
    });

    heroCard.addEventListener('mouseleave', function () {
      heroCard.style.transform = 'perspective(800px) rotateY(0) rotateX(0)';
    });
  }
})();
