import '../styles/index.css';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo';
import PageVisibility from '../utils/PageVisibility';
import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';
import Card from '../components/Card';
import Section from '../components/Section';
import { buttonPopupAvatar, buttonPopupProfile, buttonPopupPlace, inputProfileName, inputProfileAboutSelf } from '../utils/variables';

//# Api
const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: '79f162b1-a586-4458-ae35-5979e9a8f77a',
    'Content-Type': 'application/json',
  },
});

//# UserInfo
const userInfo = new UserInfo({
  selectorUserName: 'profile__title',
  selectorUserProfession: 'profile__subtitle',
  selectorUserAvatar: 'profile__avatar',
});

//# PageVisibility
const pageVisibility = new PageVisibility({
  selectorPage: 'page',
  selectorOpenClass: 'page_opened',
});

//# FormValidator
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

//# PopupWidthForm (Avatar)
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

//# PopupWidthForm (Profile)
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

//# PopupWidthForm (Mesto)
const popupPlace = new PopupWithForm({
  idPopup: 'popupPlace',
  selectorOpenClass: 'popup_opened',
  selectorForm: 'popup__form',
  callbackApiSubmitForm: objectInputValues => {
    console.log(objectInputValues);
  },
});

//# Section
const section = new Section({
  selectorContainer: 'elements',
  prepedAnimationClass: 'animation__backInDown',
});

//# Card
const card = new Card({
  idTemplate: 'elementTemplate',
  selectorCardElement: 'element',
  selectorCardTitle: 'element__title',
});

//# задаем переменную, чтобы потом присвоить ей id
let userId;

//# включаем валидацию всей страницы
formValidator.enableValidation();

//# получаем все необходимые промисы (данные профиля и карточек)
Promise.all([api.getProfile(), api.getAllCardsFromServer()])
  .then(([objectUser, arrayCards]) => {
    userInfo.getUserInfo(objectUser);
    userId = objectUser._id;

    arrayCards.forEach(item => {
      const newCard = card.generateCard(item, userId);
      section.appendCardToDom(newCard);
    });

    pageVisibility.showPage();
  })
  .catch(err => {
    console.error(err);
  });

//# функция для обработчика - нажатие на аватар
const handlePopupAvatar = () => {
  formValidator.resetForm(popupAvatar.form);
  popupAvatar.open();
};

//# функция для обработчика - нажатие на кнопку редактирования профиля
const handlePopupProfile = () => {
  formValidator.resetForm(popupProfile.form);
  userInfo.changeInputUserInfo(inputProfileName, inputProfileAboutSelf);
  popupProfile.open();
};

//# функция для обработчика - нажатие на кнопку создания нового места
const handlePopupPlace = () => {
  formValidator.resetForm(popupPlace.form);
  popupPlace.open();
};

//# устанавливаем слушатели
buttonPopupAvatar.addEventListener('click', handlePopupAvatar);
buttonPopupProfile.addEventListener('click', handlePopupProfile);
buttonPopupPlace.addEventListener('click', handlePopupPlace);
