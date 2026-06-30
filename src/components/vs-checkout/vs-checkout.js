import { cart } from '../../cart.js';

const PIX_ICON = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="8" height="8" rx="1"/></svg>`;
const CARD_ICON = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`;
const BOLETO_ICON = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>`;
const CHECK_ICON = `<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></svg>`;
const CLOSE_ICON = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

const STATES = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];

export class VsCheckout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._step = 1;
    this._payment = 'pix';
    this._orderId = null;
    this._formData = {};
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `<link rel="stylesheet" href="${new URL('./vs-checkout.css', import.meta.url).href}"><div class="overlay"><div class="modal"></div></div>`;
    this.shadowRoot.querySelector('.overlay').addEventListener('click', e => {
      if (e.target === e.currentTarget) this._close();
    });
    window.addEventListener('vs-checkout-open', () => this._open());
  }

  _open() {
    this._step = 1;
    this._payment = 'pix';
    this._orderId = null;
    this._formData = {};
    this.shadowRoot.querySelector('.overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
    this._renderModal();
  }

  _close() {
    this.shadowRoot.querySelector('.overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  _renderModal() {
    const modal = this.shadowRoot.querySelector('.modal');
    const total = cart.total;
    const totalPix = total * 0.95;

    modal.innerHTML = `
      <!-- Header -->
      <div class="modal-header">
        <div class="progress">
          ${[1,2,3].map(n => `
            <div class="prog-item${this._step === n ? ' active' : this._step > n ? ' done' : ''}">
              <div class="prog-dot">${this._step > n ? '✓' : n}</div>
              <span>${['Dados','Pagamento','Confirmação'][n-1]}</span>
            </div>
            ${n < 3 ? '<div class="prog-line' + (this._step > n ? ' done' : '') + '"></div>' : ''}
          `).join('')}
        </div>
        <button class="close-btn" aria-label="Fechar">${CLOSE_ICON}</button>
      </div>

      <!-- Content -->
      <div class="modal-body">
        ${this._step === 1 ? this._tplDados() : ''}
        ${this._step === 2 ? this._tplPagamento(total, totalPix) : ''}
        ${this._step === 3 ? this._tplConfirmacao(total, totalPix) : ''}
      </div>

      <!-- Footer -->
      ${this._step < 3 ? `
        <div class="modal-footer">
          ${this._step === 2 ? `<button class="btn-back">← Voltar</button>` : '<span></span>'}
          <button class="btn-next">${this._step === 1 ? 'Continuar →' : 'Finalizar Pedido'}</button>
        </div>
      ` : ''}
    `;

    this._bindModal();
  }

  _tplDados() {
    const d = this._formData;
    return `
      <h3 class="step-title">Seus dados</h3>
      <form id="form-dados" novalidate>
        <div class="field-row">
          <div class="field">
            <label>Nome completo *</label>
            <input name="nome" type="text" placeholder="Maria da Silva" value="${d.nome||''}" required>
          </div>
          <div class="field">
            <label>CPF *</label>
            <input name="cpf" type="text" placeholder="000.000.000-00" maxlength="14" value="${d.cpf||''}" required>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label>E-mail *</label>
            <input name="email" type="email" placeholder="maria@email.com" value="${d.email||''}" required>
          </div>
          <div class="field">
            <label>WhatsApp *</label>
            <input name="telefone" type="tel" placeholder="(47) 99999-0000" value="${d.telefone||''}" required>
          </div>
        </div>

        <div class="section-divider">Endereço de entrega</div>

        <div class="field-row">
          <div class="field field-sm">
            <label>CEP *</label>
            <input name="cep" type="text" placeholder="00000-000" maxlength="9" value="${d.cep||''}" required>
          </div>
          <div class="field">
            <label>Rua / Avenida *</label>
            <input name="rua" type="text" placeholder="Rua das Flores" value="${d.rua||''}" required>
          </div>
          <div class="field field-xs">
            <label>Número *</label>
            <input name="numero" type="text" placeholder="123" value="${d.numero||''}" required>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label>Complemento</label>
            <input name="complemento" type="text" placeholder="Apto 12" value="${d.complemento||''}">
          </div>
          <div class="field">
            <label>Bairro *</label>
            <input name="bairro" type="text" placeholder="Centro" value="${d.bairro||''}" required>
          </div>
        </div>
        <div class="field-row">
          <div class="field">
            <label>Cidade *</label>
            <input name="cidade" type="text" placeholder="Joinville" value="${d.cidade||''}" required>
          </div>
          <div class="field field-xs">
            <label>Estado *</label>
            <select name="estado" required>
              <option value="">UF</option>
              ${STATES.map(s => `<option value="${s}"${d.estado===s?' selected':''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>
      </form>
    `;
  }

  _tplPagamento(total, totalPix) {
    const fmtBRL = v => `R$ ${v.toFixed(2).replace('.', ',')}`;
    const installments = Array.from({length:12},(_,i)=>i+1).map(n => {
      const v = total / n;
      return `<option value="${n}">${n}x de ${fmtBRL(v)}${n<=3?' sem juros':''}</option>`;
    }).join('');

    return `
      <h3 class="step-title">Forma de pagamento</h3>
      <div class="pay-options">
        <button class="pay-opt${this._payment==='pix'?' active':''}" data-pay="pix">
          ${PIX_ICON}
          <div>
            <strong>Pix</strong>
            <span>5% de desconto — ${fmtBRL(totalPix)}</span>
          </div>
          <div class="pay-check"></div>
        </button>
        <button class="pay-opt${this._payment==='cartao'?' active':''}" data-pay="cartao">
          ${CARD_ICON}
          <div>
            <strong>Cartão de Crédito</strong>
            <span>Até 12x — ${fmtBRL(total)}</span>
          </div>
          <div class="pay-check"></div>
        </button>
        <button class="pay-opt${this._payment==='boleto'?' active':''}" data-pay="boleto">
          ${BOLETO_ICON}
          <div>
            <strong>Boleto Bancário</strong>
            <span>Vence em 3 dias úteis — ${fmtBRL(total)}</span>
          </div>
          <div class="pay-check"></div>
        </button>
      </div>

      <div class="pay-content">
        ${this._payment === 'pix' ? `
          <div class="pix-wrap">
            <div class="qr-mock">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#1AB36C" stroke-width="1"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="3" y="3" width="6" height="6" fill="#1AB36C" rx=".5"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="15" y="3" width="6" height="6" fill="#1AB36C" rx=".5"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="3" y="15" width="6" height="6" fill="#1AB36C" rx=".5"/><line x1="14" y1="14" x2="22" y2="14"/><line x1="14" y1="18" x2="18" y2="18"/><line x1="18" y1="14" x2="18" y2="22"/><line x1="22" y1="18" x2="22" y2="22"/><line x1="14" y1="22" x2="18" y2="22"/></svg>
              <p>QR Code gerado após confirmação</p>
            </div>
            <div class="pix-key">Chave Pix: <strong>contato@vitaslim.com.br</strong></div>
            <div class="discount-tag">✦ Você economiza ${fmtBRL(total - totalPix)} com Pix</div>
          </div>
        ` : this._payment === 'cartao' ? `
          <form id="form-cartao" novalidate>
            <div class="field">
              <label>Número do cartão *</label>
              <input name="card-number" type="text" placeholder="0000 0000 0000 0000" maxlength="19" required>
            </div>
            <div class="field">
              <label>Nome no cartão *</label>
              <input name="card-name" type="text" placeholder="MARIA DA SILVA" required>
            </div>
            <div class="field-row">
              <div class="field">
                <label>Validade *</label>
                <input name="card-expiry" type="text" placeholder="MM/AA" maxlength="5" required>
              </div>
              <div class="field field-xs">
                <label>CVV *</label>
                <input name="card-cvv" type="password" placeholder="•••" maxlength="4" required>
              </div>
            </div>
            <div class="field">
              <label>Parcelas</label>
              <select name="installments">${installments}</select>
            </div>
          </form>
        ` : `
          <div class="boleto-wrap">
            <div class="boleto-info">
              <p>📅 Prazo: <strong>3 dias úteis</strong></p>
              <p>💰 Valor: <strong>${fmtBRL(total)}</strong></p>
              <p>📧 O boleto será enviado para o e-mail cadastrado.</p>
            </div>
            <div class="boleto-note">Após o pagamento, a confirmação pode levar até 2 dias úteis.</div>
          </div>
        `}
      </div>
    `;
  }

  _tplConfirmacao(total, totalPix) {
    const fmtBRL = v => `R$ ${v.toFixed(2).replace('.', ',')}`;
    const finalTotal = this._payment === 'pix' ? totalPix : total;
    const items = cart.items;
    const pMethod = { pix: 'Pix', cartao: 'Cartão de Crédito', boleto: 'Boleto Bancário' }[this._payment];

    return `
      <div class="success-wrap">
        <div class="success-icon">${CHECK_ICON}</div>
        <h3>Pedido Confirmado!</h3>
        <p class="order-id">Pedido <strong>#${this._orderId}</strong></p>
        <p class="success-sub">Em breve você receberá um e-mail com todos os detalhes em <strong>${this._formData.email || ''}</strong>.</p>

        <div class="order-summary">
          <div class="summary-items">
            ${items.map(i => `
              <div class="summary-row">
                <span>${i.nome} × ${i.qty}</span>
                <span>${fmtBRL(parseFloat(i.preco.replace('R$ ','').replace(',','.')) * i.qty)}</span>
              </div>
            `).join('')}
          </div>
          <div class="summary-total">
            <span>Total pago (${pMethod})</span>
            <strong>${fmtBRL(finalTotal)}</strong>
          </div>
        </div>

        <button class="btn-continue">Continuar comprando</button>
      </div>
    `;
  }

  _bindModal() {
    const modal = this.shadowRoot.querySelector('.modal');

    modal.querySelector('.close-btn').addEventListener('click', () => this._close());

    const back = modal.querySelector('.btn-back');
    if (back) back.addEventListener('click', () => { this._step--; this._renderModal(); });

    const next = modal.querySelector('.btn-next');
    if (next) next.addEventListener('click', () => this._next());

    // Payment method toggle
    modal.querySelectorAll('.pay-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        this._payment = btn.dataset.pay;
        this._renderModal();
      });
    });

    // Card number mask
    const cardNum = modal.querySelector('input[name="card-number"]');
    if (cardNum) {
      cardNum.addEventListener('input', () => {
        let v = cardNum.value.replace(/\D/g,'').slice(0,16);
        cardNum.value = v.replace(/(.{4})/g,'$1 ').trim();
      });
    }

    // CPF mask
    const cpfInput = modal.querySelector('input[name="cpf"]');
    if (cpfInput) {
      cpfInput.addEventListener('input', () => {
        let v = cpfInput.value.replace(/\D/g,'').slice(0,11);
        if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/,'$1.$2.$3-$4');
        else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/,'$1.$2.$3');
        else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/,'$1.$2');
        cpfInput.value = v;
      });
    }

    // Card expiry mask
    const expiryInput = modal.querySelector('input[name="card-expiry"]');
    if (expiryInput) {
      expiryInput.addEventListener('input', () => {
        let v = expiryInput.value.replace(/\D/g,'').slice(0,4);
        if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
        expiryInput.value = v;
      });
    }

    // CEP mask
    const cepInput = modal.querySelector('input[name="cep"]');
    if (cepInput) {
      cepInput.addEventListener('input', () => {
        let v = cepInput.value.replace(/\D/g,'').slice(0,8);
        if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5);
        cepInput.value = v;
      });
    }

    // Continue shopping
    const contBtn = modal.querySelector('.btn-continue');
    if (contBtn) {
      contBtn.addEventListener('click', () => {
        cart._items = [];
        cart._emit();
        this._close();
      });
    }
  }

  _next() {
    if (this._step === 1) {
      const form = this.shadowRoot.querySelector('#form-dados');
      if (!form) return;
      const inputs = form.querySelectorAll('[required]');
      let valid = true;
      inputs.forEach(el => { if (!el.value.trim()) { el.classList.add('invalid'); valid = false; } else el.classList.remove('invalid'); });
      if (!valid) { this._shake(); return; }

      const fd = new FormData(form);
      this._formData = Object.fromEntries(fd.entries());
      this._step = 2;
      this._renderModal();

    } else if (this._step === 2) {
      if (this._payment === 'cartao') {
        const form = this.shadowRoot.querySelector('#form-cartao');
        if (form) {
          const inputs = form.querySelectorAll('[required]');
          let valid = true;
          inputs.forEach(el => { if (!el.value.trim()) { el.classList.add('invalid'); valid = false; } else el.classList.remove('invalid'); });
          if (!valid) { this._shake(); return; }
        }
      }
      this._orderId = 'VS' + Date.now().toString(36).toUpperCase().slice(-6);
      this._step = 3;
      this._renderModal();
    }
  }

  _shake() {
    const footer = this.shadowRoot.querySelector('.modal-footer');
    if (footer) { footer.classList.add('shake'); setTimeout(() => footer.classList.remove('shake'), 500); }
  }
}
