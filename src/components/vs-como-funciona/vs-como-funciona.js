const LEAF_SVG   = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12M12 12C12 7 7 4 2 4c0 5 3 10 10 8M12 12c0-5 5-8 10-8-1 5-4 9-10 8"/></svg>`;
const CLOCK_SVG  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const CHART_SVG  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`;

const PASSOS = [
  {
    icon:  LEAF_SVG,
    cor:   'green',
    passo: 'Passo 1',
    titulo: 'Escolha seu Suplemento',
    desc:  'Navegue em nosso catálogo e encontre a cápsula ideal para seus objetivos de emagrecimento.',
  },
  {
    icon:  CLOCK_SVG,
    cor:   'amber',
    passo: 'Passo 2',
    titulo: 'Tome Diariamente',
    desc:  'Siga as instruções de uso: 2 cápsulas ao dia, antes das refeições, com um copo de água.',
  },
  {
    icon:  CHART_SVG,
    cor:   'green',
    passo: 'Passo 3',
    titulo: 'Veja os Resultados',
    desc:  'Em poucas semanas, você já começa a notar a diferença no seu corpo e na sua disposição.',
  },
];

function stepHTML(p) {
  return `
    <div class="step">
      <div class="icon ${p.cor}">${p.icon}</div>
      <span class="passo">${p.passo}</span>
      <h3>${p.titulo}</h3>
      <p>${p.desc}</p>
    </div>
  `;
}

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./vs-como-funciona.css', import.meta.url).href}">
  <section id="como-funciona">
    <div class="container">
      <span class="eyebrow">Simples e Eficaz</span>
      <h2>Como Funciona</h2>
      <p class="subtitle">Um processo simples para transformar sua saúde e alcançar seus objetivos de forma natural.</p>
      <div class="steps">
        ${PASSOS.map(stepHTML).join('')}
      </div>
    </div>
  </section>
`;

export class VsComoFunciona extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
