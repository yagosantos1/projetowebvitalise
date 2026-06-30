const STAR_SVG   = `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const STAR_SM    = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`;
const SHIELD_SVG = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z"/><path d="M9 12l2 2 4-4.5"/></svg>`;
const TRUCK_SVG  = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="7" width="13" height="9" rx="1.2"/><path d="M14.5 10h4l3 3v3h-7z"/><circle cx="5.5" cy="18.2" r="1.6"/><circle cx="17.8" cy="18.2" r="1.6"/></svg>`;

const LEAF_SVG   = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12M12 12C12 7 7 4 2 4c0 5 3 10 10 8M12 12c0-5 5-8 10-8-1 5-4 9-10 8"/></svg>`;
const SHIELD_BIG = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z"/><path d="M9 12l2 2 4-4.5"/></svg>`;
const CHART_SVG  = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`;
const TRUCK_BIG  = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="7" width="13" height="9" rx="1.2"/><path d="M14.5 10h4l3 3v3h-7z"/><circle cx="5.5" cy="18.2" r="1.6"/><circle cx="17.8" cy="18.2" r="1.6"/></svg>`;
const QUOTE_SVG  = `<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" opacity=".12"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>`;

const BENEFICIOS = [
  { icon: LEAF_SVG,   titulo: 'Ingredientes Naturais',      desc: 'Extratos vegetais e nutrientes selecionados rigorosamente para máxima eficácia e segurança.' },
  { icon: SHIELD_BIG, titulo: 'Sem Efeitos Colaterais',     desc: 'Fórmulas aprovadas pela ANVISA, desenvolvidas por especialistas em nutrição e saúde.' },
  { icon: CHART_SVG,  titulo: 'Resultados Comprovados',     desc: 'Mais de 15.000 clientes satisfeitos com resultados visíveis em poucas semanas de uso.' },
  { icon: TRUCK_BIG,  titulo: 'Entrega para Todo o Brasil', desc: 'Enviamos com rastreamento e garantia de entrega em até 5 dias úteis para qualquer estado.' },
];

const STARS5 = Array(5).fill(STAR_SM).join('');

const DEPOIMENTOS = [
  {
    iniciais: 'AP', cor: '#16a34a',
    nome: 'Ana Paula M.', cidade: 'São Paulo, SP',
    produto: 'SlimCaps Emagrecedor',
    texto: 'Perdi 6kg em 2 meses! Me sinto muito mais disposta e sem nenhum efeito colateral. Já indiquei para toda a minha família.',
  },
  {
    iniciais: 'CE', cor: '#0e7490',
    nome: 'Carlos Eduardo F.', cidade: 'Joinville, SC',
    produto: 'Kit Completo VitaSlim',
    texto: 'Comprei o Kit Completo e em 45 dias já notei diferença no espelho. Os resultados superaram minhas expectativas.',
  },
  {
    iniciais: 'JR', cor: '#7c3aed',
    nome: 'Juliana R.', cidade: 'Curitiba, PR',
    produto: 'Detox Plus Purificante',
    texto: 'O Detox Plus me ajudou muito com o inchaço. Me sinto mais leve e com a digestão muito melhorada. Já fiz o segundo pedido!',
  },
  {
    iniciais: 'MT', cor: '#b45309',
    nome: 'Marcos T.', cidade: 'Rio de Janeiro, RJ',
    produto: 'Turbo Meta Acelerador',
    texto: 'Junto com exercícios fez uma diferença incrível no metabolismo. Entrega super rápida e produto de qualidade.',
  },
];

const TABS = ['inicio', 'produtos', 'como-funciona'];

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./vs-tabs.css', import.meta.url).href}">
  <div class="tabs-wrapper">
    <div class="tab-panels">

      <div class="panel active" id="panel-inicio">

        <!-- Hero -->
        <section class="inicio-hero">
          <div class="container">
            <span class="eyebrow">A Sua Transformação Começa Aqui</span>
            <h1>Emagreça com saúde usando suplementos <span class="green">100% naturais</span></h1>
            <p class="subtitle">Fórmulas desenvolvidas com ingredientes puros, sem efeitos colaterais, para auxiliar no seu processo de emagrecimento de forma segura e eficaz.</p>
            <div class="features">
              <span class="feature">${STAR_SVG} 100% Natural</span>
              <span class="feature">${SHIELD_SVG} Aprovado ANVISA</span>
              <span class="feature">${TRUCK_SVG} Entrega Rápida</span>
            </div>
            <div class="stats">
              <div class="stat"><strong>15.000+</strong><span>clientes</span></div>
              <div class="stat-divider"></div>
              <div class="stat"><strong>★ 4,9</strong><span>avaliação média</span></div>
              <div class="stat-divider"></div>
              <div class="stat"><strong>Desde 2018</strong><span>no mercado</span></div>
            </div>
            <div class="hero-ctas">
              <button class="cta-btn" data-go="produtos">Explorar Produtos →</button>
              <button class="cta-secondary" data-go="como-funciona">Como Funciona</button>
            </div>
          </div>
        </section>

        <!-- Benefícios -->
        <section class="benefits">
          <div class="container-wide">
            <div class="benefit-grid">
              ${BENEFICIOS.map(b => `
                <div class="benefit">
                  <div class="b-icon">${b.icon}</div>
                  <h3>${b.titulo}</h3>
                  <p>${b.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Depoimentos -->
        <section class="testimonials">
          <div class="container-wide">
            <div class="section-head">
              <span class="eyebrow">O que nossos clientes dizem</span>
              <h2>Resultados reais de pessoas reais</h2>
              <p class="section-sub">Mais de 15.000 clientes transformaram sua saúde com a VitaSlim</p>
            </div>
            <div class="testimonial-grid">
              ${DEPOIMENTOS.map(d => `
                <div class="testimonial-card">
                  <div class="quote-icon">${QUOTE_SVG}</div>
                  <p class="testimonial-text">"${d.texto}"</p>
                  <div class="testimonial-stars">${STARS5}</div>
                  <div class="testimonial-author">
                    <div class="avatar" style="background:${d.cor}">${d.iniciais}</div>
                    <div>
                      <strong>${d.nome}</strong>
                      <span>${d.cidade}</span>
                      <span class="t-produto">${d.produto}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

      </div>

      <div class="panel" id="panel-produtos">
        <vs-product-grid></vs-product-grid>
      </div>

      <div class="panel" id="panel-como-funciona">
        <vs-como-funciona></vs-como-funciona>
      </div>

    </div>
  </div>
`;

export class VsTabs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('[data-go]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.go;
        history.replaceState(null, '', `#tab-${tab}`);
        this._activate(tab);
      });
    });

    window.addEventListener('hashchange', () => this._activateFromHash());
    this._activateFromHash();
  }

  _activateFromHash() {
    const hash = location.hash.slice(1);
    if (hash.startsWith('tab-')) {
      const tab = hash.replace('tab-', '');
      if (TABS.includes(tab)) this._activate(tab);
    }
  }

  _activate(tab) {
    this.shadowRoot.querySelectorAll('.panel').forEach(p =>
      p.classList.toggle('active', p.id === `panel-${tab}`)
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
