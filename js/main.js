/**
 * LENSQUE — Main Client Script
 * Motion Addendum: GSAP & ScrollTrigger with strict reduced-motion accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Accessibility Motion Preference Check (Non-negotiable)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. GSAP Motion Implementation
  if (!prefersReducedMotion && typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Page Load — Hero Entrance Timeline (< 1.2s total, power2.out)
    const heroTl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      onComplete: () => {
        // Clear all inline transforms and will-change to avoid GPU memory overhead
        gsap.set(
          ['.hero-meta-label', '.hero-headline', '.hero-description', '.hero-actions', '.hero-telemetry-col'],
          { clearProps: 'all' }
        );
      }
    });

    heroTl
      .from('.hero-meta-label', {
        opacity: 0,
        y: 8,
        duration: 0.3
      })
      .from(
        '.hero-headline',
        {
          opacity: 0,
          y: 16,
          duration: 0.4
        },
        '-=0.2' // Starts 0.1s after tag begins
      )
      .from(
        '.hero-description',
        {
          opacity: 0,
          y: 12,
          duration: 0.3
        },
        '-=0.3' // Starts 0.1s after headline begins
      )
      .from(
        '.hero-actions',
        {
          opacity: 0,
          y: 10,
          duration: 0.3
        },
        '-=0.2' // Starts 0.1s after subtext begins
      )
      .from(
        '.hero-telemetry-col',
        {
          opacity: 0,
          y: 14,
          duration: 0.35
        },
        '-=0.25' // Enters smoothly with actions
      );

    // Scroll-triggered Section Reveals
    if (typeof ScrollTrigger !== 'undefined') {
      // Section header blocks
      document.querySelectorAll('.section-header-block').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: 'power2.out',
          clearProps: 'all'
        });
      });

      // Tool cards: snappy staggered group (0.08s stagger)
      const toolCards = document.querySelectorAll('.tool-card');
      if (toolCards.length > 0) {
        gsap.from(toolCards, {
          scrollTrigger: {
            trigger: '.tools-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 24,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }

      // Privacy cards: snappy staggered group
      const privacyCards = document.querySelectorAll('.privacy-card');
      if (privacyCards.length > 0) {
        gsap.from(privacyCards, {
          scrollTrigger: {
            trigger: '.privacy-strip-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 24,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }

      // About panels: staggered group
      const aboutPanels = document.querySelectorAll('.about-panel');
      if (aboutPanels.length > 0) {
        gsap.from(aboutPanels, {
          scrollTrigger: {
            trigger: '.about-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 24,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }
    }
  }

  // 3. Navigation Active State Observer
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.style.borderColor = 'var(--accent-yellow)';
              link.style.color = 'var(--text-primary)';
            } else {
              link.style.borderColor = 'transparent';
              link.style.color = 'var(--text-secondary)';
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // 4. Tool Card Action Feedback (CSS handles hover, this handles active click)
  const toolButtons = document.querySelectorAll('.tool-action-btn');
  toolButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.tool-card');
      if (card) {
        card.style.transform = 'translate(4px, 4px)';
        card.style.boxShadow = '0px 0px 0px 0px var(--accent-yellow)';
        
        setTimeout(() => {
          card.style.transform = '';
          card.style.boxShadow = '';
        }, 200);
      }
    });
  });

  // 5. Telemetry Timestamp Realtime Update
  const versionItem = document.querySelector('.telemetry-version');
  if (versionItem) {
    const date = new Date();
    const formatted = date.toISOString().split('T')[0].replace(/-/g, '.');
    versionItem.textContent = `BUILD: ${formatted}`;
  }
});
