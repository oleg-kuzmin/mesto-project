//# Функция начала отправки формы (просто меняем значение кнопки submit)
const loadingIsProcess = evt => {
  const buttonSubmit = evt.target.querySelector('.popup__button-save');
  buttonSubmit.textContent = 'Сохранение...';
};

//# Функция окончания отправки формы (просто меняем значение кнопки submit)
const loadingIsEnd = evt => {
  const buttonSubmit = evt.target.querySelector('.popup__button-save');
  buttonSubmit.textContent = 'Сохранить';
};

export { loadingIsProcess, loadingIsEnd };
