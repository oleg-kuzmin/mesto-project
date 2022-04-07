const popups = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#popup-profile');
const popupPlace = document.querySelector('#popup-place');
const profileEditButton = document.querySelector('.profile__edit-button');
const placeAddButton = document.querySelector('.profile__add-button');
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
const popupImageFigure = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');
const popupAvatar = document.querySelector('#popup-avatar');
const avatarForm = document.querySelector('#popup__form-avatar')
const avatarUrl = document.querySelector('#avatarUrl');
const avatarEditButton  = document.querySelector('.profile__avatar-edit');
const avatarImage = document.querySelector('.profile__avatar');

export {
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
  elements,
  elementTemplate,
  placeForm,
  placeName,
  placeUrl,
  popupImage,
  popupImageFigure,
  popupImageCaption,
  popupAvatar,
  avatarForm,
  avatarUrl,
  avatarEditButton,
  avatarImage
};