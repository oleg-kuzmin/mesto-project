import Popup from "./popup";

export default class PopupWithForm extends Popup {
  // Кроме селектора попапа принимает в конструктор колбэк сабмита формы. В этом колбэке содержится метод класса Api.
  constructor({ popupId, callback }) {
    super(popupId);
    this._callback = callback;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__item");
    this._submitButton = this._popup.querySelector(".popup__button");
  }

  // Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  // Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._formSubmit);
  }
  removeEventListeners() {
    super.removeEventListeners()
    this._form.removeEventListener("submit", this._formSubmit);
  }

  // Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset();
  }

  // Метод submit: передаем данные всех полей формы в callback
  _formSubmit = (evt) => {
    evt.preventDefault();
    this._callback(this._getInputValues());
  };

  renderLoading(isLoading, buttonText) {
    if (isLoading) {
      this._submitButton.textContent = `Сохранение...`;
    } else this._submitButton.textContent = buttonText;
  }
}
