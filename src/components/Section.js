export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Método para renderizar elementos iniciais
  renderItems() {
    this._items.forEach((item) => {
      const element = this._renderer(item);
      this._container.append(element);
    });
  }

  // Método público para adicionar novos elementos
  addItem(element) {
    this._container.prepend(element);
  }
}
