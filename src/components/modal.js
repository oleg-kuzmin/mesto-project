import {
  popups,
  popupProfile,
  popupPlace,
  profileEditButton,
  placeAddButton,
  profileForm,
  profileTitle,
  profileName,
  profileSubtitle,
  profileAboutSelf,
  placeForm,
  placeName,
  placeUrl,
  popupAvatar,
  avatarForm,
  avatarUrl,
  avatarEditButton,
  avatarImage
} from './variables.js';

import {validationConfig, hideInputError, submitDisabled} from './validate.js';
import {prependCard} from './card.js';
import {patchProfile, patchAvatar} from './api.js';

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
  const buttonElement = popupProfile.querySelector('.popup__button-save');
  submitDisabled(buttonElement, validationConfig.buttonElementDisabledName);
  openPopup(popupProfile);
});

// нажатие на кнопку редактирования popupAvatar
avatarEditButton.addEventListener('click', function () {
  avatarUrl.value = '';
  hideInputError(avatarForm, avatarUrl, validationConfig.inputTypeErrorName, validationConfig.errorElementActiveName);
  const buttonElement = popupAvatar.querySelector('.popup__button-save');
  submitDisabled(buttonElement, validationConfig.buttonElementDisabledName);
  openPopup(popupAvatar);
});

// нажатие на кнопку submit avatarForm
avatarForm.addEventListener('submit', saveAvatar);

// submit avatarForm
function saveAvatar(evt) {
  evt.preventDefault();
  patchAvatar().then(()=> {
    avatarImage.src = avatarUrl.value;
  })
  closePopup(popupAvatar);
}

// нажатие на кнопку submit profileForm
profileForm.addEventListener('submit', saveProfile);

// submit profileForm
function saveProfile(evt) {
  evt.preventDefault();
  patchProfile().then(()=> {
    profileTitle.textContent = profileName.value;
    profileSubtitle.textContent = profileAboutSelf.value;
  })
  closePopup(popupProfile);
}

// нажатие на кнопку открытия popupPlace
placeAddButton.addEventListener('click', function () {
  placeName.value = '';
  placeUrl.value = '';
  hideInputError(popupPlace, placeName, validationConfig.inputTypeErrorName, validationConfig.errorElementActiveName);
  hideInputError(popupPlace, placeUrl, validationConfig.inputTypeErrorName, validationConfig.errorElementActiveName);
  const buttonElement = popupPlace.querySelector('.popup__button-save');
  submitDisabled(buttonElement, validationConfig.buttonElementDisabledName);
  openPopup(popupPlace);
});

// нажатие на кнопку submit placeForm
placeForm.addEventListener('submit', savePlace);

// submit placeForm
function savePlace(evt) {
  evt.preventDefault();
  const item = {};
  item['placeName'] = placeName.value;
  item['placeUrl'] = placeUrl.value;
  prependCard(item);
  evt.target.reset();
  closePopup(popupPlace);
};

export {openPopup, closePopup};