const FAQ = [
  {
    categoria: 'Sobre os Produtos',
    itens: [
      { p: 'Os suplementos são 100% naturais?', r: 'Sim. Toda a linha VitaSlim é formulada com extratos vegetais, vitaminas e minerais de origem natural, sem conservantes artificiais, corantes ou substâncias sintéticas.' },
      { p: 'Os produtos têm registro na ANVISA?', r: 'Sim. Todos os nossos suplementos possuem registro ativo na ANVISA (Agência Nacional de Vigilância Sanitária), garantindo segurança e eficácia comprovadas.' },
      { p: 'Preciso de receita médica para comprar?', r: 'Não. Nossos produtos são classificados como suplementos alimentares e não exigem prescrição médica. Porém, recomendamos consultar um profissional de saúde antes de iniciar qualquer suplementação.' },
      { p: 'Os produtos contêm glúten ou lactose?', r: 'Todos os produtos VitaSlim são isentos de glúten. A maioria é também livre de lactose — confira a embalagem do produto específico para confirmar.' },
    ],
  },
  {
    categoria: 'Resultados e Uso',
    itens: [
      { p: 'Em quanto tempo verei resultados?', r: 'Os primeiros resultados costumam aparecer entre 2 a 4 semanas de uso contínuo. Para resultados ótimos, recomendamos manter o uso por pelo menos 60 a 90 dias, aliado a alimentação equilibrada e prática regular de exercícios.' },
      { p: 'Como devo tomar os suplementos?', r: 'A dosagem recomendada é de 2 cápsulas ao dia, preferencialmente antes das principais refeições, com um copo grande de água (250ml). Consulte a embalagem de cada produto para instruções específicas.' },
      { p: 'Posso tomar mais de um produto ao mesmo tempo?', r: 'Sim! O Kit Completo VitaSlim foi especialmente desenvolvido para ser usado em conjunto. A combinação SlimCaps + Detox Plus + Turbo Meta potencializa os resultados de forma segura.' },
      { p: 'Há efeitos colaterais?', r: 'Nossos produtos são formulados para minimizar efeitos colaterais. Em alguns casos, nas primeiras semanas, podem ocorrer leves desconfortos gastrointestinais de adaptação. Se persistirem, suspenda o uso e consulte um médico.' },
    ],
  },
  {
    categoria: 'Entrega e Pedidos',
    itens: [
      { p: 'Qual o prazo de entrega?', r: 'O prazo de entrega varia de 3 a 7 dias úteis, dependendo da sua localização. Para capitais e regiões metropolitanas, normalmente entre 3 e 5 dias. Regiões mais remotas podem levar até 10 dias úteis.' },
      { p: 'Como rastrear meu pedido?', r: 'Após a confirmação do pagamento, você receberá um e-mail com o código de rastreamento dos Correios. Você pode acompanhar o status do envio diretamente no site dos Correios ou pelo aplicativo Correios.' },
      { p: 'Entregam para todo o Brasil?', r: 'Sim! Entregamos para todos os estados brasileiros, incluindo as regiões Norte e Nordeste. O frete é grátis para compras acima de R$ 150.' },
      { p: 'Posso alterar ou cancelar meu pedido?', r: 'É possível cancelar ou alterar o pedido em até 24 horas após a confirmação, antes do envio. Entre em contato conosco pelo WhatsApp (47) 99999-0000 ou pelo e-mail contato@vitaslim.com.br.' },
    ],
  },
  {
    categoria: 'Pagamento e Garantia',
    itens: [
      { p: 'Quais formas de pagamento são aceitas?', r: 'Aceitamos Pix (com 5% de desconto), cartão de crédito em até 12 parcelas sem juros e boleto bancário com vencimento em 3 dias úteis.' },
      { p: 'Como funciona a garantia de 30 dias?', r: 'Se por qualquer motivo você não ficar satisfeito com o produto, basta entrar em contato dentro de 30 dias após o recebimento. Faremos o reembolso integral sem burocracia, nenhuma pergunta feita.' },
      { p: 'O site é seguro para comprar?', r: 'Sim. Utilizamos certificado SSL e criptografia de ponta a ponta em todas as transações. Suas informações pessoais e dados de pagamento estão totalmente protegidos.' },
      { p: 'Como solicitar troca ou devolução?', r: 'Entre em contato pelo e-mail contato@vitaslim.com.br ou WhatsApp (47) 99999-0000 informando o número do pedido e o motivo. Nossa equipe retornará em até 24 horas com as instruções.' },
    ],
  },
];

const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="${new URL('./vs-faq.css', import.meta.url).href}">
  <section class="faq">
    <div class="container">
      <div class="faq-header">
        <span class="eyebrow">Dúvidas Frequentes</span>
        <h1>Como podemos ajudar?</h1>
        <p>Encontre respostas para as perguntas mais comuns sobre nossos produtos e serviços.</p>
      </div>
      <div class="faq-body">
        ${FAQ.map(cat => `
          <div class="category">
            <h2 class="cat-title">${cat.categoria}</h2>
            <div class="items">
              ${cat.itens.map((item, i) => `
                <div class="faq-item" data-index="${i}">
                  <button class="faq-q">
                    <span>${item.p}</span>
                    <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  <div class="faq-a">
                    <p>${item.r}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="faq-cta">
        <p>Não encontrou o que procurava?</p>
        <div class="cta-row">
          <a class="btn-whatsapp" href="https://wa.me/5547999990000" target="_blank" rel="noopener">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.05 2C6.495 2 2 6.476 2 12.013a9.97 9.97 0 001.386 5.088L2 22l5.063-1.327A10.05 10.05 0 0012.05 22C17.603 22 22 17.524 22 11.987 22 6.474 17.603 2 12.05 2z"/></svg>
            Falar no WhatsApp
          </a>
          <a class="btn-email" href="mailto:contato@vitaslim.com.br">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
            Enviar e-mail
          </a>
        </div>
      </div>
    </div>
  </section>
`;

export class VsFaq extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        this.shadowRoot.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  }
}
