import '../pages/index.css';
import {initialCards} from './variables.js';
import {validationConfig, enableValidation} from './validate.js';
import {prependCard} from './card.js';

// включение валидации
enableValidation(validationConfig);

// добавление всех стартовых карточек
initialCards.forEach(prependCard);