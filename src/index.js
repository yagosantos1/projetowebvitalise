/*
 * Ponto de entrada — importa cada componente e registra
 * a custom tag correspondente no navegador.
 * Regra: o nome da tag DEVE ter um hífen (padrão Web Components).
 */
import { VsHeader }        from './components/vs-header/vs-header.js';
import { VsFooter }        from './components/vs-footer/vs-footer.js';
import { VsHero }          from './components/vs-hero/vs-hero.js';
import { VsProductGrid }   from './components/vs-product-grid/vs-product-grid.js';
import { VsComoFunciona }  from './components/vs-como-funciona/vs-como-funciona.js';
import { VsProductDetail } from './components/vs-product-detail/vs-product-detail.js';
import { VsTabs }          from './components/vs-tabs/vs-tabs.js';
import { VsCart }          from './components/vs-cart/vs-cart.js';
import { VsCheckout }      from './components/vs-checkout/vs-checkout.js';
import { VsPopup }         from './components/vs-popup/vs-popup.js';
import { VsFaq }           from './components/vs-faq/vs-faq.js';

customElements.define('vs-header',         VsHeader);
customElements.define('vs-footer',         VsFooter);
customElements.define('vs-hero',           VsHero);
customElements.define('vs-product-grid',   VsProductGrid);
customElements.define('vs-como-funciona',  VsComoFunciona);
customElements.define('vs-product-detail', VsProductDetail);
customElements.define('vs-tabs',           VsTabs);
customElements.define('vs-cart',           VsCart);
customElements.define('vs-checkout',       VsCheckout);
customElements.define('vs-popup',          VsPopup);
customElements.define('vs-faq',            VsFaq);
