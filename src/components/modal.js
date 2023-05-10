import { handleButtonClose, handleOverlayClose, handleEscKeyboard } from '../components/index';
import { resetForm } from '../components/validate';

//# Функция открытия модального окна
const openPopup = popup => {
  popup.classList.add('popup_opened'); // добавим класс для открытия
  document.addEventListener('click', handleButtonClose, { once: true }); // однократный обработчик - закрытие на крестик
  document.addEventListener('mousedown', handleOverlayClose, { once: true }); // однократный обработчик - закрытие на оверлей
  document.addEventListener('keydown', handleEscKeyboard, { once: true }); // однократный обработчик - закрытие на ESC
};

//# Функция закрытия модального окна
const closePopup = () => {
  const openedPopup = document.querySelector('.popup_opened'); // находим открытое модально окно
  openedPopup.classList.remove('popup_opened'); // закрываем окно

  //* делаем сброс формы для тех модальных окон, где была форма (формы нет в popupImage и popupDelete)
  if (openedPopup.id !== 'popupImage' && openedPopup.id !== 'popupDelete') {
    setTimeout(resetForm, 300, openedPopup);
  }
};

export { openPopup, closePopup };
