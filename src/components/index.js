import '../pages/index.css';
import { getProfile, getAllCardsFromServer, removeCardFromServer, addLikeToServer, removeLikeFromServer } from '../components/api';
import { enableValidation } from '../components/validate';
import {
  profileTitle,
  profileSubtitle,
  profileAvatar,
  buttonPopupAvatar,
  buttonPopupProfile,
  buttonPopupPlace,
  popupAvatar,
  popupProfile,
  popupPlace,
  popupImage,
  inputProfileName,
  inputProfileAboutSelf,
  formAvatar,
  formProfile,
  formPlace,
  popupPicture,
  popupPicturecaption,
  popupDelete,
  deleteCardConfirm,
} from '../components/variables';

import { appendCardToDom } from '../components/card';
import { openPopup, closePopup } from '../components/modal';
import { submitFormAvatar, submitFormProfile, submitFormPlace } from '../components/submit';

//# задаем переменную, чтобы потом присвоить ей id
let profileId;

//# включаем валидацию всей страницы
enableValidation();

//# функция показа страницы
const showPage = () => {
  const page = document.querySelector('.page');
  page.classList.remove('page_disabled');
};

//# получаем все необходимые промисы
Promise.all([getProfile(), getAllCardsFromServer()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileSubtitle.textContent = profile.about;
    profileAvatar.src = profile.avatar;
    profileId = profile._id;
    cards.forEach(appendCardToDom);
    showPage();
  })
  .catch(err => {
    console.error(err);
  });

//# функция для обработчика - нажатие на крестик
const handleButtonClose = evt => {
  if (evt.target.classList.contains('popup__button-close')) {
    closePopup();
  }
};

//# функция для обработчика - нажатие на оверлей
const handleOverlayClose = evt => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
};

//# функция для обработчика - нажатие на кнопку Escape
const handleEscKeyboard = evt => {
  if (evt.code === 'Escape') {
    closePopup();
  }
};

//# функция удаления карточки
const deleteCard = currentCard => {
  removeCardFromServer(currentCard.id)
    .then(() => {
      closePopup(popupDelete);
      currentCard.classList.add('animation__fadeOut');
      setTimeout(() => {
        currentCard.remove();
      }, 300);
    })
    .catch(err => {
      console.error(err);
    });
};

//# функция для обработчика - нажатие на корзинку
const handleDeleteButton = evt => {
  if (evt.target.classList.contains('element__delete-button') && !evt.target.classList.contains('element__delete-button_off')) {
    const currentCard = evt.target.closest('.element');
    openPopup(popupDelete);
    deleteCardConfirm.addEventListener(
      'click',
      () => {
        deleteCard(currentCard);
      },
      { once: true }
    );
    document.addEventListener(
      'keydown',
      evt => {
        if (evt.key === 'Enter') {
          deleteCard(currentCard);
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
      removeLikeFromServer(currentCard.id)
        .then(res => {
          likeValue.textContent = res.likes.length;
          evt.target.classList.remove('element__like_active');
        })
        .catch(res => console.error(res));

      evt.target.classList.remove('element__like_active');
    } else {
      addLikeToServer(currentCard.id)
        .then(res => {
          likeValue.textContent = res.likes.length;
          evt.target.classList.add('element__like_active');
        })
        .catch(res => console.error(res));
    }
  }
};

//# функция для обработчика - нажатие на картинку
const handleImage = evt => {
  if (evt.target.classList.contains('element__image')) {
    popupPicture.src = evt.target.src;
    popupPicture.alt = evt.target.src;
    popupPicturecaption.textContent = evt.target.alt;
    openPopup(popupImage);
  }
};

//# функция для обработчика - нажатие на аватар
const handlePopupAvatar = () => {
  openPopup(popupAvatar);
};

//# функция для обработчика - нажатие на кнопку редактирования профиля
const handlePopupProfile = () => {
  inputProfileName.value = profileTitle.textContent;
  inputProfileAboutSelf.value = profileSubtitle.textContent;
  openPopup(popupProfile);
};

//# функция для обработчика - нажатие на кнопку добавления новой карточки
const handlePopupPlace = () => {
  openPopup(popupPlace);
};

//# устанавливаем слушатели
document.addEventListener('click', handleDeleteButton);
document.addEventListener('click', handleLikeButton);
formAvatar.addEventListener('submit', submitFormAvatar);
formProfile.addEventListener('submit', submitFormProfile);
formPlace.addEventListener('submit', submitFormPlace);
document.addEventListener('click', handleImage);
buttonPopupAvatar.addEventListener('click', handlePopupAvatar);
buttonPopupProfile.addEventListener('click', handlePopupProfile);
buttonPopupPlace.addEventListener('click', handlePopupPlace);

//# экспорт для других модулей
export { profileId, handleButtonClose, handleOverlayClose, handleEscKeyboard };
