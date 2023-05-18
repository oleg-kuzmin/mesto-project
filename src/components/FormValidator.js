export default class FormValidator {
  constructor(validateConfig) {
    this.buttonSubmit = `.${validateConfig.selectorButtonSubmit}`;
    this.buttonSubmitInvalid = validateConfig.selectorButtonSubmitInvalid;
    this.input = `.${validateConfig.selectorInput}`;
    this.inputInvalid = validateConfig.selectorInputInvalid;
    this.spanInvalid = validateConfig.selectorSpanInvalid;
    this.form = validateConfig.selectorForm;
    this.pattern = validateConfig.pattern;
    this.patternMessage = validateConfig.patternMessage;
  }

  //# 1. Функция, которая найдет и переберет все формы на странице
  enableValidation() {
    //* найдём все формы, сделаем из них массив
    const formList = Array.from(document.forms);

    //* Переберём полученную коллекцию и вызовем функцию setEventListeners, передав ей элемент формы
    formList.forEach(form => {
      this.setEventListeners(form);
    });
  }

  //# 2. Функция, которая принимает параметром форму и добавляет её полям нужные обработчики
  setEventListeners(form) {
    //* находим все поля input внутри формы с указанным классом, сделаем из них массив
    const inputList = Array.from(form.querySelectorAll(this.input));

    //* найдём в форме кнопку submit
    const buttonSubmit = form.querySelector(this.buttonSubmit);

    //* проверим состояние кнопки submit
    this.checkButtonSubmit(inputList, buttonSubmit);

    //* обойдём все элементы массива input и каждому добавим обработчик
    inputList.forEach(input => {
      input.addEventListener('input', () => {
        this.checkInputValidity(form, input);
        this.checkButtonSubmit(inputList, buttonSubmit);
      });
    });
  }

  //# 3. Функция принимает массив полей ввода и submit, состояние которого нужно менять
  checkButtonSubmit(inputList, buttonSubmit) {
    if (this.hasInvalidInput(inputList)) {
      this.disableButtonSubmit(buttonSubmit);
    } else {
      this.enableButtonSubmit(buttonSubmit);
    }
  }

  //# 4. Функция выключает submit
  disableButtonSubmit(button) {
    button.disabled = true;
    button.classList.add(this.buttonSubmitInvalid);
  }

  //# 5. Функция включает submit
  enableButtonSubmit(button) {
    button.disabled = false;
    button.classList.remove(this.buttonSubmitInvalid);
  }

  //# 6. Функция, которая проверяет валидность массива всех полей
  hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
      if (!inputElement.validity.valid || (!this.pattern.test(inputElement.value) && inputElement.type !== 'url')) {
        return true;
      } else return false;
    });
  }

  //# 7. Функция, которая проверяет валидность поля
  checkInputValidity(form, input) {
    if (!input.validity.valid) {
      this.showInputError(form, input, input.validationMessage);
    } else if (!this.pattern.test(input.value) && input.type !== 'url') {
      this.showInputError(form, input, this.patternMessage);
    } else {
      this.hideInputError(form, input);
    }
  }

  //# 8. Функция, которая добавляет класс с ошибкой
  showInputError(form, input, errorMessage) {
    const span = form.querySelector(`.${input.name}-error`);
    input.classList.add(this.inputInvalid);
    span.textContent = errorMessage;
    span.classList.add(this.spanInvalid);
  }

  //# 9. Функция, которая удаляет класс с ошибкой
  hideInputError(form, input) {
    const span = form.querySelector(`.${input.name}-error`);
    input.classList.remove(this.inputInvalid);
    span.textContent = '';
    span.classList.remove(this.spanInvalid);
  }

  //# 10. Функция, сброс по умолчанию
  resetForm(currentForm) {
    const currentSubmitButton = currentForm.querySelector(this.buttonSubmit);
    const currentInputList = Array.from(currentForm.querySelectorAll(this.input));
    this.disableButtonSubmit(currentSubmitButton);
    currentInputList.forEach(input => {
      this.hideInputError(currentForm, input);
    });
    currentForm.reset();
  }
}
