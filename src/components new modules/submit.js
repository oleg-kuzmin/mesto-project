import { loadingIsProcess, loadingIsEnd } from '../components/utils';
import { patchAvatar, patchProfile, addCardToServer } from '../components/api';
import {
  profileAvatar,
  inputAvatarUrl,
  inputProfileName,
  inputProfileAboutSelf,
  profileTitle,
  profileSubtitle,
  inputPlaceName,
  inputPlaceUrl,
} from '../components/variables';
import { closePopup } from '../components/modal';
import { prependCardToDom } from '../components/card';

//# Фунция - submit аватар
const submitFormAvatar = evt => {
  evt.preventDefault(); // отменяет отправку формы по умолчанию
  loadingIsProcess(evt); // запускаем утилиту начала отправки формы
  patchAvatar(inputAvatarUrl) // передаем в api значение input формы (inputAvatarUrl)
    .then(() => {
      profileAvatar.src = inputAvatarUrl.value; // если все хорошо - меняем аватарку на странице
      closePopup(); // можно закрыть модальное окно
    })
    .catch(res => console.error(res)) // отображем ошибку если не получили данные
    .finally(() => {
      setTimeout(loadingIsEnd, 300, evt); // возвращаем значение по умолчанию до отправки формы
    });
};

//# Фунция - submit профиль
const submitFormProfile = evt => {
  evt.preventDefault(); // отменяет отправку формы по умолчанию
  loadingIsProcess(evt); // запускаем утилиту начала отправки формы
  patchProfile(inputProfileName, inputProfileAboutSelf) // передаем в api значение input формы (inputProfileName, inputProfileAboutSelf)
    .then(() => {
      profileTitle.textContent = inputProfileName.value;
      profileSubtitle.textContent = inputProfileAboutSelf.value;
      closePopup();
    })
    .catch(res => console.error(res)) // отображем ошибку если не получили данные
    .finally(() => {
      setTimeout(loadingIsEnd, 300, evt); // возвращаем значение по умолчанию до отправки формы
    });
};

//# Фунция - submit место
const submitFormPlace = evt => {
  evt.preventDefault(); // отменяет отправку формы по умолчанию
  loadingIsProcess(evt); // запускаем утилиту начала отправки формы
  const newCard = {}; // создает новый пустой объект
  newCard.name = inputPlaceName.value; // заполняем содержимым (name)
  newCard.link = inputPlaceUrl.value; // заполняем содержимым (link)
  addCardToServer(newCard) // передаем в api новую карточку
    .then(res => {
      prependCardToDom(res); // если все хорошо - добавляем карточку на страницу
      closePopup(); // можно закрыть модальное окно
    })
    .catch(err => {
      console.error(err); // отображем ошибку если не получили данные
    })
    .finally(() => {
      setTimeout(loadingIsEnd, 300, evt); // возвращаем значение по умолчанию до отправки формы
    });
};

export { submitFormAvatar, submitFormProfile, submitFormPlace };
