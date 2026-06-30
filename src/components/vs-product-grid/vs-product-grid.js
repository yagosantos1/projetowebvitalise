import { cart } from '../../cart.js';

const PRODUTOS = [
  { id: 'kit',        nome: 'Kit Completo VitaSlim',  desc: 'Combo com 3 suplementos para resultado máximo no emagrecimento.',       preco: 'R$ 219,90', precoAntigo: 'R$ 349,70', img: 'assets/img/kit-vitaslim.png', alt: 'Kit Completo VitaSlim',         estoque: 7  },
  { id: 'slimcaps',   nome: 'SlimCaps Emagrecedor',   desc: 'Cápsulas naturais para emagrecimento com quitosana e chá verde.',       preco: 'R$ 89,90',  precoAntigo: 'R$ 119,90', img: 'assets/img/slimcaps.png',     alt: 'SlimCaps Emagrecedor',          estoque: 13 },
  { id: 'detox',      nome: 'Detox Plus Purificante', desc: 'Detox natural com ervas para desintoxicar e desinchar o corpo.',        preco: 'R$ 69,90',  precoAntigo: 'R$ 89,90',  img: 'assets/img/detoxplus.png',    alt: 'Detox Plus Purificante',        estoque: 5  },
  { id: 'turbo',      nome: 'Turbo Meta Acelerador',  desc: 'Termogênico natural para acelerar o metabolismo e queimar calorias.',   preco: 'R$ 99,90',  precoAntigo: 'R$ 129,90', img: 'assets/img/turbometa.png',    alt: 'Turbo Meta Acelerador',         estoque: 9  },
  { id: 'sacietymax', nome: 'Saciety Max',             desc: 'Controle natural do apetite com fibras que prolongam a saciedade.',    preco: 'R$ 79,90',  precoAntigo: 'R$ 109,90', img: 'assets/img/sacietymax.png',   alt: 'Saciety Max Controle de Apetite', estoque: 18 },
];

function cardHTML(p) {
  return `
    <article class="card">
      <div class="card-image">
        <img src="${p.img}" alt="${p.alt}" loading="lazy">
      </div>
      <div class="card-body">
        <h3>${p.nome}</h3>
        <p class="desc">${p.desc}</p>
        <div class="price">
          <small>${p.precoAntigo}</small>
          ${p.preco}
        </div>
        <div class="stock${p.estoque <= 8 ? ' low' : ''}">
          ${p.estoque <= 8
            ? `<span class="stock-dot low-dot"></span> Restam apenas <strong>${p.estoque} unidades</strong>`
            : `<span class="stock-dot"></span> Em estoque`}
        </div>
        <div class="card-actions">
          <button class="btn-add" data-id="${p.id}">+ Adicionar ao carrinho</button>
          <a class="btn-detail" href="produtos/${p.id}.html">Ver produto</a>
        </div>
      </div>
    </article>
  `;
}

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./vs-product-grid.css', import.meta.url).href}">
  <section id="produtos">
    <div class="container">
      <div class="grid">
        ${PRODUTOS.map(cardHTML).join('')}
      </div>
    </div>
  </section>
`;

export class VsProductGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('.btn-add').forEach(btn => {
      btn.addEventListener('click', () => {
        const product = PRODUTOS.find(p => p.id === btn.dataset.id);
        if (!product) return;
        cart.add(product);
        btn.textContent = '✓ Adicionado!';
        btn.classList.add('added');
        setTimeout(() => {
          btn.textContent = '+ Adicionar ao carrinho';
          btn.classList.remove('added');
        }, 1600);
        window.dispatchEvent(new CustomEvent('vs-cart-open'));
      });
    });
  }
}
