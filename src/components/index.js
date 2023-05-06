import '../pages/index.css';
import { getProfile } from '../components/api';
import { enableValidation } from '../components/validate';

//# 1
let profileId;
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');

//# 2
enableValidation();

//# 2
const showPage = () => {
  const page = document.querySelector('.page');
  page.classList.remove('page_disabled');
};

//# 3
getProfile()
  .then((res) => {
    profileTitle.textContent = res.name;
    profileSubtitle.textContent = res.about;
    profileAvatar.src = res.avatar;
    profileId = res._id;
    showPage();
  })
  .catch((err) => {
    console.error(err);
  });

//# 4
const buttonPopupAvatar = document.querySelector('.profile__avatar-edit');
const buttonPopupProfile = document.querySelector('.profile__edit-button');
const buttonPopupPlace = document.querySelector('.profile__add-button');

const popupAvatar = document.querySelector('#popupAvatar');
const popupProfile = document.querySelector('#popupProfile');
const popupPlace = document.querySelector('#popupPlace');
const popupImage = document.querySelector('#popupImage');



//# 5
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('click', handleButtonClose);
  document.addEventListener('mousedown', handleOverlayClose);
};

const closePopup = () => {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('click', handleButtonClose);
  document.removeEventListener('mousedown', handleOverlayClose);
};

//# 6
buttonPopupAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
});

buttonPopupProfile.addEventListener('click', () => {
  openPopup(popupProfile);
});

buttonPopupPlace.addEventListener('click', () => {
  openPopup(popupPlace);
});

//# 7
const handleButtonClose = (evt) => {
  if (evt.target.classList.contains('popup__button-close')) {
    closePopup();
  }
};

const handleOverlayClose = (evt) => {
  console.log(evt.target);
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
};

