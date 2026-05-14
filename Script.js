// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ===== MOBILE DRAWER =====
const hamburger = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileOverlay = document.getElementById('mobileOverlay');
const drawerClose = document.getElementById('drawerClose');
const mobLinks = document.querySelectorAll('.mob-link');

function openDrawer() {
  mobileDrawer.classList.add('open');
  mobileOverlay.classList.add('show');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  mobileDrawer.classList.remove('open');
  mobileOverlay.classList.remove('show');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
drawerClose.addEventListener('click', closeDrawer);
mobileOverlay.addEventListener('click', closeDrawer);
mobLinks.forEach(link => link.addEventListener('click', closeDrawer));

// ===== INTERSECTION OBSERVER: SERVICE CARDS =====
const svcCards = document.querySelectorAll('.svc-card');
const cardObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
      setTimeout(() => entry.target.classList.add('in-view'), delay);
      cardObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
svcCards.forEach(card => cardObs.observe(card));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target) {
  const duration = 1800;
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

const allCounters = document.querySelectorAll('[data-target]');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, target);
      counterObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
allCounters.forEach(el => counterObs.observe(el));

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    const href = link.getAttribute('href').replace('#', '');
    link.style.color = href === current ? 'var(--gold-light)' : '';
  });
}, { passive: true });

// ===== BOOKING FORM =====
const bookForm = document.getElementById('bookForm');
const bookSuccess = document.getElementById('bookSuccess');
if (bookForm) {
  bookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    bookForm.style.transition = 'opacity 0.4s, transform 0.4s';
    bookForm.style.opacity = '0';
    bookForm.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      bookForm.style.display = 'none';
      bookSuccess.classList.add('show');
    }, 400);
  });
}

// ===== GALLERY HOVER SUBTLE LIFT =====
document.querySelectorAll('.g-item').forEach(item => {
  item.style.transition = 'transform 0.4s ease';
});

// ===== SMOOTH REVEAL ON SCROLL (generic) =====
const revealItems = document.querySelectorAll('.about-grid, .contact-grid, .section-head');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealItems.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObs.observe(el);
});

// ===== HERO LOAD ANIMATION =====
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      });
    });
  }
});

// ===== SET MIN DATE ON DATE INPUT =====
const dateInput = document.querySelector('input[type="date"]');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}