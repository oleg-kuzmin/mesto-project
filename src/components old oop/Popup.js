export default class Popup {
  constructor(popupId) {
    this._popup = document.querySelector(popupId);
    this._buttonPopupClose = this._popup.querySelector(".popup__close");
  }

  // открытие попапа
  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  //закрытие попапа
  close() {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  // устанавливает слушателей
  setEventListeners() {
    this._buttonPopupClose.addEventListener("click", this._handleButtonClose);
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleOverlayClose);
  }

  // удаляет слушателей
  removeEventListeners() {
    this._buttonPopupClose.removeEventListener("click",this._handleButtonClose);
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleOverlayClose);
  }

  // Методы закрытия попапа
  _handleButtonClose = () => {
    this.close();
  };
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      this.close();
    }
  };
}
