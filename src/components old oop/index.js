import '../styles/index.css';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithImage from '../components/PopupWithImage';
import FormValidator from '../components/FormValidator';
import Card from '../components/Card';
import Section from '../components/Section';

import {
  profileName,
  profileContactInfo,
  profileEditButton,
  profileNameEdit,
  contactInfoEdit,
  profileAvatarButton,
  validationConfig,
  profileAddButton,
} from '../utils/constants';

export let userId = '';

// запуск валидации полей
const formProfileEdit = new FormValidator({ validationConfig }, document.forms.profile_edit);
formProfileEdit.enableValidation();

const formAvatarEdit = new FormValidator({ validationConfig }, document.forms.profile_avatar_edit);
formAvatarEdit.enableValidation();

const formAddCard = new FormValidator({ validationConfig }, document.forms.add_card);
formAddCard.enableValidation();

export const api = new Api({
  url: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: 'f6f0e19f-3261-436f-8b67-2b9918fd933f',
    'Content-Type': 'application/json',
  },
});

const userInfo = new UserInfo({
  selectorUserName: '.profile__name',
  selectorAboutSelf: '.profile__contact-info',
  selectorAvatar: '.profile__image',
});

const cardList = new Section(
  {
    items: [],
    renderer: item => {
      const card = new Card(item, '#card-template', userId, {
        // Удаление карточки с сервера
        removeCardToServer: cardId => {
          api
            .removeCardToServer(cardId)
            .then(() => {
              card.deleteCard();
            })
            .catch(err => {
              console.log(err);
            });
        },

        // Удаление лайка на сервер
        removeLikeToServer: cardId => {
          api
            .removeLike(cardId)
            .then(data => {
              card.removeLike(data.likes.length);
            })
            .catch(err => {
              console.log(err);
            });
        },

        // Добавление лайка на сервер
        addLikeToServer: cardId => {
          api
            .addLike(cardId)
            .then(data => {
              card.addLike(data.likes.length);
            })
            .catch(err => {
              console.log(err);
            });
        },

        // Открытие попапа с картинкой
        openPopupImage: (name, link) => {
          popupWithImage.open(name, link);
        },
      });
      return card.generateCard();
    },
  },
  '.cards__content'
);

// загружаем профиль и карточки с сервера
Promise.all([api.getProfileInformation(), api.getCardsArray()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.changeUserInfo(userData.name, userData.about);
    userInfo.changeUserAvatar(userData.avatar);
    cardList.renderItems(cards, 'append');
  })
  .catch(err => {
    console.log(`Ошибка: ${err.message}`);
  });

// popupWithImage
const popupWithImage = new PopupWithImage('#popup_image', '.popup__heading_place_image', '.popup__image');

// popupWithFormAvatar
const popupWithFormAvatar = new PopupWithForm({
  popupId: '#popup_avatar',
  callback: avatar => {
    popupWithFormAvatar.renderLoading(true);
    api
      .editProfileAvatar({ avatar: avatar.profile_image })
      .then(() => {
        userInfo.changeUserAvatar(avatar.profile_image);
        popupWithFormAvatar.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => popupWithFormAvatar.renderLoading(false, 'Сохранить'));
  },
});

// popupWithFormProfile
const popupWithFormProfile = new PopupWithForm({
  popupId: '#popup_profile',
  callback: user => {
    popupWithFormProfile.renderLoading(true);
    api
      .editProfileInformation({
        name: user.profile_name,
        about: user.contact_info,
      })
      .then(() => {
        userInfo.changeUserInfo(user.profile_name, user.contact_info);
        popupWithFormProfile.close();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => popupWithFormProfile.renderLoading(false, 'Сохранить'));
  },
});

// popupWithFormCard
const popupWithFormCard = new PopupWithForm({
  popupId: '#popup_card',
  callback: data => {
    popupWithFormCard.renderLoading(true);
    api
      .addCardToServer({ link: data.place_adres, name: data.place_name })
      .then(data => {
        cardList.renderItems([data]);
        popupWithFormCard.close();
      })
      .catch(err => {
        console.log(`Ошибка: ${err.message}`);
      })
      .finally(() => popupWithFormCard.renderLoading(false, 'Создать'));
  },
});

// слушатель - нажатие на кнопку открытия редактирования аватара
profileAvatarButton.addEventListener('click', () => {
  formAvatarEdit.resetValidation();
  popupWithFormAvatar.open();
});

// слушатель - нажатие на кнопку открытия редактирования профиля
profileEditButton.addEventListener('click', () => {
  profileNameEdit.value = profileName.textContent;
  contactInfoEdit.value = profileContactInfo.textContent;
  formProfileEdit.resetValidation();
  popupWithFormProfile.open();
});

// слушатель - нажатие на кнопку открытия создания места
profileAddButton.addEventListener('click', () => {
  formAddCard.resetValidation();
  popupWithFormCard.open();
});

console.log();
