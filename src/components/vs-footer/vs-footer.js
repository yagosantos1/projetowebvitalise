const LOGO_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c6-1 9-5.5 9-12 0-2.2-.5-3.5-.5-3.5S17 6 13.5 6C8 6 5 9.5 5 14c0 3 1.5 5.5 4 6.5"/><path d="M5.5 21c2-3 4-6 8.5-9"/></svg>`;
const SHIELD_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z"/><path d="M9 12l2 2 4-4.5"/></svg>`;
const AWARD_SVG  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M8.2 12.7L6.5 22l5.5-3 5.5 3-1.7-9.3"/></svg>`;
const TRUCK_SVG  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="7" width="13" height="9" rx="1.2"/><path d="M14.5 10h4l3 3v3h-7z"/><circle cx="5.5" cy="18.2" r="1.6"/><circle cx="17.8" cy="18.2" r="1.6"/></svg>`;
const PHONE_SVG  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 4h3l1.6 4.2-2.1 1.6a13 13 0 006.2 6.2l1.6-2.1L20 15.5v3a2 2 0 01-2.2 2A16.5 16.5 0 013.5 6.2 2 2 0 015.5 4z"/></svg>`;
const MAIL_SVG   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`;
const PIN_SVG    = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.8 7-11.5A7 7 0 005 9.5C5 15.2 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.4"/></svg>`;

export class VsFooter extends HTMLElement {
  static get observedAttributes() { return ['base']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback()        { this._render(); }
  attributeChangedCallback() { this._render(); }

  _render() {
    const base = this.getAttribute('base') || '';
    const ano  = new Date().getFullYear();

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${new URL('./vs-footer.css', import.meta.url).href}">
      <footer>
        <div class="container">

          <div class="top">
            <span class="logo">${LOGO_SVG}</span>
            <div class="intro">
              <h2>VitaSlim</h2>
              <p>Suplementos naturais de alta qualidade para auxiliar no seu processo de emagrecimento saudável.</p>
            </div>
          </div>

          <div class="badges">
            <span class="badge">${SHIELD_SVG} ANVISA</span>
            <span class="badge">${AWARD_SVG} Qualidade</span>
            <span class="badge">${TRUCK_SVG} Rastreável</span>
          </div>

          <div class="content">
            <div class="col">
              <h3>Navegação</h3>
              <a href="${base}index.html#tab-produtos">Produtos</a>
              <a href="${base}index.html#tab-como-funciona">Como Funciona</a>
              <a href="${base}faq.html">FAQ</a>
              <a href="#">Meus Pedidos</a>
            </div>
            <div class="col">
              <h3>Informações</h3>
              <a href="#">Política de Privacidade</a>
              <a href="#">Termos de Uso</a>
              <a href="#">Política de Troca</a>
              <a href="#">Frete e Entrega</a>
            </div>
            <div class="col">
              <h3>Contato</h3>
              <span class="contact">${PHONE_SVG} (47) 99999-0000</span>
              <span class="contact">${MAIL_SVG} contato@vitaslim.com.br</span>
              <span class="contact">${PIN_SVG} Joinville, SC</span>
            </div>
          </div>

          <div class="bottom">© ${ano} VitaSlim — Todos os direitos reservados.</div>

        </div>
      </footer>
    `;
  }
}
