class CartStore {
  constructor() {
    try { this._items = JSON.parse(localStorage.getItem('vs-cart') || '[]'); }
    catch { this._items = []; }
  }

  get items() { return [...this._items]; }

  get count() { return this._items.reduce((n, i) => n + i.qty, 0); }

  get total() {
    return this._items.reduce((s, i) => {
      const v = parseFloat(i.preco.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
      return s + (isNaN(v) ? 0 : v * i.qty);
    }, 0);
  }

  add(product) {
    const ex = this._items.find(i => i.id === product.id);
    if (ex) ex.qty++;
    else this._items.push({ ...product, qty: 1 });
    this._emit();
  }

  remove(id) {
    this._items = this._items.filter(i => i.id !== id);
    this._emit();
  }

  setQty(id, qty) {
    if (qty < 1) { this.remove(id); return; }
    const item = this._items.find(i => i.id === id);
    if (item) { item.qty = qty; this._emit(); }
  }

  _emit() {
    localStorage.setItem('vs-cart', JSON.stringify(this._items));
    window.dispatchEvent(new CustomEvent('vs-cart-update', {
      detail: { items: this.items, count: this.count, total: this.total }
    }));
  }
}

export const cart = new CartStore();
