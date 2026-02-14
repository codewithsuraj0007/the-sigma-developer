# Performance Optimization Guide

## 🎯 Target: 60 FPS & 95+ Lighthouse Score

This document outlines all performance optimizations implemented in the portfolio.

## 🚀 Animation Performance

### GPU Acceleration

**Only animate these properties:**
- `transform` (translate, scale, rotate)
- `opacity`

**Never animate:**
- `width`, `height` (causes reflow)
- `top`, `left`, `right`, `bottom` (causes reflow)
- `margin`, `padding` (causes reflow)
- `color`, `background-color` (causes repaint)

### Implementation

```css
/* ✅ GOOD - GPU accelerated */
.element {
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.3s, opacity 0.3s;
}

/* ❌ BAD - Causes reflow */
.element {
  top: 20px;
  width: 100px;
  transition: top 0.3s, width 0.3s;
}
```

### Will-Change Property

Use sparingly for elements that will definitely animate:

```css
.hero-image-card {
  will-change: transform;
}

/* Remove after animation */
.hero-image-card.animated {
  will-change: auto;
}
```

### Transform: translateZ(0)

Force GPU layer creation:

```css
.gpu-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

## 📊 Scroll Performance

### IntersectionObserver

Replace scroll event listeners with IntersectionObserver:

```javascript
// ✅ GOOD - Efficient
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// ❌ BAD - Expensive
window.addEventListener('scroll', () => {
  elements.forEach(el => {
    if (isInViewport(el)) {
      el.classList.add('visible');
    }
  });
});
```

### Debounced Scroll

When scroll listeners are necessary:

```javascript
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateNavbar();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
```

## 🖼️ Image Optimization

### Lazy Loading

```html
<img 
  src="image.jpg" 
  alt="Description"
  loading="lazy"
  width="800"
  height="600"
>
```

### Responsive Images

```html
<img 
  srcset="
    image-320.jpg 320w,
    image-640.jpg 640w,
    image-1280.jpg 1280w
  "
  sizes="(max-width: 600px) 320px, (max-width: 900px) 640px, 1280px"
  src="image-640.jpg"
  alt="Description"
>
```

### Image Formats

- Use WebP with JPEG fallback
- Compress images (TinyPNG, ImageOptim)
- Target: < 200KB per image

## 📦 Resource Loading

### Critical CSS

Inline critical CSS in `<head>`:

```html
<style>
  /* Critical above-the-fold styles */
  body { margin: 0; background: #0a0a0f; }
  .hero { min-height: 100vh; }
</style>
```

### Defer Non-Critical JS

```html
<script src="animations.js" defer></script>
<script src="main.js" defer></script>
```

### Preconnect to External Resources

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

## 🎨 CSS Optimization

### Avoid Expensive Properties

**Expensive (avoid):**
- `box-shadow` with large blur radius
- `filter: blur()` on large elements
- `backdrop-filter` on many elements

**Optimized approach:**

```css
/* Limit blur radius */
.glass-card {
  backdrop-filter: blur(12px); /* Not 50px */
}

/* Use on container, not children */
.section {
  backdrop-filter: blur(10px);
}
.section .card {
  /* No backdrop-filter here */
}
```

### CSS Containment

```css
.card {
  contain: layout style paint;
}
```

### Reduce Selector Complexity

```css
/* ✅ GOOD */
.nav-link { }

/* ❌ BAD */
header nav ul li a.nav-link { }
```

## 🔧 JavaScript Optimization

### Event Delegation

```javascript
// ✅ GOOD - One listener
document.querySelector('.projects-grid').addEventListener('click', (e) => {
  if (e.target.closest('.project-card')) {
    openModal(e.target.closest('.project-card'));
  }
});

// ❌ BAD - Multiple listeners
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});
```

### Avoid Layout Thrashing

```javascript
// ❌ BAD - Forces reflow multiple times
elements.forEach(el => {
  const height = el.offsetHeight; // Read
  el.style.height = height + 10 + 'px'; // Write
});

// ✅ GOOD - Batch reads, then writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});
```

### Use DocumentFragment

```javascript
// ✅ GOOD
const fragment = document.createDocumentFragment();
items.forEach(item => {
  const el = document.createElement('div');
  el.textContent = item;
  fragment.appendChild(el);
});
container.appendChild(fragment);

// ❌ BAD
items.forEach(item => {
  const el = document.createElement('div');
  el.textContent = item;
  container.appendChild(el); // Reflow each time
});
```

## 📱 Mobile Performance

### Touch Events

```javascript
// Use passive listeners
element.addEventListener('touchstart', handler, { passive: true });
element.addEventListener('touchmove', handler, { passive: true });
```

### Reduce Animations on Mobile

```css
@media (max-width: 600px) {
  .complex-animation {
    animation: none;
  }
}
```

### Respect Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🔍 Monitoring Performance

### Chrome DevTools

1. **Performance Tab**
   - Record page load
   - Check for long tasks (> 50ms)
   - Identify layout thrashing

2. **Lighthouse**
   - Run audit
   - Target: 95+ score
   - Fix flagged issues

3. **Coverage Tab**
   - Identify unused CSS/JS
   - Remove or lazy load

### Performance Metrics

**Target Metrics:**
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.8s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms

### Real User Monitoring

```javascript
// Measure FCP
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('FCP:', entry.startTime);
  }
});
perfObserver.observe({ entryTypes: ['paint'] });
```

## 🎯 Optimization Checklist

### HTML
- [ ] Semantic markup
- [ ] Minified HTML
- [ ] No inline styles (except critical CSS)
- [ ] Lazy load images
- [ ] Proper image dimensions

### CSS
- [ ] Minified CSS
- [ ] Remove unused styles
- [ ] Avoid expensive properties
- [ ] Use CSS containment
- [ ] GPU-accelerated animations only

### JavaScript
- [ ] Minified JS
- [ ] Defer non-critical scripts
- [ ] Use event delegation
- [ ] Debounce/throttle events
- [ ] Avoid layout thrashing

### Images
- [ ] Compressed (< 200KB each)
- [ ] WebP format with fallback
- [ ] Lazy loading enabled
- [ ] Responsive images
- [ ] Proper alt text

### Fonts
- [ ] Preconnect to font CDN
- [ ] Font-display: swap
- [ ] Limit font weights
- [ ] Subset fonts if possible

### Network
- [ ] Enable compression (gzip/brotli)
- [ ] Use CDN for assets
- [ ] HTTP/2 enabled
- [ ] Cache static assets
- [ ] Minimize redirects

## 🚀 Advanced Optimizations

### Code Splitting

For larger projects:

```javascript
// Lazy load modules
const module = await import('./heavy-module.js');
```

### Service Worker

Cache assets for offline access:

```javascript
// sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/css/base.css',
        '/js/main.js'
      ]);
    })
  );
});
```

### Resource Hints

```html
<link rel="preload" href="hero-image.jpg" as="image">
<link rel="prefetch" href="next-page.html">
<link rel="dns-prefetch" href="https://api.example.com">
```

## 📊 Performance Budget

Set limits to maintain performance:

- **Total page weight**: < 2MB
- **JavaScript**: < 300KB
- **CSS**: < 100KB
- **Images**: < 1.5MB total
- **Fonts**: < 100KB
- **Time to Interactive**: < 3.5s

## 🔧 Tools

- **Lighthouse** - Overall performance audit
- **WebPageTest** - Detailed performance analysis
- **Chrome DevTools** - Real-time debugging
- **Bundle Analyzer** - Identify large dependencies
- **ImageOptim** - Image compression
- **PurgeCSS** - Remove unused CSS

---

**Remember**: Performance is a feature, not an afterthought.

Every millisecond counts in user experience and SEO rankings.
