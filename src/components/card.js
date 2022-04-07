import {
  elements,
  elementTemplate,
  popupImage,
  popupImageFigure,
  popupImageCaption
} from './variables.js';

import {openPopup} from './modal.js';
import {profileId, removeCardFromServer, addLikeToServer, removeLikeFromServer} from './api';

// функция открытия попапа с картинкой
function openCardImage(evt) {
  openPopup(popupImage);
  popupImageFigure.src = evt.target.src
  popupImageFigure.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;
}

//функция проверки лайка
function checkMyLike(profileId, idLike) {
  if (profileId === idLike) {
    return true
  } else return false
}

// функция создания карточки
function createCard(item) {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardBasketElement = cardElement.querySelector('.element__delete-button');
  const cardLike = cardElement.querySelector('.element__like');
  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__like-value').textContent = item.likes.length;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.id = item._id;
  if (profileId !== item.owner._id) {
    cardBasketElement.classList.add('element__delete-button_off')
  }
  item.likes.forEach (function (likes) {
    const result = checkMyLike(profileId, likes._id);
    if (result === true) {
      cardLike.classList.add('element__like_active')
    }
  })
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

// функция добавления лайка карточки
function addLikeToDom(evt) {
  const idCard = evt.target.closest('.element').id;
  const likeValue = evt.target.closest('.element__like-container').querySelector('.element__like-value'); 
  addLikeToServer(idCard).then((res)=> {
    evt.target.classList.add('element__like_active');
    likeValue.textContent = res.likes.length;
  })
}

// функция удаления лайка карточки
function removeLikeFromDom(evt) {
  const idCard = evt.target.closest('.element').id;
  const likeValue = evt.target.closest('.element__like-container').querySelector('.element__like-value'); 
  removeLikeFromServer(idCard).then((res)=> {
    evt.target.classList.remove('element__like_active');
    likeValue.textContent = res.likes.length; 
  })
}

// установка обработчиков на любую карточку
elements.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('element__like') && !evt.target.classList.contains('element__like_active') ) {
    addLikeToDom(evt);
  }
  if (evt.target.classList.contains('element__like') && evt.target.classList.contains('element__like_active') ) {
    removeLikeFromDom(evt);
  }
  if (evt.target.classList.contains('element__delete-button')) {
    deleteCard(evt)
  }
  if (evt.target.classList.contains('element__image')) {
    openCardImage(evt)
  }
});

export {appendCard, prependCard};