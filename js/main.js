/**
 * LENSQUE — Main Client Script
 * Vanilla JavaScript // Zero external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Navigation Active State Observer
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

  // 2. Tool Card Action Feedback (Since tool pages are built in subsequent steps)
  const toolButtons = document.querySelectorAll('.tool-action-btn');
  toolButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = btn.closest('.tool-card');
      if (card) {
        // Visual press confirmation
        card.style.transform = 'translate(4px, 4px)';
        card.style.boxShadow = '0px 0px 0px 0px var(--accent-yellow)';
        
        setTimeout(() => {
          card.style.transform = '';
          card.style.boxShadow = '';
        }, 200);
      }
    });
  });

  // 3. Telemetry Timestamp Realtime Update (Factual, dry)
  const versionItem = document.querySelector('.telemetry-version');
  if (versionItem) {
    const date = new Date();
    const formatted = date.toISOString().split('T')[0].replace(/-/g, '.');
    versionItem.textContent = `BUILD: ${formatted}`;
  }
});
