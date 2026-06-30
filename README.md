# VitaSlim — Web Components Project

Site institucional/catálogo da **VitaSlim**, loja fictícia de suplementos naturais
para emagrecimento. Projeto unificado da disciplina de **Ferramentas Web e UX**
(Engenharia de Software — Católica de Santa Catarina).

Antes este projeto estava espalhado em várias pastas com 3 estilos visuais
diferentes. Tudo foi consolidado num site único, com design coerente
(fontes Inter/Poppins, ícones SVG, verde `#1AB36C`) e navegação funcionando,
construído com **Web Components** nativos (Custom Elements, sem framework).

## Estrutura

```
web-components-project/
├── index.html              # Home: catálogo + "Como Funciona" + rodapé
├── faq.html                 # Perguntas frequentes
├── produtos/                # Página de detalhe de cada produto
│   ├── kit.html
│   ├── slimcaps.html
│   ├── detox.html
│   ├── turbo.html
│   └── sacietymax.html
├── assets/
│   ├── css/style.css       # Folha de estilo única (design tokens + componentes)
│   └── img/                # Imagens dos produtos e logo
└── src/
    ├── index.js            # Ponto de entrada: registra todos os Web Components
    ├── cart.js             # Store do carrinho (localStorage + eventos)
    └── components/         # Um Custom Element por pasta (vs-header, vs-cart,
                             # vs-checkout, vs-footer, vs-hero, vs-product-grid,
                             # vs-product-detail, vs-tabs, vs-popup, vs-faq,
                             # vs-como-funciona)
```

## Como rodar

É um site estático: basta abrir `index.html` no navegador.
Para servir localmente (recomendado, evita bloqueios de caminho ao carregar
módulos JS), use qualquer servidor estático, por exemplo:

```
npx serve .
```

## Produtos

| Produto | Preço | Página |
|---|---|---|
| Kit Completo VitaSlim | R$ 219,90 | `produtos/kit.html` |
| SlimCaps Emagrecedor | R$ 89,90 | `produtos/slimcaps.html` |
| Detox Plus Purificante | R$ 69,90 | `produtos/detox.html` |
| Turbo Meta Acelerador | R$ 99,90 | `produtos/turbo.html` |
| Saciety Max | R$ 79,90 | `produtos/sacietymax.html` |
