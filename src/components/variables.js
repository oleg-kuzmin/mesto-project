const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-place');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('#popup-profile-close');
const placeAddButton = document.querySelector('.profile__add-button');
const placeCloseButton = document.querySelector('#popup-place-close');
const profileForm = document.querySelector('#popup__form-profile');
const profileTitle = document.querySelector('.profile__title');
const profileName = document.querySelector('#profileName');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAboutSelf = document.querySelector('#profileAboutSelf');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#elementTemplate').content;
const placeForm = document.querySelector('#popup__form-place');
const placeName = document.querySelector('#placeName');
const placeUrl = document.querySelector('#placeUrl');
const popupImage = document.querySelector('#popup-image');  
const imageCloseButton = document.querySelector('#popup-image-close');
const popupImageFigure = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');
const initialCards = [
  {
    placeName: 'Архыз',
    placeUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    placeName: 'Челябинская область',
    placeUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    placeName: 'Иваново',
    placeUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    placeName: 'Камчатка',
    placeUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    placeName: 'Холмогорский район',
    placeUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    placeName: 'Байкал',
    placeUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export {
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
  elements,
  elementTemplate,
  placeForm,
  placeName,
  placeUrl,
  popupImage,
  imageCloseButton,
  popupImageFigure,
  popupImageCaption,
  initialCards
};