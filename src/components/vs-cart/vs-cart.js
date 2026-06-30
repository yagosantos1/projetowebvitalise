import { cart } from '../../cart.js';

export class VsCart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._open = false;
  }

  connectedCallback() {
    this._render();
    window.addEventListener('vs-cart-open', () => this._setOpen(true));
    window.addEventListener('vs-cart-update', () => this._renderItems());
  }

  _setOpen(val) {
    this._open = val;
    const drawer   = this.shadowRoot.querySelector('.drawer');
    const backdrop = this.shadowRoot.querySelector('.backdrop');
    drawer.classList.toggle('open', val);
    backdrop.classList.toggle('open', val);
    document.body.style.overflow = val ? 'hidden' : '';
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${new URL('./vs-cart.css', import.meta.url).href}">
      <div class="backdrop"></div>
      <aside class="drawer" role="dialog" aria-label="Carrinho de compras">
        <div class="drawer-header">
          <h2>Carrinho</h2>
          <button class="close-btn" aria-label="Fechar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="shipping-bar"></div>
        <div class="items"></div>
        <div class="drawer-footer">
          <div class="total-row">
            <span>Total</span>
            <strong class="total-value">R$ 0,00</strong>
          </div>
          <button class="checkout-btn">Finalizar Compra</button>
          <p class="secure-note">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z"/><path d="M9 12l2 2 4-4.5"/></svg>
            Pagamento 100% seguro
          </p>
        </div>
      </aside>
    `;

    this.shadowRoot.querySelector('.backdrop').addEventListener('click', () => this._setOpen(false));
    this.shadowRoot.querySelector('.close-btn').addEventListener('click',  () => this._setOpen(false));

    this.shadowRoot.querySelector('.checkout-btn').addEventListener('click', () => {
      this._setOpen(false);
      window.dispatchEvent(new CustomEvent('vs-checkout-open'));
    });

    this._renderItems();
  }

  _renderItems() {
    const items   = cart.items;
    const itemsEl = this.shadowRoot.querySelector('.items');
    const totalEl = this.shadowRoot.querySelector('.total-value');
    if (!itemsEl) return;

    // Barra de frete grátis
    const FRETE_GRATIS = 150;
    const total = cart.total;
    const shippingEl = this.shadowRoot.querySelector('.shipping-bar');
    if (shippingEl) {
      if (items.length === 0) {
        shippingEl.innerHTML = '';
      } else if (total >= FRETE_GRATIS) {
        shippingEl.innerHTML = `<div class="shipping-ok">🎉 Parabéns! Você ganhou <strong>frete grátis</strong>!</div>`;
      } else {
        const falta = FRETE_GRATIS - total;
        const pct   = Math.min((total / FRETE_GRATIS) * 100, 100);
        shippingEl.innerHTML = `
          <div class="shipping-info">
            <span>Faltam <strong>R$ ${falta.toFixed(2).replace('.', ',')}</strong> para frete grátis</span>
          </div>
          <div class="shipping-track"><div class="shipping-fill" style="width:${pct.toFixed(1)}%"></div></div>
        `;
      }
    }

    if (items.length === 0) {
      itemsEl.innerHTML = `
        <div class="empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <p>Seu carrinho está vazio.</p>
          <span>Adicione produtos para começar.</span>
        </div>
      `;
    } else {
      itemsEl.innerHTML = items.map(item => `
        <div class="item">
          <img src="${item.img}" alt="${item.alt}" class="item-img">
          <div class="item-info">
            <p class="item-name">${item.nome}</p>
            <p class="item-price">${item.preco}</p>
            <div class="qty-row">
              <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
              <span class="qty">${item.qty}</span>
              <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
            </div>
          </div>
          <button class="remove-btn" data-id="${item.id}" aria-label="Remover">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      `).join('');

      itemsEl.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id   = btn.dataset.id;
          const item = cart.items.find(i => i.id === id);
          if (!item) return;
          cart.setQty(id, btn.dataset.action === 'inc' ? item.qty + 1 : item.qty - 1);
        });
      });

      itemsEl.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => cart.remove(btn.dataset.id));
      });
    }

    if (totalEl) {
      totalEl.textContent = `R$ ${cart.total.toFixed(2).replace('.', ',')}`;
    }
  }
}
