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
  const page = document.querySelector('.page'); // объявляем переменную всей страницы
  page.classList.remove('page_disabled'); // удаляем класс, чтобы показать страницу
};

//# получаем все необходимые промисы
Promise.all([getProfile(), getAllCardsFromServer()])
  .then(([data, item]) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    profileAvatar.src = data.avatar;
    profileId = data._id;
    item.forEach(appendCardToDom);
    showPage();
  })
  .catch(err => {
    console.error(err);
  });

const handleButtonClose = evt => {
  if (evt.target.classList.contains('popup__button-close')) {
    closePopup();
  }
};

const handleOverlayClose = evt => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup();
  }
};

const handleEscKeyboard = evt => {
  if (evt.code === 'Escape') {
    closePopup();
  }
};

const handleDeleteButton = evt => {
  if (evt.target.classList.contains('element__delete-button') && !evt.target.classList.contains('element__delete-button_off')) {
    const currentCard = evt.target.closest('.element');
    removeCardFromServer(currentCard.id)
      .then(() => {
        currentCard.remove();
      })
      .catch(err => {
        console.error(err);
      });
  }
};

//#
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

//#
const handleImageClick = evt => {
  if (evt.target.classList.contains('element__image')) {
    popupPicture.src = evt.target.src;
    popupPicture.alt = evt.target.src;
    popupPicturecaption.textContent = evt.target.alt;
    openPopup(popupImage);
  }
};

const handleAvatarClick = () => {
  openPopup(popupAvatar);
};

document.addEventListener('click', handleDeleteButton);
document.addEventListener('click', handleLikeButton);
formAvatar.addEventListener('submit', submitFormAvatar);
formProfile.addEventListener('submit', submitFormProfile);
formPlace.addEventListener('submit', submitFormPlace);
document.addEventListener('click', handleImageClick);

buttonPopupAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
});

// buttonPopupAvatar.addEventListener('click', handleAvatarClick);

buttonPopupProfile.addEventListener('click', () => {
  inputProfileName.value = profileTitle.textContent;
  inputProfileAboutSelf.value = profileSubtitle.textContent;
  openPopup(popupProfile);
});

buttonPopupPlace.addEventListener('click', () => {
  openPopup(popupPlace);
});

export { profileId, handleButtonClose, handleOverlayClose, handleEscKeyboard };
