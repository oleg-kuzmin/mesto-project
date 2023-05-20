export default class Popup {
  constructor(objectPopup) {
    this.popup = document.querySelector(`#${objectPopup.idPopup}`);
    this.openClass = objectPopup.selectorOpenClass;
    this.buttonClose = objectPopup.selectorButtonClose;
  }

  open() {
    this.popup.classList.add(this.openClass);
    this.setEventListeners();
  }

  close() {
    this.popup.classList.remove(this.openClass);
    this.removeEventListeners();
  }

  _handleButtonClose = evt => {
    if (evt.target.classList.contains(this.buttonClose)) {
      this.close();
    }
  };

  _handleOverlayClose = evt => {
    if (evt.target.classList.contains(this.openClass)) {
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
