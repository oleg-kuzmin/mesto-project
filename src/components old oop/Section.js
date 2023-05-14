export default class Section {
  constructor({ items, renderer }, containerId) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerId);
  }

  // Содержит публичный метод, который отвечает за отрисовку всех элементов.
  renderItems(items, method) {
    items.forEach((item) => {
      this.item = this._renderer(item);
      this.addItem(this.item, method);
    });
  }

  // Содержит публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(item, method) {
    if (method === "append") {
      this._container.append(item);
    } else this._container.prepend(item);
  }
}
