// ── Navegação entre páginas (SPA simples) ──
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  document.getElementById('nav-inicio').classList.toggle('active', page === 'inicio');
  document.getElementById('nav-produtos').classList.toggle('active', page === 'produtos' || page === 'turbo');

  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  closeMenu();

  // re-dispara animações de fade-in/cards da página atual
  document.querySelectorAll('#page-' + page + ' .fade-in, #page-' + page + ' .card').forEach(el => {
    el.classList.remove('visible');
    observer.observe(el);
  });

  // anima hero de novo só se for a página início
  if (page === 'inicio') {
    document.getElementById('heroText').classList.remove('visible');
    document.getElementById('heroImg').classList.remove('visible');
    setTimeout(() => document.getElementById('heroText').classList.add('visible'), 80);
    setTimeout(() => document.getElementById('heroImg').classList.add('visible'), 160);
  }

  history.replaceState(null, '', '#' + page);
}

function scrollToSection(id) {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 60);
}

// ── Navbar shadow on scroll ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 300);
});

// ── Hamburger menu ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  const open = menu.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.textContent = open ? '✕' : '☰';
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  const btn = document.getElementById('hamburger');
  btn.classList.remove('open');
  btn.textContent = '☰';
}

// ── Hero entrance animation (carga inicial) ──
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('heroText').classList.add('visible'), 100);
  setTimeout(() => document.getElementById('heroImg').classList.add('visible'), 200);

  // abre direto na página do hash, se houver (#produtos ou #turbo)
  const hash = location.hash.replace('#', '');
  if (hash === 'produtos' || hash === 'turbo') goTo(hash);
});

// ── Intersection Observer: fade-in & card stagger ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('visible'), Number(delay));
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in, .card').forEach(el => observer.observe(el));

// ── Animated counters ──
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count').forEach(el => counterObserver.observe(el));

function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString('pt-BR') + (target >= 1000 ? '+' : target === 98 ? '%' : '');
    if (current >= target) clearInterval(timer);
  }, 16);
}

// ── Cart toast ──
let toastTimer;
function addToCart(name) {
  const toast = document.getElementById('toast');
  toast.textContent = '🛒 ' + name + ' adicionado!';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}