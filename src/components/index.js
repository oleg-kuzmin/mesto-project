import '../pages/index.css';
import {
  getProfile,
  patchAvatar,
  patchProfile,
  getAllCardsFromServer,
  addCardToServer,
  removeCardFromServer,
  addLikeToServer,
  removeLikeFromServer,
} from '../components/api';
import { enableValidation, resetForm } from '../components/validate';
import { profileTitle, profileSubtitle, profileAvatar } from '../components/variables.js';

let profileId;

//#
enableValidation();

//#
const showPage = () => {
  const page = document.querySelector('.page');
  page.classList.remove('page_disabled');
};

//#
Promise.all([getProfile(), getAllCardsFromServer()])
  .then(([data, item]) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    profileAvatar.src = data.avatar;
    profileId = data._id;
    item.forEach(appendCardToDom);
    showPage();
  })
  .catch(err => {
    console.log(err);
  });

//#
const buttonPopupAvatar = document.querySelector('.profile__avatar-edit');
const buttonPopupProfile = document.querySelector('.profile__edit-button');
const buttonPopupPlace = document.querySelector('.profile__add-button');

const popupAvatar = document.querySelector('#popupAvatar');
const popupProfile = document.querySelector('#popupProfile');
const popupPlace = document.querySelector('#popupPlace');
const popupImage = document.querySelector('#popupImage');

const inputProfileName = document.forms.formProfile.profileName;
const inputProfileAboutSelf = document.forms.formProfile.profileAboutSelf;
const inputAvatarUrl = document.forms.formAvatar.avatarUrl;
const inputPlaceName = document.forms.formPlace.placeName;
const inputPlaceUrl = document.forms.formPlace.placeUrl;

//#
const handleButtonClose = evt => {
  if (evt.target.classList.contains('popup__button-close')) {
    closePopup();
  }
};

const handleOverlayClose = evt => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
};

const handleEscKeyboard = evt => {
  if (evt.code === 'Escape') {
    closePopup();
  }
};

//#
const handleDeleteButton = evt => {
  if (evt.target.classList.contains('element__delete-button') && !evt.target.classList.contains('element__delete-button_off')) {
    const currentCard = evt.target.closest('.element');
    removeCardFromServer(currentCard.id)
      .then(() => {
        currentCard.remove();
      })
      .catch(err => {
        console.error(err);
      });
  }
};

document.addEventListener('click', handleDeleteButton);

//#
const handleLikeButton = evt => {
  if (evt.target.classList.contains('element__like')) {
    const currentCard = evt.target.closest('.element');
    const likeValue = currentCard.querySelector('.element__like-value');

    if (evt.target.classList.contains('element__like_active')) {
      removeLikeFromServer(currentCard.id)
        .then(res => {
          likeValue.textContent = res.likes.length;
          evt.target.classList.remove('element__like_active');
        })
        .catch(res => console.error(res));

      evt.target.classList.remove('element__like_active');
    } else {
      addLikeToServer(currentCard.id)
        .then(res => {
          likeValue.textContent = res.likes.length;
          evt.target.classList.add('element__like_active');
        })
        .catch(res => console.error(res));
    }
  }
};

document.addEventListener('click', handleLikeButton);

//#
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('click', handleButtonClose);
  document.addEventListener('mousedown', handleOverlayClose);
  document.addEventListener('keydown', handleEscKeyboard);
};

const closePopup = () => {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('click', handleButtonClose);
  document.removeEventListener('mousedown', handleOverlayClose);
  document.removeEventListener('keydown', handleEscKeyboard);
  if (openedPopup.id !== 'popupImage') {
    setTimeout(resetForm, 300, openedPopup);
  }
};

//#
buttonPopupAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
});

buttonPopupProfile.addEventListener('click', () => {
  inputProfileName.value = profileTitle.textContent;
  inputProfileAboutSelf.value = profileSubtitle.textContent;
  openPopup(popupProfile);
});

buttonPopupPlace.addEventListener('click', () => {
  openPopup(popupPlace);
});

//#
const formAvatar = document.forms.formAvatar;
const formProfile = document.forms.formProfile;
const formPlace = document.forms.formPlace;

const loadingIsProcess = evt => {
  const buttonSubmit = evt.target.querySelector('.popup__button-save');
  buttonSubmit.textContent = 'Сохранение...';
};

const loadingIsEnd = evt => {
  const buttonSubmit = evt.target.querySelector('.popup__button-save');
  buttonSubmit.textContent = 'Сохранить';
};

//#
const submitFormAvatar = evt => {
  evt.preventDefault();
  loadingIsProcess(evt);
  patchAvatar(inputAvatarUrl)
    .then(() => {
      profileAvatar.src = inputAvatarUrl.value;
      closePopup();
    })
    .catch(res => console.error(res))
    .finally(() => {
      setTimeout(loadingIsEnd, 300, evt);
    });
};

formAvatar.addEventListener('submit', submitFormAvatar);

//#
const submitFormProfile = evt => {
  evt.preventDefault();
  loadingIsProcess(evt);
  patchProfile(inputProfileName, inputProfileAboutSelf)
    .then(() => {
      profileTitle.textContent = inputProfileName.value;
      profileSubtitle.textContent = inputProfileAboutSelf.value;
      closePopup();
    })
    .catch(res => console.error(res))
    .finally(() => {
      setTimeout(loadingIsEnd, 300, evt);
    });
};

formProfile.addEventListener('submit', submitFormProfile);

//#

//#
const createCard = cardObject => {
  const cardTemplate = document.querySelector('#elementTemplate').content;
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  const newcardTitle = newCard.querySelector('.element__title');
  const newcardImage = newCard.querySelector('.element__image');
  const newCardLike = newCard.querySelector('.element__like');
  const newcardLikeValue = newCard.querySelector('.element__like-value');
  newcardTitle.textContent = cardObject.name;
  newcardImage.src = cardObject.link;
  newcardImage.alt = cardObject.name;
  newcardLikeValue.textContent = cardObject.likes.length;
  newCard.id = cardObject._id;

  if (profileId === cardObject.owner._id) {
    const newcardDeleteButton = newCard.querySelector('.element__delete-button');
    newcardDeleteButton.classList.remove('element__delete-button_off');
  }

  cardObject.likes.forEach(element => {
    if (profileId === element._id) {
      newCardLike.classList.add('element__like_active');
    }
  });

  return newCard;
};

//#
const elements = document.querySelector('.elements');

//#
const prependCardToDom = card => {
  const newCard = createCard(card);
  elements.prepend(newCard);
};

const appendCardToDom = card => {
  const newCard = createCard(card);
  elements.append(newCard);
};

//#
const submitFormPlace = evt => {
  evt.preventDefault();
  loadingIsProcess(evt);
  const newCard = {};
  newCard.name = inputPlaceName.value;
  newCard.link = inputPlaceUrl.value;
  addCardToServer(newCard)
    .then(res => {
      prependCardToDom(res);
      closePopup();
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setTimeout(loadingIsEnd, 300, evt);
    });
};

formPlace.addEventListener('submit', submitFormPlace);

//#
const popupPicture = document.querySelector('.popup__image');
const popupPicturecaption = document.querySelector('.popup__image-caption');

//#
const handleImageClick = evt => {
  if (evt.target.classList.contains('element__image')) {
    popupPicture.src = evt.target.src;
    popupPicture.alt = evt.target.src;
    popupPicturecaption.textContent = evt.target.alt;
    openPopup(popupImage);
  }
};

document.addEventListener('click', handleImageClick);
