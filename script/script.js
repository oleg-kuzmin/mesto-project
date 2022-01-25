// объявляем все модальные окна
const popup = document.querySelectorAll('.popup')

// универсальная функция открытия любого модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//универсальная функция закрытия любого модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// модальное окно popupProfile
const popupProfile = document.querySelector('#popup-profile');

// нажатие на кнопку открытия popupProfile
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function () {
  openPopup(popupProfile);
});

// нажатие на кнопку закрытия popupProfile
const profileCloseButton = document.querySelector('#popup-profile-close');
profileCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

// форма profileForm
const profileForm = document.querySelector('#popup__form-profile');
const profileTitle = document.querySelector('.profile__title');
const profileName = document.querySelector('#profile-name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileJob = document.querySelector('#profile-job');

// нажатие на кнопку submit profileForm
profileForm.addEventListener('submit', saveProfile);

// submit profileForm
function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileJob.value;
  closePopup(popupProfile);
}

// модальное окно popupPlace
const popupPlace = document.querySelector('#popup-place');

// нажатие на кнопку открытия popupPlace
const placeAddButton = document.querySelector('.profile__add-button');
placeAddButton.addEventListener('click', function () {
  openPopup(popupPlace);
});

// нажатие на кнопку закрытия popupPlace
const placeCloseButton = document.querySelector('#popup-place-close');
placeCloseButton.addEventListener('click', function () {
  closePopup(popupPlace);
});

// создание нового места
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#elementTemplate').content;
const placeForm = document.querySelector('#popup__form-place');
const placeName = document.querySelector('#placeName');
const placeUrl = document.querySelector('#placeUrl');

// модальное окно popupImage
const popupImage = document.querySelector('#popup-image');  
const imageCloseButton = document.querySelector('#popup-image-close');
const popupImageFigure = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');

// нажатие на кнопку закрытия popupImage
imageCloseButton.addEventListener('click', function () {
  closePopup(popupImage)});

// функция создания карточки
function createCard(item) {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  cardElement.querySelector('.element__title').textContent = item['placeName'];
  cardImage.src = item['placeUrl'];
  cardImage.alt = item['placeName'];
  // обработчик - функция нажатия на кнопку лайка
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active')
  });
  // обработчик - функция нажатия на кнопку удаления
  cardElement.querySelector('.element__delete-button').addEventListener('click', function () {
    cardElement.remove();
  });
  // обработчик - функция нажатия на картинку
  cardImage.addEventListener('click', function () {
    openPopup(popupImage);
    popupImageFigure.src = cardImage.src;
    popupImageFigure.alt = cardImage.alt;
    popupImageCaption.textContent = item['placeName'];
  });
  return cardElement
};

// функция добавления новой карточки в DOM
function prependCard(item) {
  const newElement = createCard(item)
  elements.prepend(newElement);
};

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

// стартовый набор карточек
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

// добавление всех стартовых карточек
initialCards.forEach(prependCard);