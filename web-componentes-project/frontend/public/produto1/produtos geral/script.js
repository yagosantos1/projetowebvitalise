//* ── PRODUCTS DATA ── */
const products = [
  {
    id: 1,
    name: "Kit Completo VitaSlim",
    desc: "Combo com 3 suplementos para resultado máximo no emagrecimento.",
    price: "R$ 219,90",
    badge: "Kit",
    tag: "emagrecimento",
    img: "https://media.base44.com/images/public/69be92482d0aff11ed6d0150/86bb2258f_generated_59f103e9.png"
  },
  {
    id: 2,
    name: "SlimCaps Emagrecedor",
    desc: "Cápsulas naturais para emagrecimento com quitosana e chá verde.",
    price: "R$ 89,90",
    badge: null,
    tag: "emagrecimento",
    img: "https://media.base44.com/images/public/69be92482d0aff11ed6d0150/77c90f812_generated_2c3a9931.png"
  },
  {
    id: 3,
    name: "Detox Plus Purificante",
    desc: "Detox natural com ervas para desintoxicar e deixar seu corpo leve.",
    price: "R$ 95,90",
    badge: "Novo",
    tag: "detox",
    img: "https://media.base44.com/images/public/69be92482d0aff11ed6d0150/ba602f97b_generated_d63f21f6.png"
  },
  {
    id: 4,
    name: "Turbo Meta Acelerador",
    desc: "Termogênico natural para acelerar metabolismo e otimizar calorias.",
    price: "R$ 99,90",
    badge: null,
    tag: "metabolismo",
    img: "https://media.base44.com/images/public/69be92482d0aff11ed6d0150/d4e145be2_generated_2a0f9120.png"
  },
  {
    id: 6,
    name: "CarbBlock Control",
    desc: "Inibidor natural de carboidratos para ajudar no controle do peso.",
    price: "R$ 79,90",
    badge: "Top",
    tag: "emagrecimento",
    img: "https://media.base44.com/images/public/69be92482d0aff11ed6d0150/50a2ac5f9_generated_caae9784.png"
  }
];

/* ── RENDER CARDS ── */
function renderCards(filter) {
  const grid = document.getElementById('productGrid');
  const list = filter === 'all' ? products : products.filter(p => p.tag === filter);

  grid.innerHTML = list.map(p => `
    <div class="card" tabindex="0" data-id="${p.id}">
      <div class="card-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
      </div>
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-price">${p.price}</div>
        <button class="card-btn" data-id="${p.id}">Adicionar ao Carrinho</button>
      </div>
    </div>
  `).join('');
}

/* ── FILTER PILLS ── */
function initFilters() {
  document.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.dataset.filter);
    });
  });
}

/* ── ADD TO CART (delegated) ── */
function initCart() {
  document.getElementById('productGrid').addEventListener('click', e => {
    if (e.target.classList.contains('card-btn')) {
      showToast();
    }
  });
}

/* ── TOAST ── */
function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

/* ── DRAWER ── */
function initDrawer() {
  const drawer = document.getElementById('drawer');
  document.getElementById('menuBtn').addEventListener('click', () => drawer.classList.add('open'));
  document.getElementById('drawerClose').addEventListener('click', () => drawer.classList.remove('open'));
  document.getElementById('drawerBackdrop').addEventListener('click', () => drawer.classList.remove('open'));
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderCards('all');
  initFilters();
  initCart();
  initDrawer();
});