(function(){
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const yearEl = document.getElementById('year');
  const contactForm = document.getElementById('contact-form');
  const contactEmailLink = document.getElementById('contact-email-link');

  const CONTACT_EMAIL = (contactForm && contactForm.dataset.email) || 'you@example.com';

  // Year in footer
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme persistence
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(stored || 'auto');

  function setTheme(mode){
    // mode: 'light' | 'dark' | 'auto'
    html.setAttribute('data-theme', mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode);
    localStorage.setItem('theme', mode);
    if (themeToggle) themeToggle.setAttribute('aria-pressed', (mode === 'dark').toString());
  }

  if (themeToggle){
    themeToggle.addEventListener('click', () => {
      const current = localStorage.getItem('theme') || 'auto';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  // Mobile nav
  if (navToggle && navMenu){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
      navMenu.classList.toggle('open');
    });
    // Close menu on link click
    navMenu.addEventListener('click', (e) => {
      if (e.target.closest('a')){
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  // Update email link from CONTACT_EMAIL
  if (contactEmailLink){
    contactEmailLink.href = `mailto:${CONTACT_EMAIL}`;
    contactEmailLink.textContent = CONTACT_EMAIL;
  }

  // Contact form -> mailto link
  if (contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('name').value || '').trim();
      const email = (document.getElementById('email').value || '').trim();
      const subject = (document.getElementById('subject').value || '').trim();
      const message = (document.getElementById('message').value || '').trim();

      // Basic validation
      clearErrors();
      let hasError = false;
      if (!name){ setError('name', 'Please enter your name'); hasError = true; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ setError('email', 'Enter a valid email'); hasError = true; }
      if (!subject){ setError('subject', 'Subject is required'); hasError = true; }
      if (!message){ setError('message', 'Please type a message'); hasError = true; }
      if (hasError) return;

      const mailSubject = encodeURIComponent(`[Portfolio] ${subject} — ${name}`);
      const body = `Message:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}`;
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${mailSubject}&body=${body}`;
      window.location.href = mailto;
    });
  }

  function setError(fieldId, text){
    const el = document.querySelector(`.error[data-for="${fieldId}"]`);
    if (el) el.textContent = text;
  }
  function clearErrors(){
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
  }
})();
