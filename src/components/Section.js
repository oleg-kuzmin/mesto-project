export default class Section {
  #elements;
  #animationPrepedNewCard;
  #animationDeleteCard;

  constructor(sectionObject) {
    this.#elements = document.querySelector(`.${sectionObject.selectorContainer}`);
    this.#animationPrepedNewCard = sectionObject.selectorAnimationPreped;
    this.#animationDeleteCard = sectionObject.selectorAnimationDelete;
  }

  prependCardToDom(newCard) {
    newCard.classList.add(this.#animationPrepedNewCard);
    this.#elements.prepend(newCard);
  }

  appendCardToDom(newCard) {
    this.#elements.append(newCard);
  }

  deleteCard(card) {
    card.classList.add(this.#animationDeleteCard);
  }
}
