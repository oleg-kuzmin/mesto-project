export default class FormValidator {
  constructor({validationConfig}, form) {
    this._form = form;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._popupButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showError(inputElement) {
    const _errorElement = this._form.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass);
    _errorElement.textContent = inputElement.validationMessage;
  }

  _hideError(inputElement) {
    const _errorElement = this._form.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass);
    _errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    const _isInputValid = inputElement.validity.valid;
    if (!_isInputValid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }

  _toggleButtonState(isActive) {
    if (isActive) {
      this._popupButton.classList.remove(this._inactiveButtonClass);
      this._popupButton.disabled = false;
    } else {
      this._popupButton.classList.add(this._inactiveButtonClass);
      this._popupButton.disabled = "disabled";
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
       this._hideError(inputElement);
    });
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(this._form.checkValidity());
      });
    });
  }

  enableValidation() {
   this._setEventListeners();
  }
}
