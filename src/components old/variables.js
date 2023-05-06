const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector('#popup-profile');
const profileForm = document.querySelector('#popup__form-profile');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileTitle = document.querySelector('.profile__title');
const profileName = document.querySelector('#profileName');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAboutSelf = document.querySelector('#profileAboutSelf');
const profileSubmitButton = document.querySelector('#profileSubmitButton');

const popupPlace = document.querySelector('#popup-place');
const placeForm = document.querySelector('#popup__form-place');
const placeAddButton = document.querySelector('.profile__add-button');
const placeName = document.querySelector('#placeName');
const placeUrl = document.querySelector('#placeUrl');
const placeSubmitButton = document.querySelector('#placeSubmitButton');

const popupAvatar = document.querySelector('#popup-avatar');
const avatarForm = document.querySelector('#popup__form-avatar')
const avatarUrl = document.querySelector('#avatarUrl');
const avatarEditButton = document.querySelector('.profile__avatar-edit');
const avatarImage = document.querySelector('.profile__avatar');
const avatarSubmitButton = document.querySelector('#avatarSubmitButton');

const popupImage = document.querySelector('#popup-image');  
const popupImageFigure = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#elementTemplate').content;

export {
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
  elements,
  elementTemplate
};