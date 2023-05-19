import '../styles/index.css';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo';
import PageVisibility from '../components/PageVisibility';
import PopupWithForm from '../components/PopupWithForm';
import FormValidator from '../components/FormValidator';
import Card from '../components/Card';
import Section from '../components/Section';
import {
  buttonPopupAvatar,
  buttonPopupProfile,
  buttonPopupPlace,
  inputProfileName,
  inputProfileAboutSelf,
  deleteCardConfirm,
  popupPicture,
  popupPicturecaption,
} from '../utils/variables';
import Popup from '../components/Popup';

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

//# PageVisibility (засунуть в компоненты?)
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

//# Card
const card = new Card({
  idTemplate: 'elementTemplate',
  selectorCardElement: 'element',
  selectorCardTitle: 'element__title',
});

//# Section
const section = new Section({
  selectorContainer: 'elements',
  selectorAnimationPreped: 'animation__backInDown',
  selectorAnimationDelete: 'animation__fadeOut',
});

//# задаем переменную, чтобы потом присвоить ей id
let userId;

//# включаем валидацию всех форм
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

//# Popup (Delete)
const popupDelete = new Popup({
  idPopup: 'popupDelete',
  selectorOpenClass: 'popup_opened',
});

//# Popup (Image)
const popupImage = new Popup({
  idPopup: 'popupImage',
  selectorOpenClass: 'popup_opened',
});

//# PopupWithForm (Avatar)
const popupAvatar = new PopupWithForm({
  idPopup: 'popupAvatar',
  selectorOpenClass: 'popup_opened',
  selectorForm: 'popup__form',
  callbackApiSubmitForm: objectInputValues => {
    popupAvatar.loading('Сохранение...');
    api
      .patchAvatar(objectInputValues)
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

//# PopupWithForm (Profile)
const popupProfile = new PopupWithForm({
  idPopup: 'popupProfile',
  selectorOpenClass: 'popup_opened',
  selectorForm: 'popup__form',
  callbackApiSubmitForm: objectInputValues => {
    popupProfile.loading('Сохранение...');
    api
      .patchProfile(objectInputValues)
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

//# PopupWithForm (Mesto)
const popupPlace = new PopupWithForm({
  idPopup: 'popupPlace',
  selectorOpenClass: 'popup_opened',
  selectorForm: 'popup__form',
  callbackApiSubmitForm: objectInputValues => {
    popupPlace.loading('Сохранение...');
    const cardElement = {};
    cardElement.name = objectInputValues.placeName;
    cardElement.link = objectInputValues.placeUrl;
    api
      .addCardToServer(cardElement)
      .then(response => {
        const newCard = card.generateCard(response, userId);
        section.prependCardToDom(newCard);
        popupPlace.close();
      })
      .catch(response => console.error(response))
      .finally(() => {
        setTimeout(() => {
          popupPlace.loading('Создать');
        }, 300);
      });
  },
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

//# функция для обработчика - нажатие на корзинку
const handleDeleteButton = evt => {
  if (
    evt.target.classList.contains('element__delete-button') &&
    !evt.target.classList.contains('element__delete-button_off')
  ) {
    const currentCard = evt.target.closest('.element');
    popupDelete.open();
    deleteCardConfirm.addEventListener(
      'click',
      () => {
        api
          .removeCardFromServer(currentCard.id)
          .then(() => {
            popupDelete.close();
            section.deleteCard(currentCard);
            setTimeout(() => {
              currentCard.remove();
            }, 700);
          })
          .catch(response => console.error(response));
      },
      { once: true }
    );
    document.addEventListener(
      'keydown',
      evt => {
        if (evt.key === 'Enter') {
          api
            .removeCardFromServer(currentCard.id)
            .then(() => {
              popupDelete.close();
              section.deleteCard(currentCard);
              setTimeout(() => {
                currentCard.remove();
              }, 700);
            })
            .catch(response => console.error(response));
        }
      },
      { once: true }
    );
  }
};

//# функция для обработчика - нажатие на лайк
const handleLikeButton = evt => {
  if (evt.target.classList.contains('element__like')) {
    const currentCard = evt.target.closest('.element');
    const likeValue = currentCard.querySelector('.element__like-value');
    if (evt.target.classList.contains('element__like_active')) {
      api
        .removeLikeFromServer(currentCard.id)
        .then(responce => {
          likeValue.textContent = responce.likes.length;
          evt.target.classList.remove('element__like_active');
        })
        .catch(err => console.error(err));
    } else {
      api
        .addLikeToServer(currentCard.id)
        .then(responce => {
          likeValue.textContent = responce.likes.length;
          evt.target.classList.add('element__like_active');
        })
        .catch(err => console.error(err));
    }
  }
};

//# функция для обработчика - нажатие на картинку
const handlePopupImage = evt => {
  if (evt.target.classList.contains('element__image')) {
    popupPicture.src = evt.target.src;
    popupPicture.alt = evt.target.src;
    popupPicturecaption.textContent = evt.target.alt;
    popupImage.open();
  }
};

//# устанавливаем слушатели
buttonPopupAvatar.addEventListener('click', handlePopupAvatar);
buttonPopupProfile.addEventListener('click', handlePopupProfile);
buttonPopupPlace.addEventListener('click', handlePopupPlace);
document.addEventListener('click', handlePopupImage);
document.addEventListener('click', handleDeleteButton);
document.addEventListener('click', handleLikeButton);
