export default class Card {
  constructor(data, templateId, userId, {removeCardToServer, removeLikeToServer , addLikeToServer, openPopupImage}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._templateId = templateId;
    this._id = data._id;
    this._userId = userId;
    this._removeCardToServer = removeCardToServer;
    this._removeLikeToServer = removeLikeToServer;
    this._addLikeToServer = addLikeToServer;
    this._openPopupImage = openPopupImage;
  }

  // получаем шаблон разметки
  _getTemplateCard() {
    const templateCard = document.querySelector(this._templateId).content.querySelector(".card").cloneNode(true);
    return templateCard;
  }

  // создание карточки
  generateCard() {
    this._card = this._getTemplateCard();
    this._cardName = this._card.querySelector(".card__name");
    this._cardImage = this._card.querySelector(".card__image");
    this._likeQuantity = this._card.querySelector(".card__like-quantity");
    this._cardReactionButton = this._card.querySelector(".card__reaction");
    this._cardRemove = this._card.querySelector(".card__remove");
    this._handleAddBasket();
    this._findUserLikes();
    this.setEventListeners();
    this._cardName.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._likeQuantity.textContent = this._likes.length;
    return this._card;
  }

  // метод добавления корзинки нашим карточкам
  _handleAddBasket() {
    if (this._owner._id === this._userId) {
      this._cardRemove.classList.add("card__remove_active");
    }
  }

  // метод поиска наших лайков
  _findUserLikes() {
    if (this._likes.find((like) => like._id === this._userId)) {
      this._cardReactionButton.classList.add("card__reaction_active");
    }
  }

  // установка обработчиков
  setEventListeners() {
    this._cardReactionButton.addEventListener("click", this._handleCardReaction);
    this._cardImage.addEventListener("click", this._handleOpenPopupImage);
    this._cardRemove.addEventListener("click", this._handleRemoveCard);
  }

  // метод - нажатие на картинку карточки
  _handleOpenPopupImage = () => {
    this._openPopupImage(this._name, this._link);
  }

  // метод - нажатие на кнопку лайка карточки
  _handleCardReaction = (evt) => {
    if (evt.target.classList.contains("card__reaction_active")) {
    this._removeLikeToServer(this._id)
    } else this._addLikeToServer(this._id);
  };

  // метод - удаление лайка
  removeLike = (likeQuantity) => {
    this._cardReactionButton.classList.remove("card__reaction_active");
    this._likeQuantity.textContent = likeQuantity;
  };

  // метод - добавления лайка
  addLike = (likeQuantity) => {
    this._cardReactionButton.classList.add("card__reaction_active");
    this._likeQuantity.textContent = likeQuantity;
  };

  // метод - нажатие на кнопку удаления карточки
  _handleRemoveCard = () => {
    this._removeCardToServer(this._id);
  };

  // метод - удаление карточки
  deleteCard = () => {
    this._card.remove();
  }
}
