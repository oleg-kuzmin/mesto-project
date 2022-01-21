// модальное окно popupProfile
const popupProfile = document.querySelector('#popup-profile');

// функция открытия и закрытия popupProfile
function openPopupProfile() {
  popupProfile.classList.toggle('popup_opened');
};

// нажатие на кнопку открытия popupProfile
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', openPopupProfile);

// нажатие на кнопку закрытия popupProfile
const profileCloseButton = document.querySelector('#popup-profile-close');
profileCloseButton.addEventListener('click', openPopupProfile);

// форма profileForm
const profileForm = document.querySelector('#popup__form-profile');
const profileTitle = document.querySelector('.profile__title');
const profileName = document.querySelector('#profile-name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileJob = document.querySelector('#profile-job');

// submit profileForm
function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileJob.value;
  openPopupProfile();
}

// нажатие на кнопку submit profileForm
profileForm.addEventListener('submit', saveProfile);

// модальное окно добавления нового места
const popupMesto = document.querySelector('#popup-mesto');

// функция открытия и закрытия popupMesto
function openPopupMesto() {
  popupMesto.classList.toggle('popup_opened');
};

// нажатие на кнопку открытия popupMesto
const mestoAddButton = document.querySelector('.profile__add-button');
mestoAddButton.addEventListener('click', openPopupMesto);

// нажатие на кнопку закрытия popupMesto
const mestoCloseButton = document.querySelector('#popup-mesto-close');
mestoCloseButton.addEventListener('click', openPopupMesto);

// создание нового места
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#elementTemplate').content;
const mestoForm = document.querySelector('#popup__form-mesto');
const mestoName = document.querySelector('#mestoName');
const mestoUrl = document.querySelector('#mestoUrl');

// стартовый набор карточек
let initialCards = [
  {
    mestoName: 'Архыз',
    mestoUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    mestoName: 'Челябинская область',
    mestoUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    mestoName: 'Иваново',
    mestoUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    mestoName: 'Камчатка',
    mestoUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    mestoName: 'Холмогорский район',
    mestoUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    mestoName: 'Байкал',
    mestoUrl: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

// модальное окно открытия картинки
const popupImage = document.querySelector('#popup-image');  
const imageCloseButton = document.querySelector('#popup-image-close');

// функция открытия и закрытия popupImage
function openPopupImage() {
  popupImage.classList.toggle('popup_opened');
}

// нажатие на кнопку закрытия popupImage
imageCloseButton.addEventListener('click', openPopupImage);

// функция создания нового места
function createMesto(item) {
  const elementNew = elementTemplate.querySelector('.element').cloneNode(true);
  elementNew.querySelector('.element__title').textContent = item['mestoName'];
  elementNew.querySelector('.element__image').src = item['mestoUrl'];
  elements.prepend(elementNew);

  // функция нажатия на кнопку лайка
  elementNew.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active')
  });

  // функция нажатия на кнопку удаления
  elementNew.querySelector('.element__delete-button').addEventListener('click', function () {
    elementNew.remove();
    item['mestoName'] = '';
    item['mestoUrl'] = '';
    initialCards = initialCards.filter((item) => {return item['mestoUrl'] !== ''});
  });

  // функция нажатия на картинку
  elementNew.querySelector('.element__image').addEventListener('click', function () {
    openPopupImage();
    popupImage.querySelector('.popup__image').src = elementNew.querySelector('.element__image').src;
  });
}

// функция добавления всех стартовых карточек
initialCards.forEach(function(item) {
  createMesto(item);
});

// нажатие на кнопку отправки mestoForm
mestoForm.addEventListener('submit', (evt) => { 
  evt.preventDefault();
  initialCards.push({'mestoName': mestoName.value, 'mestoUrl' : mestoUrl.value});
  createMesto(initialCards[initialCards.length - 1]);
  evt.target.reset();
  openPopupMesto();
});