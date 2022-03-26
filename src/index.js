import addButton from './images/add-button.svg';
import closeIcon from './images/close-icon.svg';
import deleteButton from './images/delete-button.svg';
import custo from './images/custo.jpg';
import likeActive from './images/like_active.svg';
import like from './images/like.svg';
import logo from './images/logo.svg';
import vector from './images/vector.svg';
const allImages = [
  { name: 'addButton', image: addButton },
  { name: 'closeIcon', image: closeIcon },
  { name: 'deleteButton', image: deleteButton },
  { name: 'custo', image: custo },
  { name: 'likeActive', image: likeActive },
  { name: 'like', image: like },
  { name: 'logo', image: logo },
  { name: 'vector', image: vector },
];

import './pages/index.css';

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
  profileName.value =  profileTitle.textContent;
  profileAboutSelf.value = profileSubtitle.textContent;
  hideInputError(popupProfile, profileName);
  hideInputError(popupProfile, profileAboutSelf);
  const buttonElement = popupProfile.querySelector('.popup__button-save');
  submitDisabled(buttonElement);
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
const profileName = document.querySelector('#profileName');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAboutSelf = document.querySelector('#profileAboutSelf');

// нажатие на кнопку submit profileForm
profileForm.addEventListener('submit', saveProfile);

// submit profileForm
function saveProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileName.value;
  profileSubtitle.textContent = profileAboutSelf.value;
  closePopup(popupProfile);
}

// модальное окно popupPlace
const popupPlace = document.querySelector('#popup-place');

// нажатие на кнопку открытия popupPlace
const placeAddButton = document.querySelector('.profile__add-button');
placeAddButton.addEventListener('click', function () {
  placeName.value = '';
  placeUrl.value = '';
  hideInputError(popupPlace, placeName);
  hideInputError(popupPlace, placeUrl);
  const buttonElement = popupPlace.querySelector('.popup__button-save');
  submitDisabled(buttonElement);
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

// универсальная функция - закрытие всех модальных окон
function closeAllPopup() {
  popup.forEach((popup) => {
    closePopup(popup);
  });
}

// событие - нажатие на кнопку ESC при открытом модальном окне
document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closeAllPopup()
  }
});

document.addEventListener('click', function(evt) {
  if (evt.path.length <= 5) {
    closeAllPopup()
  }
});

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');  
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');  
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция блокировки кнопки submit
function submitDisabled(buttonElement) {
  buttonElement.setAttribute("disabled", "disabled");
  buttonElement.classList.add('popup__button-save_disabled');
}

// Функция включения кнопки submit
function submitActive(buttonElement) {
  buttonElement.removeAttribute("disabled", "disabled");
  buttonElement.classList.remove('popup__button-save_disabled');
}

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    submitDisabled(buttonElement);
    // buttonElement.setAttribute("disabled", "disabled");
    // buttonElement.classList.add('popup__button-save_disabled');
  } else {
    submitActive(buttonElement);
        // иначе сделай кнопку активной
    // buttonElement.removeAttribute("disabled", "disabled");
    // buttonElement.classList.remove('popup__button-save_disabled');
  }
};

// Функция проверки всех полей формы
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция установки слушателей событий
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();