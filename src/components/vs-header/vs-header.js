import { cart } from '../../cart.js';

const LOGO_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 21c6-1 9-5.5 9-12 0-2.2-.5-3.5-.5-3.5S17 6 13.5 6C8 6 5 9.5 5 14c0 3 1.5 5.5 4 6.5"/>
  <path d="M5.5 21c2-3 4-6 8.5-9"/>
</svg>`;

const CART_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>`;

export class VsHeader extends HTMLElement {
  static get observedAttributes() { return ['base']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
    this._updateBadge(cart.count);
    window.addEventListener('vs-cart-update', e => this._updateBadge(e.detail.count));
  }

  _updateBadge(n) {
    const badge = this.shadowRoot.querySelector('.cart-count');
    if (!badge) return;
    badge.textContent = n;
    badge.hidden = n === 0;
  }

  attributeChangedCallback() { if (this.isConnected) this._render(); }

  _render() {
    const base = this.getAttribute('base') || '';
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${new URL('./vs-header.css', import.meta.url).href}">
      <header>
        <div class="container">
          <a class="brand" href="${base}index.html">
            <span class="logo">${LOGO_SVG}</span>
            <span class="nome">VitaSlim</span>
          </a>
          <nav>
            <a href="${base}index.html#tab-inicio">Início</a>
            <a href="${base}index.html#tab-produtos">Produtos</a>
            <a href="${base}index.html#tab-como-funciona">Como Funciona</a>
            <a href="${base}faq.html">FAQ</a>
            <button class="cart-btn" aria-label="Abrir carrinho">
              ${CART_SVG}
              <span class="cart-count" hidden>0</span>
            </button>
          </nav>
        </div>
      </header>
    `;

    this.shadowRoot.querySelector('.cart-btn').addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('vs-cart-open'));
    });
  }
}
