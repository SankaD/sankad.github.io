/* ─── Typing animation ─────────────────────────────────────── */
const roles = [
  'Rust Developer',
  'Blockchain Engineer',
  'FinTech Builder',
  'Backend Architect',
  'Musician & Composer',
];

const typedEl = document.querySelector('.typed-text');

if (typedEl) {
  let roleIndex   = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  function type() {
    const current = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 55 : 90;

    if (!isDeleting && charIndex === current.length) {
      // finished typing — pause then delete
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // finished deleting — move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ─── Sticky nav border + active link highlighting ────────── */
const nav        = document.querySelector('.nav');
const navLinks   = document.querySelectorAll('.nav__links a, .nav__mobile a');
const sections   = document.querySelectorAll('section[id]');

function onScroll() {
  // scrolled border
  if (window.scrollY > 10) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // active section
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
// Run immediately to set initial state
onScroll();

/* ─── Smooth scroll on nav link click ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();

    // close mobile nav if open
    burgerBtn.classList.remove('open');
    mobileNav.classList.remove('open');

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── Hamburger / mobile nav toggle ───────────────────────── */
const burgerBtn = document.querySelector('.nav__burger');
const mobileNav = document.querySelector('.nav__mobile');

if (burgerBtn && mobileNav) {
  burgerBtn.addEventListener('click', () => {
    const isOpen = burgerBtn.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      burgerBtn.classList.remove('open');
      mobileNav.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ─── Scroll fade-in (IntersectionObserver) ───────────────── */
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach(el => observer.observe(el));
} else {
  // Fallback for older browsers
  fadeEls.forEach(el => el.classList.add('visible'));
}
