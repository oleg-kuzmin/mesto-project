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
  const page = document.querySelector('.page'); // находим элемент страницы
  page.classList.remove('page_disabled'); // удаляем класс для показа страницы
};

//# получаем все необходимые промисы
Promise.all([getProfile(), getAllCardsFromServer()]) // делаем 2 fetchа
  // получаем данные профиля и карточек
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name; // присваиваем "имя" профиля на странице
    profileSubtitle.textContent = profile.about; // присваиваем "профессию" профиля на странице
    profileAvatar.src = profile.avatar; // присваиваем "аватар" профиля на странице
    profileId = profile._id; // запоминаем id для дальнейшего использования
    cards.forEach(appendCardToDom); // проходим по массиву cards колбеком, добавляющим карточки на страницу
    showPage(); // теперь страницу можно отображать
  })
  .catch(err => {
    console.error(err); // отображем ошибку если не получили данные
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
  removeCardFromServer(currentCard.id) // передаем функции карточку с нужным id
    .then(() => {
      closePopup(popupDelete); // закрываем модальное окно
      currentCard.classList.add('animation__fadeOut'); // анимация удаления карточки (1000 мс)
      setTimeout(() => {
        currentCard.remove(); // через 700 мс после начала анимации отработаем убирание элемента из dom
      }, 700);
    })
    .catch(err => {
      console.error(err); // отображем ошибку если не получили данные
    });
};

//# функция для обработчика - нажатие на корзинку
const handleDeleteButton = evt => {
  //* если evt.target содержит корзинку и не содержит выключенную корзинку (дополнительная страховка)
  if (evt.target.classList.contains('element__delete-button') && !evt.target.classList.contains('element__delete-button_off')) {
    const currentCard = evt.target.closest('.element'); // ищем ближайщего родителя, т.е. текущую карточку
    openPopup(popupDelete); // открываем модальное окно
    deleteCardConfirm.addEventListener(
      'click',
      () => {
        deleteCard(currentCard); // добавляем однократый слушатель - удаление карточки после клика на кнопку ДА
      },
      { once: true }
    );
    document.addEventListener(
      'keydown',
      evt => {
        if (evt.key === 'Enter') {
          deleteCard(currentCard); // добавляем однократый слушатель - удаление карточки после клика на ENTER
        }
      },
      { once: true }
    );
  }
};

//# функция для обработчика - нажатие на лайк
const handleLikeButton = evt => {
  if (evt.target.classList.contains('element__like')) {
    const currentCard = evt.target.closest('.element'); // ищем ближайщего родителя, т.е. текущую карточку
    const likeValue = currentCard.querySelector('.element__like-value'); // ищем количество лайков на текущей карточке

    //* если лайк активный
    if (evt.target.classList.contains('element__like_active')) {
      removeLikeFromServer(currentCard.id) // передаем функции карточку с нужным id
        .then(res => {
          likeValue.textContent = res.likes.length; // меняем количество лайков, после подтверждения с сервера
          evt.target.classList.remove('element__like_active'); // делаем лайк неактивным
        })
        .catch(err => console.error(err)); // отображем ошибку если не получили данные
      //* если лайк не активный
    } else {
      addLikeToServer(currentCard.id) // передаем функции карточку с нужным id
        .then(res => {
          likeValue.textContent = res.likes.length; // меняем количество лайков, после подтверждения с сервера
          evt.target.classList.add('element__like_active'); // делаем лайк активным
        })
        .catch(err => console.error(err)); // отображем ошибку если не получили данные
    }
  }
};

//# функция для обработчика - нажатие на картинку
const handleImage = evt => {
  if (evt.target.classList.contains('element__image')) {
    popupPicture.src = evt.target.src; // присваиваем картинке в модальном окне нужный src
    popupPicture.alt = evt.target.src; // присваиваем картинке в модальном окне нужный alt
    popupPicturecaption.textContent = evt.target.alt; // присваиваем подписи в модальном окне нужный textContent
    openPopup(popupImage); // теперь можно открыть модальное окно
  }
};

//# функция для обработчика - нажатие на аватар
const handlePopupAvatar = () => {
  openPopup(popupAvatar);
};

//# функция для обработчика - нажатие на кнопку редактирования профиля
const handlePopupProfile = () => {
  inputProfileName.value = profileTitle.textContent; // присваиваем input в форме нужное значение (такое же как на странице)
  inputProfileAboutSelf.value = profileSubtitle.textContent; // присваиваем input в форме нужное значение (такое же как на странице)
  openPopup(popupProfile); // теперь можно открыть модальное окно
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
