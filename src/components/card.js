import { elements } from '../components/variables';
import { profileId } from '../components/index';

//# Функция создания карточки: принимает объект cardObject, возвращает новую карточку
const createCard = cardObject => {
  const cardTemplate = document.querySelector('#elementTemplate').content; // находим содержимое шаблона
  const newCard = cardTemplate.querySelector('.element').cloneNode(true); // копируем содержимое шаблона
  const newcardTitle = newCard.querySelector('.element__title'); // находим Title
  const newcardImage = newCard.querySelector('.element__image'); // находим Image
  const newCardLike = newCard.querySelector('.element__like'); // находим Like
  const newcardLikeValue = newCard.querySelector('.element__like-value'); // находим LikeValue
  newcardTitle.textContent = cardObject.name; // заполняем Title.textContent
  newcardImage.src = cardObject.link; // заполняем Image.src
  newcardImage.alt = cardObject.name; // заполняем Image.lt
  newcardLikeValue.textContent = cardObject.likes.length; // заполняем LikeValue.textContent
  newCard.id = cardObject._id; // заполняем id

  //* проверим есть ли наши собственные карточки (если id совпадает)
  if (profileId === cardObject.owner._id) {
    const newcardDeleteButton = newCard.querySelector('.element__delete-button'); // находим кнопку удаления (корзинку)
    newcardDeleteButton.removeAttribute('disabled'); // делаем ее включенной
    newcardDeleteButton.classList.remove('element__delete-button_off'); // делаем ее невидимой
  }

  //* проверим есть ли на карточке наши лайки (если id совпадает)
  cardObject.likes.forEach(element => {
    if (profileId === element._id) {
      newCardLike.classList.add('element__like_active'); // делаем лайк активным
    }
  });
  return newCard;
};

//# Функция - добавляет карточку в начало страницы (чтобы последние карточки были выше всех)
const prependCardToDom = card => {
  const newCard = createCard(card); // передаем функции createCard полученный объект карточки
  newCard.classList.add('animation__backInDown'); // анимация добавления карточки на страницу (1000 мс)
  elements.prepend(newCard);
};

//# Функция - добавляет карточку в конец страницы (чтобы последние карточки были выше всех)
const appendCardToDom = card => {
  const newCard = createCard(card); // передаем функции createCard полученный объект карточки
  elements.append(newCard);
};

export { prependCardToDom, appendCardToDom };
