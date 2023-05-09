const loadingIsProcess = evt => {
  const buttonSubmit = evt.target.querySelector('.popup__button-save');
  buttonSubmit.textContent = 'Сохранение...';
};

const loadingIsEnd = evt => {
  const buttonSubmit = evt.target.querySelector('.popup__button-save');
  buttonSubmit.textContent = 'Сохранить';
};

export { loadingIsProcess, loadingIsEnd };
