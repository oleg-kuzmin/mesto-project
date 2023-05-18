export default class PageVisibility {
  constructor(objectPage) {
    this.page = document.querySelector(`.${objectPage.selectorPage}`);
    this.selectorOpenClass = objectPage.selectorOpenClass;
  }

  showPage() {
    this.page.classList.add(this.selectorOpenClass);
  }
}
