import {
  elements,
  elementTemplate,
  popupImage,
  popupImageFigure,
  popupImageCaption,
  initialCards
} from './variables.js';

import {openPopup} from './modal.js';

// функция создания карточки
function createCard(item) {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__title').textContent = item['placeName'];
  cardImage.src = item['placeUrl'];
  cardImage.alt = item['placeName'];
  // обработчик - функция нажатия на кнопку лайка
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active')
  });
  // обработчик - функция нажатия на кнопку удаления
  cardElement.querySelector('.element__delete-button').addEventListener('click', function () {
    cardElement.remove();
  });
  // обработчик - функция нажатия на картинку
  cardImage.addEventListener('click', function () {
    openPopup(popupImage);
    popupImageFigure.src = cardImage.src;
    popupImageFigure.alt = cardImage.alt;
    popupImageCaption.textContent = item['placeName'];
  });
  return cardElement
};

// функция добавления новой карточки в DOM
function prependCard(item) {
  const newElement = createCard(item)
  elements.prepend(newElement);
};

export {initialCards, prependCard};