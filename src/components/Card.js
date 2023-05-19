export default class Card {
  constructor(objectCard) {
    this.template = document.querySelector(`#${objectCard.idTemplate}`).content;
    this.cardElement = `.${objectCard.selectorCardElement}`;
    this.cardTitle = `.${objectCard.selectorCardTitle}`;
  }

  _getTemplateCard() {
    const cloneCard = this.template.querySelector(this.cardElement).cloneNode(true);
    return cloneCard;
  }

  generateCard(cardObject, userId) {
    const newCard = this._getTemplateCard();
    const newCardTitle = newCard.querySelector(this.cardTitle); // находим Title
    const newCardImage = newCard.querySelector('.element__image'); // находим Image
    const newCardLike = newCard.querySelector('.element__like'); // находим Like
    const newCardLikeValue = newCard.querySelector('.element__like-value'); // находим LikeValue

    newCardTitle.textContent = cardObject.name; // заполняем Title.textContent
    newCardImage.src = cardObject.link; // заполняем Image.src
    newCardImage.alt = cardObject.name; // заполняем Image.lt
    newCardLikeValue.textContent = cardObject.likes.length; // заполняем LikeValue.textContent
    newCard.id = cardObject._id; // заполняем id

    //* проверим есть ли наши собственные карточки (если id совпадает)
    if (userId === cardObject.owner._id) {
      const newcardDeleteButton = newCard.querySelector('.element__delete-button'); // находим кнопку удаления (корзинку)
      newcardDeleteButton.removeAttribute('disabled'); // делаем ее включенной
      newcardDeleteButton.classList.remove('element__delete-button_off'); // делаем ее невидимой
    }

    //* проверим есть ли на карточке наши лайки (если id совпадает)
    cardObject.likes.forEach(element => {
      if (userId === element._id) {
        newCardLike.classList.add('element__like_active'); // делаем лайк активным
      }
    });

    return newCard;
  }
}
