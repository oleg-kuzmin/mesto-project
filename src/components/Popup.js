export default class Popup {
  constructor(objectPopup) {
    this.popup = document.querySelector(`#${objectPopup.idPopup}`);
    this.selectorOpenClass = objectPopup.selectorOpenClass;
  }

  open() {
    this.popup.classList.add(this.selectorOpenClass);
    this.setEventListeners();
  }

  close() {
    this.popup.classList.remove(this.selectorOpenClass);
    this.removeEventListeners();
  }

  _handleButtonClose = evt => {
    if (evt.target.classList.contains('popup__button-close')) {
      this.close();
    }
  };

  _handleOverlayClose = evt => {
    if (evt.target.classList.contains(this.selectorOpenClass)) {
      this.close();
    }
  };

  _handleEscKeyboard = evt => {
    if (evt.code === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this.popup.addEventListener('click', this._handleButtonClose);
    this.popup.addEventListener('mousedown', this._handleOverlayClose);
    document.addEventListener('keydown', this._handleEscKeyboard);
  }

  removeEventListeners() {
    this.popup.removeEventListener('click', this._handleButtonClose);
    this.popup.removeEventListener('mousedown', this._handleOverlayClose);
    document.removeEventListener('keydown', this._handleEscKeyboard);
  }
}
