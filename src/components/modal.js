import { handleButtonClose, handleOverlayClose, handleEscKeyboard } from "../components/index";
import { resetForm } from "../components/validate";

const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('click', handleButtonClose);
  document.addEventListener('mousedown', handleOverlayClose);
  document.addEventListener('keydown', handleEscKeyboard);
};

const closePopup = () => {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
  document.removeEventListener('click', handleButtonClose);
  document.removeEventListener('mousedown', handleOverlayClose);
  document.removeEventListener('keydown', handleEscKeyboard);
  if (openedPopup.id !== 'popupImage') {
    setTimeout(resetForm, 300, openedPopup);
  }
};

export { openPopup, closePopup };
