import '../pages/index.css';
import {profileTitle, profileSubtitle, avatarImage} from './variables.js';
import {getProfile, getAllCardsFromServer} from './api.js';
import {appendCard} from './card.js';
import {validationConfig, enableValidation} from './validate.js';

let profileId; 

// получение всех данных с сервера
Promise.all([getProfile(), getAllCardsFromServer()])
  .then(([data, item]) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    avatarImage.src = data.avatar;
    profileId = data._id;
    item.forEach(appendCard);
  })  
  .catch((err)=> {
    console.log(err);
  })

// включение валидации
enableValidation(validationConfig);

export {profileId};

