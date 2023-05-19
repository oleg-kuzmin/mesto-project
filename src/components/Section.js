export default class Section {
  constructor(sectionObject) {
    this.elements = document.querySelector(`.${sectionObject.selectorContainer}`);
    this.prepedAnimationClass = sectionObject.prepedAnimationClass;
  }

  prependCardToDom(newCard) {
    newCard.classList.add(this.prepedAnimationClass);
    this.elements.prepend(newCard);
  }

  appendCardToDom(newCard) {
    this.elements.append(newCard);
  }
}
