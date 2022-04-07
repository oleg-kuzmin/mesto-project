import {
  elements,
  elementTemplate,
  popupImage,
  popupImageFigure,
  popupImageCaption
} from './variables.js';

import {openPopup} from './modal.js';
import {profileId, removeCardFromServer} from './api';

// функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
}

// функция открытия попапа с картинкой
function openCardImage(evt) {
  openPopup(popupImage);
  popupImageFigure.src = evt.target.src
  popupImageFigure.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;
}

// функция создания карточки
function createCard(item) {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardBasketElement = cardElement.querySelector('.element__delete-button');
  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__like-value').textContent = item.likes.length;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.id = item._id;
  if (profileId !== item.owner._id) {
    cardBasketElement.classList.add('element__delete-button_off')
  }
  return cardElement
};

// функция добавления новой карточки в конец node
function prependCard(item) {
  const newElement = createCard(item)
  elements.prepend(newElement);
};

// функция добавления новой карточки в начало node
function appendCard(item) {
  const newElement = createCard(item)
  elements.append(newElement);
};


// функция удаления карточки
function deleteCard(evt) {
  const idCard = evt.target.closest('.element').id;
  console.log(idCard);
  removeCardFromServer(idCard).then(()=> {
    evt.target.closest('.element').remove();
  })
}

// установка обработчиков на любую карточку
elements.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('element__like')) {
    likeCard(evt)
  }
  if (evt.target.classList.contains('element__delete-button')) {
    deleteCard(evt)
  }
  if (evt.target.classList.contains('element__image')) {
    openCardImage(evt)
  }
});

export {appendCard, prependCard};