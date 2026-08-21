/* ─── Typing animation ─────────────────────────────────────── */
const roles = [
  'Software engineer',
  'Systems builder',
  'Musician',
  'Songwriter',
  'Creative technologist',
];

const typedEl = document.querySelector('.typed-text');

if (typedEl) {
  let roleIndex   = 0;
  let charIndex   = 0;
  let isDeleting  = false;

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
      // Finished typing, then pause before deleting.
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, then move to the next role.
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ─── Navigation state ─────────────────────────────────────── */
const nav        = document.querySelector('.nav');
const navLinks   = document.querySelectorAll('.nav__links a, .nav__mobile a');
const currentPage = document.body.dataset.page || 'home';

function onScroll() {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 10);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

navLinks.forEach(link => {
  link.classList.toggle('active', link.dataset.pageLink === currentPage);
});

/* ─── Smooth scroll on nav link click ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();

    if (burgerBtn && mobileNav) {
      burgerBtn.classList.remove('open');
      mobileNav.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    }

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
    if (!nav.contains(e.target) && !mobileNav.contains(e.target)) {
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
