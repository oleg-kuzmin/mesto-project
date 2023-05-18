import '../styles/index.css';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo';
import PageVisibility from '../utils/PageVisibility';
import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';
import {
  buttonPopupAvatar,
  buttonPopupProfile,
  buttonPopupPlace,
  profileAvatar,
  inputProfileName,
  inputProfileAboutSelf,
} from '../utils/variables';

//# создаем экземпляр класса Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: '79f162b1-a586-4458-ae35-5979e9a8f77a',
    'Content-Type': 'application/json',
  },
});

//# создаем экземпляр класса UserInfo
const userInfo = new UserInfo({
  selectorUserName: 'profile__title',
  selectorUserProfession: 'profile__subtitle',
  selectorUserAvatar: 'profile__avatar',
});

//# создаем экземпляр класса PageVisibility
const pageVisibility = new PageVisibility({
  selectorPage: 'page',
  selectorOpenClass: 'page_opened',
});

//# создаем экземпляр класса FormValidator
const formValidator = new FormValidator({
  selectorButtonSubmit: 'popup__button-save',
  selectorButtonSubmitInvalid: 'popup__button-save_disabled',
  selectorInput: 'popup__input',
  selectorInputInvalid: 'popup__input_type_error',
  selectorSpanInvalid: 'popup__input-error_active',
  selectorForm: 'popup__form',
  pattern: /^([а-яА-ЯёЁa-zA-Z]|\s|-|\n)+$/,
  patternMessage: 'Допустимы только латинские буквы, кириллические буквы, знаки дефиса или пробелы',
});

//# создаем экземпляр класса PopupWidthForm (Avatar)
const popupAvatar = new PopupWithForm({
  idPopup: 'popupAvatar',
  selectorOpenClass: 'popup_opened',
  selectorForm: 'popup__form',
  callbackApiSubmitForm: objectInputValues => {
    popupAvatar.loading('Сохранение...');
    api
      .patchAvatar(objectInputValues.avatarUrl)
      .then(response => {
        userInfo.setUserAvatar(response.avatar);
        // profileAvatar.src = response.avatar;
        popupAvatar.close();
      })
      .catch(response => console.error(response))
      .finally(() => {
        setTimeout(() => {
          popupAvatar.loading('Сохранить');
        }, 300);
      });
  },
});

//# создаем экземпляр класса PopupWidthForm (Profile)
const popupProfile = new PopupWithForm({
  idPopup: 'popupProfile',
  selectorOpenClass: 'popup_opened',
  selectorForm: 'popup__form',
  callbackApiSubmitForm: objectInputValues => {
    popupProfile.loading('Сохранение...');
    api
      .patchProfile(objectInputValues.profileName, objectInputValues.profileAboutSelf)
      .then(response => {
        userInfo.setUserInfo(response.name, response.about);
        popupProfile.close();
      })
      .catch(response => console.error(response))
      .finally(() => {
        setTimeout(() => {
          popupProfile.loading('Сохранить');
        }, 300);
      });
  },
});

//# задаем переменную, чтобы потом присвоить ей id
let userId;

//# включаем валидацию всей страницы
formValidator.enableValidation();

//# получаем все необходимые промисы (данные профиля и карточек)
Promise.all([api.getProfile(), api.getAllCardsFromServer()]) // делаем 2 fetchа
  .then(([objectUser, arrayCards]) => {
    userInfo.getUserInfo(objectUser); // получаем информацию о пользователе
    userId = objectUser._id; // запоминаем id для дальнейшего использования
    //* cards.forEach(appendCardToDom); проходим по массиву cards колбеком, добавляющим карточки на страницу
    pageVisibility.showPage(); // теперь страницу можно отображать
  })
  .catch(err => {
    console.error(err); // отображем ошибку если не получили данные
  });

//# функция для обработчика - нажатие на аватар
const handlePopupAvatar = () => {
  formValidator.resetForm(popupAvatar.form);
  popupAvatar.open();
};

//# функция для обработчика - нажатие на профиль
const handlePopupProfile = () => {
  formValidator.resetForm(popupProfile.form);
  userInfo.changeInputUserInfo(inputProfileName, inputProfileAboutSelf);
  popupProfile.open();
};

//# устанавливаем слушатели
buttonPopupAvatar.addEventListener('click', handlePopupAvatar);
buttonPopupProfile.addEventListener('click', handlePopupProfile);
// buttonPopupPlace.addEventListener('click', handlePopupPlace);
