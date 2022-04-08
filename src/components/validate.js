const validationConfig = {
  formElementName: '.popup__form',
  inputElementName: '.popup__input',
  inputTypeErrorName: 'popup__input_type_error',
  errorElementActiveName: 'popup__input-error_active',
  buttonElementName: '.popup__button-save',
  buttonElementDisabledName: 'popup__button-save_disabled'
};

const {formElementName, ...rest} = validationConfig;

//! 1
const enableValidation = ({formElementName, inputElementName, buttonElementName, buttonElementDisabledName, inputTypeErrorName, errorElementActiveName}) => {
  const formList = Array.from(document.querySelectorAll(formElementName));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputElementName, buttonElementName, buttonElementDisabledName, inputTypeErrorName, errorElementActiveName); // !2
  });
};

//! 2
const setEventListeners = (formElement, inputElementName, buttonElementName, buttonElementDisabledName, inputTypeErrorName, errorElementActiveName) => {
  const inputList = Array.from(formElement.querySelectorAll(inputElementName));
  const buttonElement = formElement.querySelector(buttonElementName);
  toggleButtonState(inputList, buttonElement, buttonElementDisabledName); // !3
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, inputTypeErrorName, errorElementActiveName) // !4
      toggleButtonState(inputList, buttonElement, buttonElementDisabledName); //! 3
    });
  });
};

//! 3
const toggleButtonState = (inputList, buttonElement, buttonElementDisabledName) => {
  if (hasInvalidInput(inputList)) { //! 5
    submitDisabled(buttonElement, buttonElementDisabledName); //! 6
  } else {
    submitActive(buttonElement, buttonElementDisabledName); //! 7
  }
};

//! 4
const isValid = (formElement, inputElement, inputTypeErrorName, errorElementActiveName) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputTypeErrorName, errorElementActiveName, inputElement.validationMessage); //! 8
  } else {
    hideInputError(formElement, inputElement, inputTypeErrorName, errorElementActiveName); //! 9
  }
};

//! 5
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//! 6
function submitDisabled(buttonElement, buttonElementDisabledName) {
  buttonElement.setAttribute("disabled", "disabled");
  buttonElement.classList.add(buttonElementDisabledName);
};

//! 7
function submitActive(buttonElement, buttonElementDisabledName) {
  buttonElement.removeAttribute("disabled", "disabled");
  buttonElement.classList.remove(buttonElementDisabledName);
};

//! 8
const showInputError = (formElement, inputElement, inputTypeErrorName, errorElementActiveName, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(inputTypeErrorName);  
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorElementActiveName);   
};

//! 9
const hideInputError = (formElement, inputElement, inputTypeErrorName, errorElementActiveName) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputTypeErrorName);  
  errorElement.classList.remove(errorElementActiveName);
  errorElement.textContent = '';
};

export {
  validationConfig, 
  enableValidation, 
  hideInputError, 
  submitDisabled
};