const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./vs-hero.css', import.meta.url).href}">
  <section>
    <div class="container">
      <span class="eyebrow"><slot name="eyebrow">Emagrecimento Saudável</slot></span>
      <h2><slot name="titulo">Nossos Produtos</slot></h2>
      <p><slot name="subtitulo">Encontre o suplemento natural ideal para seus objetivos.</slot></p>
    </div>
  </section>
`;

export class VsHero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
