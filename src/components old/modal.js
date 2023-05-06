import {
  popups,
  popupProfile,
  profileForm,
  profileEditButton,
  profileTitle,
  profileName,
  profileSubtitle,
  profileAboutSelf,
  profileSubmitButton,
  popupPlace,
  placeForm,
  placeAddButton,
  placeName,
  placeUrl,
  placeSubmitButton,
  popupAvatar,
  avatarForm,
  avatarUrl,
  avatarEditButton,
  avatarImage,
  avatarSubmitButton,
  popupImage,
  popupImageFigure,
  popupImageCaption,
} from './variables.js';

import {validationConfig, hideInputError, submitDisabled} from './validate.js';
import {prependCard} from './card.js';
import {patchProfile, patchAvatar, addCardToServer} from './api.js';

// обработчики - закрытие попапа при нажатии крестика или оверлея
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup);
      }
  })
})

// функция закрытия попапа при нажатии на Esc
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// универсальная функция открытия любого модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// универсальная функция закрытия любого модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// нажатие на кнопку редактирования popupProfile
profileEditButton.addEventListener('click', function () {
  profileName.value =  profileTitle.textContent;
  profileAboutSelf.value = profileSubtitle.textContent;
  hideInputError(profileForm, profileName, validationConfig.inputTypeErrorName, validationConfig.errorElementActiveName);
  hideInputError(profileForm, profileAboutSelf, validationConfig.inputTypeErrorName, validationConfig.errorElementActiveName);
  submitDisabled(profileSubmitButton, validationConfig.buttonElementDisabledName);
  openPopup(popupProfile);
});

// нажатие на кнопку редактирования popupAvatar
avatarEditButton.addEventListener('click', function () {
  avatarForm.reset();
  hideInputError(avatarForm, avatarUrl, validationConfig.inputTypeErrorName, validationConfig.errorElementActiveName);
  submitDisabled(avatarSubmitButton, validationConfig.buttonElementDisabledName);
  openPopup(popupAvatar);
});

// нажатие на кнопку submit avatarForm
avatarForm.addEventListener('submit', saveAvatar);

// submit avatarForm
function saveAvatar(evt) {
  evt.preventDefault();
  avatarSubmitButton.textContent = 'Сохранение...';
  patchAvatar()
  .then(()=> {
    avatarImage.src = avatarUrl.value;
    closePopup(popupAvatar);
  })
  .catch((err)=> {
    console.log(err);
  })
  .finally(()=> {
    avatarSubmitButton.textContent = 'Сохранить';
  })
}

// нажатие на кнопку submit profileForm
profileForm.addEventListener('submit', saveProfile);

// submit profileForm
function saveProfile(evt) {
  evt.preventDefault();
  profileSubmitButton.textContent = 'Сохранение...';
  patchProfile()
  .then(()=> {
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileAboutSelf.value;
    closePopup(popupProfile);
  })
  .catch((err)=> {
    console.log(err);
  })
  .finally(()=> {
    profileSubmitButton.textContent = 'Сохранить';
  })
}

// нажатие на кнопку открытия popupPlace
placeAddButton.addEventListener('click', function () {
  placeForm.reset();
  hideInputError(placeForm, placeName, validationConfig.inputTypeErrorName, validationConfig.errorElementActiveName);
  hideInputError(placeForm, placeUrl, validationConfig.inputTypeErrorName, validationConfig.errorElementActiveName);
  submitDisabled(placeSubmitButton, validationConfig.buttonElementDisabledName);
  openPopup(popupPlace);
});

// нажатие на кнопку submit placeForm
placeForm.addEventListener('submit', savePlace);

// submit placeForm
function savePlace(evt) {
  evt.preventDefault();
  placeSubmitButton.textContent = 'Сохранение...';
  const item = {};
  item.name = placeName.value;
  item.link = placeUrl.value;
  addCardToServer(item)
  .then((item)=> {
    prependCard(item);
    closePopup(popupPlace);
  })
  .catch((err)=> {
    console.log(err);
  })
  .finally(()=> {
    placeSubmitButton.textContent = 'Создать';
  })
};

// функция открытия попапа с картинкой
function openCardImage(cardImage) {
  openPopup(popupImage);
  popupImageFigure.src = cardImage.src
  popupImageFigure.alt = cardImage.alt;
  popupImageCaption.textContent = cardImage.alt;
}

export {openPopup, closePopup, openCardImage};