export default class Card {
  #template;
  #cardElement;
  #cardTitle;
  #cardImage;
  #cardLike;
  #cardLikeActive;
  #cardLikeValue;
  #deleteButton;
  #deleteButtonOff;

  constructor(objectCard) {
    this.#template = document.querySelector(`#${objectCard.idTemplate}`).content;
    this.#cardElement = `.${objectCard.selectorCardElement}`;
    this.#cardTitle = `.${objectCard.selectorCardTitle}`;
    this.#cardImage = `.${objectCard.selectorCardImage}`;
    this.#cardLike = `.${objectCard.selectorCardLike}`;
    this.#cardLikeActive = `${objectCard.selectorCardLikeActive}`;
    this.#cardLikeValue = `.${objectCard.selectorCardLikeValue}`;
    this.#deleteButton = `.${objectCard.selectorDeleteButton}`;
    this.#deleteButtonOff = `${objectCard.selectorDeleteButtonOff}`;
  }

  #getTemplateCard() {
    const cloneCard = this.#template.querySelector(this.#cardElement).cloneNode(true);
    return cloneCard;
  }

  generateCard(cardObject, userId) {
    const newCard = this.#getTemplateCard();
    const newCardTitle = newCard.querySelector(this.#cardTitle);
    const newCardImage = newCard.querySelector(this.#cardImage);
    const newCardLike = newCard.querySelector(this.#cardLike);
    const newCardLikeValue = newCard.querySelector(this.#cardLikeValue);
    newCardTitle.textContent = cardObject.name;
    newCardImage.src = cardObject.link;
    newCardImage.alt = cardObject.name;
    newCardLikeValue.textContent = cardObject.likes.length;
    newCard.id = cardObject._id;
    //* проверим есть ли наши собственные карточки (если id совпадает)
    if (userId === cardObject.owner._id) {
      const newcardDeleteButton = newCard.querySelector(this.#deleteButton);
      newcardDeleteButton.removeAttribute('disabled');
      newcardDeleteButton.classList.remove(this.#deleteButtonOff);
    }
    //* проверим есть ли на карточке наши лайки (если id совпадает)
    cardObject.likes.forEach(element => {
      if (userId === element._id) {
        newCardLike.classList.add(this.#cardLikeActive);
      }
    });
    return newCard;
  }
}
