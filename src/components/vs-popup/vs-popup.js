const STORAGE_KEY = 'vs-popup-seen';
const COUPON      = 'VITASLIM10';

export class VsPopup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._shown = false;
  }

  connectedCallback() {
    if (localStorage.getItem(STORAGE_KEY)) return;
    this._render();
    setTimeout(() => this._open(), 4000);
  }

  _open() {
    const overlay = this.shadowRoot.querySelector('.overlay');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  _close() {
    const overlay = this.shadowRoot.querySelector('.overlay');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    localStorage.setItem(STORAGE_KEY, '1');
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${new URL('./vs-popup.css', import.meta.url).href}">
      <div class="overlay">
        <div class="popup">
          <button class="close-btn" aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <div class="popup-tag">Oferta exclusiva</div>
          <div class="popup-badge">10%<span>OFF</span></div>
          <h2>Bem-vindo à VitaSlim!</h2>
          <p>Cadastre seu e-mail e ganhe <strong>10% de desconto</strong> na sua primeira compra.</p>

          <div id="popup-body">
            <form id="popup-form">
              <input type="email" name="email" placeholder="seu@email.com" required>
              <button type="submit">Quero meu cupom →</button>
            </form>
            <button class="btn-skip">Não, obrigado</button>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => this._close());
    this.shadowRoot.querySelector('.overlay').addEventListener('click', e => {
      if (e.target === e.currentTarget) this._close();
    });
    this.shadowRoot.querySelector('.btn-skip').addEventListener('click', () => this._close());

    this.shadowRoot.querySelector('#popup-form').addEventListener('submit', e => {
      e.preventDefault();
      const email = e.target.email.value.trim();
      if (!email) return;
      localStorage.setItem('vs-popup-email', email);
      this._showSuccess();
    });
  }

  _showSuccess() {
    const body = this.shadowRoot.querySelector('#popup-body');
    body.innerHTML = `
      <div class="success">
        <div class="success-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>
        </div>
        <p class="success-msg">Cupom enviado para o seu e-mail!</p>
        <div class="coupon-box">
          <span class="coupon-label">Seu cupom</span>
          <strong class="coupon-code">${COUPON}</strong>
          <span class="coupon-hint">Use no checkout para 10% OFF</span>
        </div>
        <button class="btn-shop">Começar a comprar →</button>
      </div>
    `;

    this.shadowRoot.querySelector('.btn-shop').addEventListener('click', () => this._close());
    setTimeout(() => this._close(), 8000);
  }
}
