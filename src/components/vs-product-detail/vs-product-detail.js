import { cart } from '../../cart.js';

const ESTOQUE = { kit: 7, slimcaps: 13, detox: 5, turbo: 9, sacietymax: 18 };

const STAR_SVG   = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5l3 6.2 6.8 1-4.9 4.8 1.2 6.8L12 18l-6.1 3.3 1.2-6.8L2.2 9.7l6.8-1z"/></svg>`;
const BACK_SVG   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/></svg>`;
const SHIELD_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z"/></svg>`;
const TRUCK_SVG  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="7" width="13" height="9" rx="1.2"/><path d="M14.5 10h4l3 3v3h-7z"/><circle cx="5.5" cy="18.2" r="1.6"/><circle cx="17.8" cy="18.2" r="1.6"/></svg>`;
const REFRESH_SVG= `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0113.6-5.7M20 12a8 8 0 01-13.6 5.7"/><path d="M4 5v4h4"/><path d="M20 19v-4h-4"/></svg>`;

const stars = (n) => Array.from({ length: n }, () => STAR_SVG).join('');

export class VsProductDetail extends HTMLElement {
  static get observedAttributes() {
    return ['nome', 'preco', 'preco-antigo', 'imagem', 'avaliacoes', 'anvisa'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback()        { this._render(); }
  attributeChangedCallback() { this._render(); }

  _render() {
    const nome       = this.getAttribute('nome')        || '';
    const preco      = this.getAttribute('preco')       || '';
    const precoAnt   = this.getAttribute('preco-antigo')|| '';
    const imagem     = this.getAttribute('imagem')      || '';
    const avaliacoes = this.getAttribute('avaliacoes')  || '0';
    const anvisa     = this.getAttribute('anvisa')      || '';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${new URL('./vs-product-detail.css', import.meta.url).href}">
      <main>
        <div class="container">

          <a class="back" href="../index.html">${BACK_SVG} Voltar</a>

          <div class="produto">
            <div class="imagem">
              <img src="${imagem}" alt="${nome}">
            </div>

            <div class="info">
              <h1>${nome}</h1>

              <div class="price-row">
                <span class="price-old">${precoAnt}</span>
                <span class="price-new">${preco}</span>
              </div>

              <div class="rating">
                <span class="stars">${stars(5)}</span>
                <span class="count">(${avaliacoes} avaliações)</span>
              </div>

              <div class="description">
                <slot></slot>
              </div>

              <div class="badges">
                <div class="badge">${SHIELD_SVG} Registro ANVISA: ${anvisa}</div>
                <div class="badge">${TRUCK_SVG} Frete grátis acima de R$ 150</div>
                <div class="badge">${REFRESH_SVG} Garantia de 30 dias</div>
              </div>

              <div class="stock-row" id="stock-indicator"></div>

      <button class="btn">Comprar Agora</button>
            </div>
          </div>

        </div>
      </main>
    `;

    const id  = location.pathname.split('/').pop().replace('.html', '');
    const qtd = ESTOQUE[id];
    const stockEl = this.shadowRoot.querySelector('#stock-indicator');
    if (stockEl && qtd !== undefined) {
      if (qtd <= 8) {
        stockEl.innerHTML = `<span class="dot low"></span> Restam apenas <strong>${qtd} unidades</strong>`;
        stockEl.className = 'stock-row low';
      } else {
        stockEl.innerHTML = `<span class="dot"></span> Em estoque`;
        stockEl.className = 'stock-row';
      }
    }

    this.shadowRoot.querySelector('.btn').addEventListener('click', () => {
      const img = imagem.replace('../', '');

      cart.add({ id, nome, preco, img, alt: nome });

      window.dispatchEvent(new CustomEvent('vs-cart-open'));
    });
  }
}
