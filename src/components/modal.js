import {
  popup,
  popupProfile,
  popupPlace,
  profileEditButton,
  profileCloseButton,
  placeAddButton,
  placeCloseButton,
  profileForm,
  profileTitle,
  profileName,
  profileSubtitle,
  profileAboutSelf,
  placeForm,
  placeName,
  placeUrl,
  popupImage,
  imageCloseButton,
} from './variables.js';

import {validationConfig, hideInputError, submitDisabled} from './validate.js';

// универсальная функция открытия любого модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// универсальная функция закрытия любого модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// универсальная функция - закрытие всех модальных окон
function closeAllPopup() {
  popup.forEach((popup) => {
    closePopup(popup);
  });
};

// событие - нажатие на кнопку ESC при любом открытом модальном окне
document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closeAllPopup()
  }
});

// событие - нажатие на кнопку вне модального окна
document.addEventListener('click', function(evt) {
  if (evt.path.length <= 5) {
    closeAllPopup()
  }
});

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

// нажатие на кнопку закрытия popupProfile
profileCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

// нажатие на кнопку submit profileForm
profileForm.addEventListener('submit', saveProfile);

// submit profileForm
function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileAboutSelf.value;
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

// нажатие на кнопку закрытия popupPlace
placeCloseButton.addEventListener('click', function () {
  closePopup(popupPlace);
});


// нажатие на кнопку закрытия popupImage
imageCloseButton.addEventListener('click', function () {
  closePopup(popupImage)
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