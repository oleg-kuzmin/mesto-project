import {elements, elementTemplate} from './variables.js';
import {profileId} from './index.js';
import {removeCardFromServer, addLikeToServer, removeLikeFromServer} from './api.js';
import {openCardImage} from './modal.js';

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
  const cardLikeButton = cardElement.querySelector('.element__like');
  const likeValue = cardElement.querySelector('.element__like-value');  
  const cardDeleteButton = cardElement.querySelector('.element__delete-button');
  const cardTitle = cardElement.querySelector('.element__title');  
  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  likeValue.textContent = item.likes.length;
  cardElement.id = item._id;

  // обработчик - нажатие на кнопку лайка
  cardLikeButton.addEventListener('click', function() {
    // если лайк активен
    if (cardLikeButton.classList.contains('element__like_active')) {
      removeLikeFromServer(cardElement.id)
      .then((res)=> {
        cardLikeButton.classList.remove('element__like_active');
        likeValue.textContent = res.likes.length;
      })
      .catch((err)=> {
        console.log(err);
      })
    // если лайк не активен
    } else {
      addLikeToServer(cardElement.id)
      .then((res)=> {
        cardLikeButton.classList.add('element__like_active');
        likeValue.textContent = res.likes.length;
      })
      .catch((err)=> {
        console.log(err);
      })
    }
  })

  // обработчик - нажатие на кнопку удаления
  cardDeleteButton.addEventListener('click', function() {
    removeCardFromServer(cardElement.id)
    .then(()=> {
      cardElement.remove();
    })
    .catch((err)=> {
      console.log(err);
    })
  });

  // обработчик - нажатие на картинку места
  cardImage.addEventListener('click', function() {
    openCardImage(cardImage);
  });

  // проверка наших карточек
  if (profileId !== item.owner._id) {
    cardDeleteButton.classList.add('element__delete-button_off')
  };

  // проверка наших лайков
  item.likes.forEach (function (likes) {
    const result = checkMyLike(profileId, likes._id);
    if (result === true) {
      cardLikeButton.classList.add('element__like_active')
    }
  });
  
  return cardElement
};

// функция добавления новой карточки в начало node
function appendCard(item) {
  const newElement = createCard(item)
  elements.append(newElement);
};

// функция добавления новой карточки в конец node
function prependCard(item) {
  const newElement = createCard(item)
  elements.prepend(newElement);
};

export {appendCard, prependCard};