import {
  profileEditButton,
  popupProfile,
  profileAvatarEdit,
  popupAvatar,
  profileAddButton,
  popupPlace,
  profileTitle,
  profileSubtitle,
  profileName,
  profileAboutSelf,
  popupFormProfile,
  profileSubmitButton,
} from './variables.js';

import { checkInputValidity, disableButtonSubmit } from './validate.js';
import { patchProfile } from './api.js';

const openModal = (modal) => {
  modal.classList.add('popup_opened');
};

const closeModal = () => {
  const openedModal = document.querySelector('.popup_opened');
  openedModal.classList.remove('popup_opened');
  removeListenerAfterCloseModal();
};

const addListenerAfterOpenModal = () => {
  document.addEventListener('click', handleButtonClose);
  document.addEventListener('mousedown', handleOverlayClose);
};

const removeListenerAfterCloseModal = () => {
  document.removeEventListener('click', handleButtonClose);
  document.removeEventListener('mousedown', handleOverlayClose);
};

const handleButtonClose = (evt) => {
  if (evt.target.classList.contains('popup__button-close')) {
    closeModal();
  }
};

const handleOverlayClose = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closeModal();
  }
};

profileEditButton.addEventListener('click', () => {
  profileName.value = profileTitle.textContent;
  profileAboutSelf.value = profileSubtitle.textContent;
  checkInputValidity(popupFormProfile, profileName);
  checkInputValidity(popupFormProfile, profileAboutSelf);
  disableButtonSubmit(profileSubmitButton);
  openModal(popupProfile);
  addListenerAfterOpenModal();
});

profileAvatarEdit.addEventListener('click', () => {
  openModal(popupAvatar);
  addListenerAfterOpenModal();
});

profileAddButton.addEventListener('click', () => {
  openModal(popupPlace);
  addListenerAfterOpenModal();
});

popupFormProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  patchProfile()
    .then(() => {
      console.log('Успешно');
    })
    .catch((err) => {
      console.log(err);
    });
});

export { openModal, closeModal };
