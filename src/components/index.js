import '../pages/index.css';
import {validationConfig, enableValidation} from './validate.js';
import {appendCard} from './card.js';
import {getAllCardsFromServer, getProfile} from './api.js';

// включение валидации
enableValidation(validationConfig);

// добавление карточек
getAllCardsFromServer()
  .then((item)=>{
    item.forEach(appendCard)
  })

// получение даных профиля  
getProfile();