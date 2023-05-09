import { elements } from "../components/variables";
import { profileId } from "../components/index";

const createCard = cardObject => {
  const cardTemplate = document.querySelector('#elementTemplate').content;
  const newCard = cardTemplate.querySelector('.element').cloneNode(true);
  const newcardTitle = newCard.querySelector('.element__title');
  const newcardImage = newCard.querySelector('.element__image');
  const newCardLike = newCard.querySelector('.element__like');
  const newcardLikeValue = newCard.querySelector('.element__like-value');
  newcardTitle.textContent = cardObject.name;
  newcardImage.src = cardObject.link;
  newcardImage.alt = cardObject.name;
  newcardLikeValue.textContent = cardObject.likes.length;
  newCard.id = cardObject._id;
  if (profileId === cardObject.owner._id) {
    const newcardDeleteButton = newCard.querySelector('.element__delete-button');
    newcardDeleteButton.classList.remove('element__delete-button_off');
  }
  cardObject.likes.forEach(element => {
    if (profileId === element._id) {
      newCardLike.classList.add('element__like_active');
    }
  });
  return newCard;
};

const prependCardToDom = card => {
  const newCard = createCard(card);
  elements.prepend(newCard);
};

const appendCardToDom = card => {
  const newCard = createCard(card);
  elements.append(newCard);
};

export { prependCardToDom, appendCardToDom };
