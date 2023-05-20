import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor(objectPopup) {
    super(objectPopup);
    this.form = this.popup.querySelector(`.${objectPopup.selectorForm}`);
    this.buttonSubmit = this.form.querySelector('button');
    this.callbackApiSubmitForm = objectPopup.callbackApiSubmitForm;
  }

  _getInputValues() {
    const objectInputValues = {};
    const inputList = this.form.querySelectorAll('input');
    inputList.forEach(element => {
      objectInputValues[element.name] = element.value;
    });
    return objectInputValues;
  }

  _handleButtonSubmit = evt => {
    evt.preventDefault();
    this.callbackApiSubmitForm(this._getInputValues());
  };

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', this._handleButtonSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this.form.removeEventListener('submit', this._handleButtonSubmit);
  }

  loading(text) {
    this.buttonSubmit.textContent = text;
  }
}
